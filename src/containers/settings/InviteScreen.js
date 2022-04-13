import { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import Invite from '../../components/auth/Invite';
import ErrorBoundary from '../../components/util/ErrorBoundary';
import UserStore from '../../stores/UserStore';

class InviteScreen extends Component {
  componentWillUnmount() {
    this.props.stores.user.inviteRequest.reset();
  }

  render() {
    const { actions } = this.props;
    const { user } = this.props.stores;

    return (
      <ErrorBoundary>
        <Invite
          onSubmit={actions.user.invite}
          isLoadingInvite={user.inviteRequest.isExecuting}
          isInviteSuccessful={
            user.inviteRequest.wasExecuted && !user.inviteRequest.isError
          }
          embed
        />
      </ErrorBoundary>
    );
  }
}

InviteScreen.propTypes = {
  actions: PropTypes.shape({
    user: PropTypes.instanceOf(UserStore).isRequired,
  }).isRequired,
  stores: PropTypes.shape({
    user: PropTypes.instanceOf(UserStore).isRequired,
  }).isRequired,
};

export default inject('stores', 'actions')(observer(InviteScreen));
