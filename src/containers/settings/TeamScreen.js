import { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import UserStore from '../../stores/UserStore';
import AppStore from '../../stores/AppStore';
import SettingsStore from '../../stores/SettingsStore';

import TeamDashboard from '../../components/settings/team/TeamDashboard';
import ErrorBoundary from '../../components/util/ErrorBoundary';
import { DEV_API_FRANZ_WEBSITE } from '../../config';

class TeamScreen extends Component {
  handleWebsiteLink(route) {
    const { actions, stores } = this.props;

    const url = `${DEV_API_FRANZ_WEBSITE}/${route}?authToken=${stores.user.authToken}&utm_source=app&utm_medium=account_dashboard`;

    actions.app.openExternalUrl({ url });
  }

  render() {
    const { user, settings } = this.props.stores;

    const isLoadingUserInfo = user.getUserInfoRequest.isExecuting;
    const { server } = settings.app;

    return (
      <ErrorBoundary>
        <TeamDashboard
          isLoading={isLoadingUserInfo}
          userInfoRequestFailed={
            user.getUserInfoRequest.wasExecuted &&
            user.getUserInfoRequest.isError
          }
          retryUserInfoRequest={() => this.reloadData()}
          openTeamManagement={() => this.handleWebsiteLink('/user/team')}
          server={server}
        />
      </ErrorBoundary>
    );
  }
}

TeamScreen.propTypes = {
  stores: PropTypes.shape({
    user: PropTypes.instanceOf(UserStore).isRequired,
    app: PropTypes.instanceOf(AppStore).isRequired,
    settings: PropTypes.instanceOf(SettingsStore).isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    app: PropTypes.instanceOf(AppStore).isRequired,
    user: PropTypes.instanceOf(UserStore).isRequired,
  }).isRequired,
};

export default inject('stores', 'actions')(observer(TeamScreen));
