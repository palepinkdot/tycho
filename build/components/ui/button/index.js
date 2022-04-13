"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Button=void 0;const tslib_1=require("tslib"),jsx_runtime_1=require("react/jsx-runtime"),react_1=(0,tslib_1.__importDefault)(require("@mdi/react")),classnames_1=(0,tslib_1.__importDefault)(require("classnames")),react_2=require("react"),react_jss_1=(0,tslib_1.__importDefault)(require("react-jss")),react_loader_1=(0,tslib_1.__importDefault)(require("react-loader"));let buttonTransition="none",loaderContainerTransition="none";window&&window.matchMedia("(prefers-reduced-motion: no-preference)")&&(buttonTransition="background .5s, opacity 0.3s",loaderContainerTransition="all 0.3s");const styles=t=>({button:{borderRadius:t.borderRadiusSmall,border:"none",display:"inline-flex",position:"relative",transition:buttonTransition,textAlign:"center",outline:"none",alignItems:"center",padding:0,width:t=>t.stretch?"100%":"auto",fontSize:t.uiFontSize,textDecoration:"none","&:hover":{opacity:.8},"&:active":{opacity:.5,transition:"none"}},label:{margin:"10px 20px",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"},primary:{background:t.buttonPrimaryBackground,color:t.buttonPrimaryTextColor,"& svg":{fill:t.buttonPrimaryTextColor}},secondary:{background:t.buttonSecondaryBackground,color:t.buttonSecondaryTextColor,"& svg":{fill:t.buttonSecondaryTextColor}},success:{background:t.buttonSuccessBackground,color:t.buttonSuccessTextColor,"& svg":{fill:t.buttonSuccessTextColor}},danger:{background:t.buttonDangerBackground,color:t.buttonDangerTextColor,"& svg":{fill:t.buttonDangerTextColor}},warning:{background:t.buttonWarningBackground,color:t.buttonWarningTextColor,"& svg":{fill:t.buttonWarningTextColor}},inverted:{background:t.buttonInvertedBackground,color:t.buttonInvertedTextColor,border:t.buttonInvertedBorder,"& svg":{fill:t.buttonInvertedTextColor}},disabled:{opacity:t.inputDisabledOpacity},loader:{position:"relative",width:20,height:18,zIndex:9999},loaderContainer:{width:t=>t.busy?"40px":"0",height:20,overflow:"hidden",transition:loaderContainerTransition,marginLeft:t=>t.busy?20:10,marginRight:t=>t.busy?-20:-10,position:t=>t.stretch?"absolute":"inherit"},icon:{margin:[1,10,0,-5]}});class ButtonComponent extends react_2.Component{constructor(...t){super(...t),this.state={busy:!1}}componentWillMount(){this.setState({busy:this.props.busy})}componentWillReceiveProps(t){t.busy!==this.props.busy&&(this.props.busy?setTimeout((()=>{this.setState({busy:t.busy})}),300):this.setState({busy:t.busy}))}render(){const{classes:t,className:e,disabled:o,id:n,label:r,type:s,onClick:i,buttonType:a,loaded:l,icon:u,href:d,target:c}=this.props,{busy:b}=this.state;let p=!1;l&&(p=!l,console.warn("Ferdi Button prop `loaded` will be deprecated in the future. Please use `busy` instead")),b&&(p=b);const m=(0,jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment,{children:[(0,jsx_runtime_1.jsx)("div",{className:t.loaderContainer,children:p&&(0,jsx_runtime_1.jsx)(react_loader_1.default,{loaded:!1,width:4,scale:.45,parentClassName:t.loader},void 0)},void 0),(0,jsx_runtime_1.jsxs)("div",{className:t.label,children:[u&&(0,jsx_runtime_1.jsx)(react_1.default,{path:u,size:.8,className:t.icon},void 0),r]},void 0)]},void 0);return d?(0,jsx_runtime_1.jsx)("a",{href:d,target:c,onClick:i,className:(0,classnames_1.default)({[`${t.button}`]:!0,[`${t[a]}`]:!0,[`${e}`]:e}),rel:"_blank"===c?"noopener":"","data-type":"franz-button",children:m},void 0):(0,jsx_runtime_1.jsx)("button",{id:n,type:s,onClick:i,className:(0,classnames_1.default)({[`${t.button}`]:!0,[`${t[a]}`]:!0,[`${t.disabled}`]:o,[`${e}`]:e}),disabled:o,"data-type":"franz-button",children:m},void 0)}}ButtonComponent.defaultProps={type:"button",disabled:!1,onClick:()=>null,buttonType:"primary",stretch:!1,busy:!1},exports.Button=(0,react_jss_1.default)(styles,{injectTheme:!0})(ButtonComponent);