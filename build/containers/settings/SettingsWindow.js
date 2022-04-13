"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _react=require("react"),_reactDom=_interopRequireDefault(require("react-dom")),_propTypes=_interopRequireDefault(require("prop-types")),_mobxReact=require("mobx-react"),_ServicesStore=_interopRequireDefault(require("../../stores/ServicesStore")),_SettingsLayout=_interopRequireDefault(require("../../components/settings/SettingsLayout")),_SettingsNavigation=_interopRequireDefault(require("../../components/settings/navigation/SettingsNavigation")),_ErrorBoundary=_interopRequireDefault(require("../../components/util/ErrorBoundary")),_workspaces=require("../../features/workspaces"),_UIStore=_interopRequireDefault(require("../../stores/UIStore")),_jsxRuntime=require("react/jsx-runtime");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}class SettingsContainer extends _react.Component{constructor(...e){super(...e),this.portalRoot=document.querySelector("#portalContainer"),this.el=document.createElement("div")}componentDidMount(){this.portalRoot.append(this.el)}componentWillUnmount(){this.el.remove()}render(){const{children:e,stores:t}=this.props,{closeSettings:r}=this.props.actions.ui,o=(0,_jsxRuntime.jsx)(_SettingsNavigation.default,{serviceCount:t.services.all.length,workspaceCount:_workspaces.workspaceStore.workspaces.length});return _reactDom.default.createPortal((0,_jsxRuntime.jsx)(_ErrorBoundary.default,{children:(0,_jsxRuntime.jsx)(_SettingsLayout.default,{navigation:o,closeSettings:r,children:e})}),this.el)}}SettingsContainer.propTypes={children:_propTypes.default.element.isRequired,stores:_propTypes.default.shape({services:_propTypes.default.instanceOf(_ServicesStore.default).isRequired}).isRequired,actions:_propTypes.default.shape({ui:_propTypes.default.instanceOf(_UIStore.default).isRequired}).isRequired};var _default=(0,_mobxReact.inject)("stores","actions")((0,_mobxReact.observer)(SettingsContainer));exports.default=_default;