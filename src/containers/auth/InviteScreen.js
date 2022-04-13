import { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Invite from '../../components/auth/Invite';

class InviteScreen extends Component {
  render() {
    const { actions } = this.props;

    return <Invite onSubmit={actions.user.invite} embed={false} />;
  }
}

InviteScreen.propTypes = {
  actions: PropTypes.shape({
    user: PropTypes.shape({
      invite: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

export default inject('stores', 'actions')(observer(InviteScreen));
