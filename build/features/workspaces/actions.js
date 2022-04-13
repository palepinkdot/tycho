"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.workspaceActions=void 0;const tslib_1=require("tslib"),prop_types_1=(0,tslib_1.__importDefault)(require("prop-types")),Workspace_1=(0,tslib_1.__importDefault)(require("./models/Workspace")),actions_1=require("../../actions/lib/actions");exports.workspaceActions=(0,actions_1.createActionsFromDefinitions)({edit:{workspace:prop_types_1.default.instanceOf(Workspace_1.default).isRequired},create:{name:prop_types_1.default.string.isRequired},delete:{workspace:prop_types_1.default.instanceOf(Workspace_1.default).isRequired},update:{workspace:prop_types_1.default.instanceOf(Workspace_1.default).isRequired},activate:{workspace:prop_types_1.default.instanceOf(Workspace_1.default).isRequired},deactivate:{},toggleWorkspaceDrawer:{},openWorkspaceSettings:{},toggleKeepAllWorkspacesLoadedSetting:{}},prop_types_1.default.checkPropTypes),exports.default=exports.workspaceActions;