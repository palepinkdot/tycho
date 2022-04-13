"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _react=require("react"),_propTypes=_interopRequireDefault(require("prop-types")),_mobxReact=require("mobx-react"),_renderer=require("electron-react-titlebar/renderer"),_reactIntl=require("react-intl"),_js=require("@mdi/js"),_Link=_interopRequireDefault(require("../ui/Link")),_InfoBar=_interopRequireDefault(require("../ui/InfoBar")),_publishDebugInfo=require("../../features/publishDebugInfo"),_propTypes2=require("../../prop-types"),_globalMessages=_interopRequireDefault(require("../../i18n/globalMessages")),_environment=require("../../environment"),_AppUpdateInfoBar=_interopRequireDefault(require("../AppUpdateInfoBar")),_config=require("../../config"),_icon=require("../ui/icon"),_jsxRuntime=require("react/jsx-runtime");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}class AuthLayout extends _react.Component{constructor(...e){super(...e),this.state={shouldShowAppUpdateInfoBar:!0}}render(){const{children:e,error:r,isOnline:t,isAPIHealthy:s,retryHealthCheck:i,isHealthCheckLoading:a,isFullScreen:n,installAppUpdate:o,appUpdateIsDownloaded:u}=this.props,{intl:l}=this.props;return(0,_jsxRuntime.jsxs)(_jsxRuntime.Fragment,{children:[_environment.isWindows&&!n&&(0,_jsxRuntime.jsx)(_renderer.TitleBar,{menu:window.ferdi.menu.template,icon:"assets/images/logo.svg"}),(0,_jsxRuntime.jsxs)("div",{className:"auth",children:[!t&&(0,_jsxRuntime.jsxs)(_InfoBar.default,{type:"warning",children:[(0,_jsxRuntime.jsx)(_icon.Icon,{icon:_js.mdiFlash}),l.formatMessage(_globalMessages.default.notConnectedToTheInternet)]}),u&&this.state.shouldShowAppUpdateInfoBar&&(0,_jsxRuntime.jsx)(_AppUpdateInfoBar.default,{onInstallUpdate:o,onHide:()=>{this.setState({shouldShowAppUpdateInfoBar:!1})}}),t&&!s&&(0,_jsxRuntime.jsxs)(_InfoBar.default,{type:"danger",ctaLabel:"Try again",ctaLoading:a,sticky:!0,onClick:i,children:[(0,_jsxRuntime.jsx)(_icon.Icon,{icon:_js.mdiFlash}),l.formatMessage(_globalMessages.default.APIUnhealthy)]}),(0,_jsxRuntime.jsx)("div",{className:"auth__layout",children:(0,_react.cloneElement)(e,{error:r})}),(0,_jsxRuntime.jsx)(_Link.default,{to:`${_config.GITHUB_FERDI_URL}/ferdi`,className:"auth__adlk",target:"_blank",children:(0,_jsxRuntime.jsx)("img",{src:"./assets/images/adlk.svg",alt:""})})]}),(0,_jsxRuntime.jsx)(_publishDebugInfo.Component,{})]})}}AuthLayout.propTypes={children:_propTypes2.oneOrManyChildElements.isRequired,error:_propTypes2.globalError.isRequired,isOnline:_propTypes.default.bool.isRequired,isAPIHealthy:_propTypes.default.bool.isRequired,retryHealthCheck:_propTypes.default.func.isRequired,isHealthCheckLoading:_propTypes.default.bool.isRequired,isFullScreen:_propTypes.default.bool.isRequired,installAppUpdate:_propTypes.default.func.isRequired,appUpdateIsDownloaded:_propTypes.default.bool.isRequired};var _default=(0,_reactIntl.injectIntl)((0,_mobxReact.observer)(AuthLayout));exports.default=_default;