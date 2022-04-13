import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import ServicesStore from '../../stores/ServicesStore';

import Layout from '../../components/settings/SettingsLayout';
import Navigation from '../../components/settings/navigation/SettingsNavigation';
import ErrorBoundary from '../../components/util/ErrorBoundary';
import { workspaceStore } from '../../features/workspaces';
import UIStore from '../../stores/UIStore';

class SettingsContainer extends Component {
  portalRoot = document.querySelector('#portalContainer');

  el = document.createElement('div');

  componentDidMount() {
    this.portalRoot.append(this.el);
  }

  componentWillUnmount() {
    this.el.remove();
  }

  render() {
    const { children, stores } = this.props;
    const { closeSettings } = this.props.actions.ui;

    const navigation = (
      <Navigation
        serviceCount={stores.services.all.length}
        workspaceCount={workspaceStore.workspaces.length}
      />
    );

    return ReactDOM.createPortal(
      <ErrorBoundary>
        <Layout navigation={navigation} closeSettings={closeSettings}>
          {children}
        </Layout>
      </ErrorBoundary>,
      this.el,
    );
  }
}

SettingsContainer.propTypes = {
  children: PropTypes.element.isRequired,
  stores: PropTypes.shape({
    services: PropTypes.instanceOf(ServicesStore).isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    ui: PropTypes.instanceOf(UIStore).isRequired,
  }).isRequired,
};

export default inject('stores', 'actions')(observer(SettingsContainer));
