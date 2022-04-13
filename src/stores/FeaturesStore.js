import { computed, observable, runInAction } from 'mobx';

import Store from './lib/Store';
import CachedRequest from './lib/CachedRequest';

import serviceProxy from '../features/serviceProxy';
import basicAuth from '../features/basicAuth';
import workspaces from '../features/workspaces';
import quickSwitch from '../features/quickSwitch';
import publishDebugInfo from '../features/publishDebugInfo';
import communityRecipes from '../features/communityRecipes';
import todos from '../features/todos';
import appearance from '../features/appearance';

export default class FeaturesStore extends Store {
  @observable defaultFeaturesRequest = new CachedRequest(
    this.api.features,
    'default',
  );

  @observable featuresRequest = new CachedRequest(
    this.api.features,
    'features',
  );

  @observable features = {};

  async setup() {
    this.registerReactions([
      this._updateFeatures,
      this._monitorLoginStatus.bind(this),
    ]);

    await this.featuresRequest._promise;
    setTimeout(this._setupFeatures.bind(this), 1);
  }

  @computed get anonymousFeatures() {
    return this.defaultFeaturesRequest.execute().result || {};
  }

  _updateFeatures = () => {
    const features = {};
    if (this.stores.user.isLoggedIn) {
      let requestResult = {};
      try {
        requestResult = this.featuresRequest.execute().result;
      } catch (error) {
        console.error(error);
      }
      Object.assign(features, requestResult);
    }
    runInAction('FeaturesStore::_updateFeatures', () => {
      this.features = features;
    });
  };

  _monitorLoginStatus() {
    if (this.stores.user.isLoggedIn) {
      this.featuresRequest.invalidate({ immediately: true });
    } else {
      this.defaultFeaturesRequest.execute();
      this.defaultFeaturesRequest.invalidate({ immediately: true });
    }
  }

  _setupFeatures() {
    serviceProxy(this.stores);
    basicAuth();
    workspaces(this.stores, this.actions);
    quickSwitch();
    publishDebugInfo();
    communityRecipes(this.stores, this.actions);
    todos(this.stores, this.actions);
    appearance(this.stores);
  }
}
