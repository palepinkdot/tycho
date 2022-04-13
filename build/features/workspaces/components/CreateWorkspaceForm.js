"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _react=require("react"),_propTypes=_interopRequireDefault(require("prop-types")),_mobxReact=require("mobx-react"),_reactIntl=require("react-intl"),_reactJss=_interopRequireDefault(require("react-jss")),_index=require("../../../components/ui/input/index"),_index2=require("../../../components/ui/button/index"),_Form=_interopRequireDefault(require("../../../lib/Form")),_validationHelpers=require("../../../helpers/validation-helpers"),_index3=require("../index"),_jsxRuntime=require("react/jsx-runtime");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}const messages=(0,_reactIntl.defineMessages)({submitButton:{id:"settings.workspace.add.form.submitButton",defaultMessage:[{type:0,value:"Create workspace"}]},name:{id:"settings.workspace.add.form.name",defaultMessage:[{type:0,value:"Name"}]}}),styles={form:{display:"flex"},input:{flexGrow:1,marginRight:"10px"},submitButton:{height:"inherit"}};class CreateWorkspaceForm extends _react.Component{constructor(...e){super(...e),this.form=(()=>{const{intl:e}=this.props;return new _Form.default({fields:{name:{label:e.formatMessage(messages.name),placeholder:e.formatMessage(messages.name),value:"",validators:[_validationHelpers.required]}}})})()}submitForm(){const{form:e}=this;e.submit({onSuccess:async e=>{const{onSubmit:t}=this.props;t(e.values())}})}render(){const{intl:e}=this.props,{classes:t,isSubmitting:s}=this.props,{form:r}=this;return(0,_jsxRuntime.jsxs)("div",{className:t.form,children:[(0,_jsxRuntime.jsx)(_index.Input,{className:t.input,...r.$("name").bind(),showLabel:!1,onEnterKey:this.submitForm.bind(this,r),focus:_index3.workspaceStore.isUserAllowedToUseFeature}),(0,_jsxRuntime.jsx)(_index2.Button,{className:`${t.submitButton} franz-form__button`,type:"submit",label:e.formatMessage(messages.submitButton),onClick:this.submitForm.bind(this,r),busy:s,buttonType:s?"secondary":"primary"})]})}}CreateWorkspaceForm.propTypes={classes:_propTypes.default.object.isRequired,isSubmitting:_propTypes.default.bool.isRequired,onSubmit:_propTypes.default.func.isRequired};var _default=(0,_reactIntl.injectIntl)((0,_reactJss.default)(styles,{injectTheme:!0})((0,_mobxReact.observer)(CreateWorkspaceForm)));exports.default=_default;