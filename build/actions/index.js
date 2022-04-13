"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const tslib_1=require("tslib"),prop_types_1=(0,tslib_1.__importDefault)(require("prop-types")),actions_1=(0,tslib_1.__importDefault)(require("./lib/actions")),service_1=(0,tslib_1.__importDefault)(require("./service")),recipe_1=(0,tslib_1.__importDefault)(require("./recipe")),recipePreview_1=(0,tslib_1.__importDefault)(require("./recipePreview")),ui_1=(0,tslib_1.__importDefault)(require("./ui")),app_1=(0,tslib_1.__importDefault)(require("./app")),user_1=(0,tslib_1.__importDefault)(require("./user")),settings_1=(0,tslib_1.__importDefault)(require("./settings")),requests_1=(0,tslib_1.__importDefault)(require("./requests")),actions_2=(0,tslib_1.__importDefault)(require("../features/workspaces/actions")),actions_3=(0,tslib_1.__importDefault)(require("../features/todos/actions")),actions={service:service_1.default,recipe:recipe_1.default,recipePreview:recipePreview_1.default,ui:ui_1.default,app:app_1.default,user:user_1.default,settings:settings_1.default,requests:requests_1.default};exports.default=Object.assign((0,actions_1.default)(actions,prop_types_1.default.checkPropTypes),{workspaces:actions_2.default},{todos:actions_3.default});