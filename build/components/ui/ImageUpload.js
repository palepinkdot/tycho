"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const tslib_1=require("tslib"),jsx_runtime_1=require("react/jsx-runtime"),react_1=require("react"),mobx_react_1=require("mobx-react"),classnames_1=(0,tslib_1.__importDefault)(require("classnames")),react_dropzone_1=(0,tslib_1.__importDefault)(require("react-dropzone")),js_1=require("@mdi/js"),environment_1=require("../../environment"),icon_1=require("./icon");class ImageUpload extends react_1.Component{constructor(...e){super(...e),this.state={path:null}}onDrop(e){const{field:t}=this.props;for(const t of e){const e=environment_1.isWindows?t.path.replace(/\\/g,"/"):t.path;this.setState({path:e}),this.props.field.onDrop(t)}t.set("")}render(){const{field:e,className:t,multiple:s,textDelete:i,textUpload:r}=this.props,a=(0,classnames_1.default)({"image-upload__dropzone":!0,[`${t}`]:t});return(0,jsx_runtime_1.jsxs)("div",{className:"image-upload-wrapper",children:[(0,jsx_runtime_1.jsx)("label",{className:"franz-form__label",htmlFor:"iconUpload",children:e.label},void 0),(0,jsx_runtime_1.jsx)("div",{className:"image-upload",children:e.value&&"delete"!==e.value||this.state.path?(0,jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment,{children:[(0,jsx_runtime_1.jsx)("div",{className:"image-upload__preview",style:{backgroundImage:`url("${this.state.path||e.value}")`}},void 0),(0,jsx_runtime_1.jsxs)("div",{className:"image-upload__action",children:[(0,jsx_runtime_1.jsxs)("button",{type:"button",onClick:()=>{e.value?e.set("delete"):this.setState({path:null})},children:[(0,jsx_runtime_1.jsx)(icon_1.Icon,{icon:js_1.mdiDelete},void 0),(0,jsx_runtime_1.jsx)("p",{children:i},void 0)]},void 0),(0,jsx_runtime_1.jsx)("div",{className:"image-upload__action-background"},void 0)]},void 0)]},void 0):(0,jsx_runtime_1.jsx)(react_dropzone_1.default,{onDrop:this.onDrop.bind(this),multiple:s,accept:"image/jpeg, image/png, image/svg+xml",children:({getRootProps:e,getInputProps:t})=>(0,jsx_runtime_1.jsxs)("div",{...e(),className:a,children:[(0,jsx_runtime_1.jsx)(icon_1.Icon,{icon:js_1.mdiFileImage},void 0),(0,jsx_runtime_1.jsx)("p",{children:r},void 0),(0,jsx_runtime_1.jsx)("input",{...t()},void 0)]},void 0)},void 0)},void 0)]},void 0)}}ImageUpload.defaultProps={multiple:!1},exports.default=(0,mobx_react_1.observer)(ImageUpload);