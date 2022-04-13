import AppStore from './AppStore';
import UserStore from './UserStore';
import FeaturesStore from './FeaturesStore';
import SettingsStore from './SettingsStore';
import ServicesStore from './ServicesStore';
import RecipesStore from './RecipesStore';
import RecipePreviewsStore from './RecipePreviewsStore';
import UIStore from './UIStore';
import RequestStore from './RequestStore';
import GlobalErrorStore from './GlobalErrorStore';
import { workspaceStore } from '../features/workspaces';
import { communityRecipesStore } from '../features/communityRecipes';
import { todosStore } from '../features/todos';

export default (api, actions, router) => {
  const stores = {};
  Object.assign(stores, {
    router,
    app: new AppStore(stores, api, actions),
    user: new UserStore(stores, api, actions),
    features: new FeaturesStore(stores, api, actions),
    settings: new SettingsStore(stores, api, actions),
    services: new ServicesStore(stores, api, actions),
    recipes: new RecipesStore(stores, api, actions),
    recipePreviews: new RecipePreviewsStore(stores, api, actions),
    ui: new UIStore(stores, api, actions),
    requests: new RequestStore(stores, api, actions),
    globalError: new GlobalErrorStore(stores, api, actions),
    workspaces: workspaceStore,
    communityRecipes: communityRecipesStore,
    todos: todosStore,
  });

  // Initialize all stores
  for (const name of Object.keys(stores)) {
    if (stores[name] && stores[name].initialize) {
      stores[name].initialize();
    }
  }
  return stores;
};
