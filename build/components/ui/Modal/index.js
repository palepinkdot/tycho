"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const tslib_1=require("tslib"),jsx_runtime_1=require("react/jsx-runtime"),react_1=require("react"),react_modal_1=(0,tslib_1.__importDefault)(require("react-modal")),classnames_1=(0,tslib_1.__importDefault)(require("classnames")),react_jss_1=(0,tslib_1.__importDefault)(require("react-jss")),js_1=require("@mdi/js"),icon_1=require("../icon"),styles_1=(0,tslib_1.__importDefault)(require("./styles"));class Modal extends react_1.Component{render(){const{children:e,className:s,classes:l,isOpen:t,portal:r,close:o,shouldCloseOnOverlayClick:a,showClose:i}=this.props;return(0,jsx_runtime_1.jsxs)(react_modal_1.default,{isOpen:t,className:(0,classnames_1.default)({[`${l.modal}`]:!0,[`${s}`]:s}),portalClassName:l.component,overlayClassName:l.overlay,portal:r,onRequestClose:o,shouldCloseOnOverlayClick:a,appElement:document.querySelector("#root"),children:[i&&o&&(0,jsx_runtime_1.jsx)("button",{type:"button",className:l.close,onClick:o,children:(0,jsx_runtime_1.jsx)(icon_1.Icon,{icon:js_1.mdiClose,size:1.5},void 0)},void 0),(0,jsx_runtime_1.jsx)("div",{className:l.content,children:e},void 0)]},void 0)}}Modal.defaultProps={className:null,portal:"modal-portal",shouldCloseOnOverlayClick:!1,showClose:!0},exports.default=(0,react_jss_1.default)(styles_1.default)(Modal);