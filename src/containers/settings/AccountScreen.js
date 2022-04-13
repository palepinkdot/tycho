import { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import UserStore from '../../stores/UserStore';
import AppStore from '../../stores/AppStore';
import FeaturesStore from '../../stores/FeaturesStore';
import SettingsStore from '../../stores/SettingsStore';

import AccountDashboard from '../../components/settings/account/AccountDashboard';
import ErrorBoundary from '../../components/util/ErrorBoundary';
import { LIVE_FRANZ_API } from '../../config';
import { WEBSITE } from '../../environment-remote';

class AccountScreen extends Component {
  onCloseWindow() {
    const { user, features } = this.props.stores;
    user.getUserInfoRequest.invalidate({ immediately: true });
    features.featuresRequest.invalidate({ immediately: true });
  }

  reloadData() {
    const { user } = this.props.stores;

    user.getUserInfoRequest.reload();
  }

  handleWebsiteLink(route) {
    const { actions, stores } = this.props;

    const api = stores.settings.all.app.server;

    const url =
      api === LIVE_FRANZ_API
        ? stores.user.getAuthURL(
            `${WEBSITE}${route}?utm_source=app&utm_medium=account_dashboard`,
          )
        : `${api}${route}`;

    actions.app.openExternalUrl({ url });
  }

  render() {
    const { user, settings } = this.props.stores;
    const { user: userActions } = this.props.actions;

    const isLoadingUserInfo = user.getUserInfoRequest.isExecuting;

    return (
      <ErrorBoundary>
        <AccountDashboard
          server={settings.all.app.server}
          user={user.data}
          isLoading={isLoadingUserInfo}
          userInfoRequestFailed={
            user.getUserInfoRequest.wasExecuted &&
            user.getUserInfoRequest.isError
          }
          retryUserInfoRequest={() => this.reloadData()}
          onCloseSubscriptionWindow={() => this.onCloseWindow()}
          deleteAccount={userActions.delete}
          isLoadingDeleteAccount={user.deleteAccountRequest.isExecuting}
          isDeleteAccountSuccessful={
            user.deleteAccountRequest.wasExecuted &&
            !user.deleteAccountRequest.isError
          }
          openEditAccount={() => this.handleWebsiteLink('/user/profile')}
          openInvoices={() => this.handleWebsiteLink('/user/invoices')}
        />
      </ErrorBoundary>
    );
  }
}

AccountScreen.propTypes = {
  stores: PropTypes.shape({
    user: PropTypes.instanceOf(UserStore).isRequired,
    features: PropTypes.instanceOf(FeaturesStore).isRequired,
    settings: PropTypes.instanceOf(SettingsStore).isRequired,
    app: PropTypes.instanceOf(AppStore).isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    app: PropTypes.instanceOf(AppStore).isRequired,
    user: PropTypes.instanceOf(UserStore).isRequired,
  }).isRequired,
};

export default inject('stores', 'actions')(observer(AccountScreen));
