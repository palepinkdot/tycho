"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Wrapper=void 0;const tslib_1=require("tslib"),jsx_runtime_1=require("react/jsx-runtime"),classnames_1=(0,tslib_1.__importDefault)(require("classnames")),react_1=require("react"),react_jss_1=(0,tslib_1.__importDefault)(require("react-jss")),styles={container:{marginBottom:e=>e.noMargin?0:20}};class WrapperComponent extends react_1.Component{render(){const{children:e,classes:r,className:s,identifier:t}=this.props;return(0,jsx_runtime_1.jsx)("div",{className:(0,classnames_1.default)({[`${r.container}`]:!0,[`${s}`]:s}),"data-type":t,children:e},void 0)}}exports.Wrapper=(0,react_jss_1.default)(styles,{injectTheme:!0})(WrapperComponent);