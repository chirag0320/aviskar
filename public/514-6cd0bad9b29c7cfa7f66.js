"use strict";(self.webpackChunkqmint_store_frontend=self.webpackChunkqmint_store_frontend||[]).push([[514],{5514:function(e,t,o){o.r(t),o.d(t,{default:function(){return X}});var a=o(6540),r=o(7834),l=o(995),i=o(8587),n=o(8168),d=(o(4363),o(4164)),s=o(4111);var u=o(1848),c=o(3541),p=o(8466),v=o(7553),m=o(7245);function g(e){return(0,m.Ay)("MuiToggleButtonGroup",e)}var f=(0,v.A)("MuiToggleButtonGroup",["root","selected","vertical","disabled","grouped","groupedHorizontal","groupedVertical","fullWidth","firstButton","lastButton","middleButton"]);var h=a.createContext({});var b=a.createContext(void 0);function A(e){return(0,m.Ay)("MuiToggleButton",e)}var y=(0,v.A)("MuiToggleButton",["root","disabled","selected","standard","primary","secondary","sizeSmall","sizeMedium","sizeLarge","fullWidth"]),B=o(4848);const $=["children","className","color","disabled","exclusive","fullWidth","onChange","orientation","size","value"],x=(0,u.Ay)("div",{name:"MuiToggleButtonGroup",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[{[`& .${f.grouped}`]:t.grouped},{[`& .${f.grouped}`]:t[`grouped${(0,p.A)(o.orientation)}`]},{[`& .${f.firstButton}`]:t.firstButton},{[`& .${f.lastButton}`]:t.lastButton},{[`& .${f.middleButton}`]:t.middleButton},t.root,"vertical"===o.orientation&&t.vertical,o.fullWidth&&t.fullWidth]}})((({ownerState:e,theme:t})=>(0,n.A)({display:"inline-flex",borderRadius:(t.vars||t).shape.borderRadius},"vertical"===e.orientation&&{flexDirection:"column"},e.fullWidth&&{width:"100%"},{[`& .${f.grouped}`]:(0,n.A)({},"horizontal"===e.orientation?{[`&.${f.selected} + .${f.grouped}.${f.selected}`]:{borderLeft:0,marginLeft:0}}:{[`&.${f.selected} + .${f.grouped}.${f.selected}`]:{borderTop:0,marginTop:0}})},"horizontal"===e.orientation?{[`& .${f.firstButton},& .${f.middleButton}`]:{borderTopRightRadius:0,borderBottomRightRadius:0},[`& .${f.lastButton},& .${f.middleButton}`]:{marginLeft:-1,borderLeft:"1px solid transparent",borderTopLeftRadius:0,borderBottomLeftRadius:0}}:{[`& .${f.firstButton},& .${f.middleButton}`]:{borderBottomLeftRadius:0,borderBottomRightRadius:0},[`& .${f.lastButton},& .${f.middleButton}`]:{marginTop:-1,borderTop:"1px solid transparent",borderTopLeftRadius:0,borderTopRightRadius:0}},"horizontal"===e.orientation?{[`& .${f.lastButton}.${y.disabled},& .${f.middleButton}.${y.disabled}`]:{borderLeft:"1px solid transparent"}}:{[`& .${f.lastButton}.${y.disabled},& .${f.middleButton}.${y.disabled}`]:{borderTop:"1px solid transparent"}})));var C=a.forwardRef((function(e,t){const o=(0,c.A)({props:e,name:"MuiToggleButtonGroup"}),{children:r,className:l,color:u="standard",disabled:v=!1,exclusive:m=!1,fullWidth:f=!1,onChange:A,orientation:y="horizontal",size:C="medium",value:R}=o,z=(0,i.A)(o,$),E=(0,n.A)({},o,{disabled:v,fullWidth:f,orientation:y,size:C}),W=(e=>{const{classes:t,orientation:o,fullWidth:a,disabled:r}=e,l={root:["root","vertical"===o&&"vertical",a&&"fullWidth"],grouped:["grouped",`grouped${(0,p.A)(o)}`,r&&"disabled"],firstButton:["firstButton"],lastButton:["lastButton"],middleButton:["middleButton"]};return(0,s.A)(l,g,t)})(E),T=a.useCallback(((e,t)=>{if(!A)return;const o=R&&R.indexOf(t);let a;R&&o>=0?(a=R.slice(),a.splice(o,1)):a=R?R.concat(t):[t],A(e,a)}),[A,R]),w=a.useCallback(((e,t)=>{A&&A(e,R===t?null:t)}),[A,R]),k=a.useMemo((()=>({className:W.grouped,onChange:m?w:T,value:R,size:C,fullWidth:f,color:u,disabled:v})),[W.grouped,m,w,T,R,C,f,u,v]),N=function(e){return a.Children.toArray(e).filter((e=>a.isValidElement(e)))}(r),S=N.length,M=e=>{const t=0===e,o=e===S-1;return t&&o?"":t?W.firstButton:o?W.lastButton:W.middleButton};return(0,B.jsx)(x,(0,n.A)({role:"group",className:(0,d.A)(W.root,l),ref:t,ownerState:E},z,{children:(0,B.jsx)(h.Provider,{value:k,children:N.map(((e,t)=>(0,B.jsx)(b.Provider,{value:M(t),children:e},t)))})}))})),R=o(6311),z=o(2021),E=o(332);function W(e,t){return void 0!==t&&void 0!==e&&(Array.isArray(t)?t.indexOf(e)>=0:e===t)}const T=["value"],w=["children","className","color","disabled","disableFocusRipple","fullWidth","onChange","onClick","selected","size","value"],k=(0,u.Ay)(E.A,{name:"MuiToggleButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[`size${(0,p.A)(o.size)}`]]}})((({theme:e,ownerState:t})=>{let o,a="standard"===t.color?e.palette.text.primary:e.palette[t.color].main;return e.vars&&(a="standard"===t.color?e.vars.palette.text.primary:e.vars.palette[t.color].main,o="standard"===t.color?e.vars.palette.text.primaryChannel:e.vars.palette[t.color].mainChannel),(0,n.A)({},e.typography.button,{borderRadius:(e.vars||e).shape.borderRadius,padding:11,border:`1px solid ${(e.vars||e).palette.divider}`,color:(e.vars||e).palette.action.active},t.fullWidth&&{width:"100%"},{[`&.${y.disabled}`]:{color:(e.vars||e).palette.action.disabled,border:`1px solid ${(e.vars||e).palette.action.disabledBackground}`},"&:hover":{textDecoration:"none",backgroundColor:e.vars?`rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,z.X4)(e.palette.text.primary,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${y.selected}`]:{color:a,backgroundColor:e.vars?`rgba(${o} / ${e.vars.palette.action.selectedOpacity})`:(0,z.X4)(a,e.palette.action.selectedOpacity),"&:hover":{backgroundColor:e.vars?`rgba(${o} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,z.X4)(a,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${o} / ${e.vars.palette.action.selectedOpacity})`:(0,z.X4)(a,e.palette.action.selectedOpacity)}}}},"small"===t.size&&{padding:7,fontSize:e.typography.pxToRem(13)},"large"===t.size&&{padding:15,fontSize:e.typography.pxToRem(15)})}));var N=a.forwardRef((function(e,t){const o=a.useContext(h),{value:r}=o,l=(0,i.A)(o,T),u=a.useContext(b),v=(0,R.A)((0,n.A)({},l,{selected:W(e.value,r)}),e),m=(0,c.A)({props:v,name:"MuiToggleButton"}),{children:g,className:f,color:y="standard",disabled:$=!1,disableFocusRipple:x=!1,fullWidth:C=!1,onChange:z,onClick:E,selected:N,size:S="medium",value:M}=m,O=(0,i.A)(m,w),P=(0,n.A)({},m,{color:y,disabled:$,disableFocusRipple:x,fullWidth:C,size:S}),L=(e=>{const{classes:t,fullWidth:o,selected:a,disabled:r,size:l,color:i}=e,n={root:["root",a&&"selected",r&&"disabled",o&&"fullWidth",`size${(0,p.A)(l)}`,i]};return(0,s.A)(n,A,t)})(P),D=u||"";return(0,B.jsx)(k,(0,n.A)({className:(0,d.A)(l.className,L.root,f,D),disabled:$,focusRipple:!x,ref:t,onClick:e=>{E&&(E(e,M),e.defaultPrevented)||z&&z(e,M)},onChange:z,value:M,ownerState:P,"aria-pressed":N},O,{children:g}))})),S=o(9067),M=o(4977),O=o(2325),P=o(6990),L=o(5304),D=o(2070),I=o(2947),j=o(9581);const G={search:"",pageNo:0,pageSize:-1,sortBy:"",sortOrder:"",filters:{showOnHomepage:!0}};function H(){var e,t,o,i;const{0:n,1:d}=(0,a.useState)("all"),{0:s,1:u}=(0,a.useState)(null),{0:c,1:p}=(0,a.useState)(G),{0:v,1:m}=(0,a.useState)({}),{data:g}=(0,I.A)(j.H.getProduct,"post",c),{data:f,loading:h}=(0,I.A)(j.H.productPrices,"post",v,60);(0,a.useEffect)((()=>{const e="gold"===n?17:"silver"===n?18:void 0;p({...c,filters:{...c.filters,metalId:e}})}),[n]),(0,a.useEffect)((()=>{var e;if((null==f||null===(e=f.data)||void 0===e?void 0:e.length)>0){var t;const e={};null==f||null===(t=f.data)||void 0===t||t.forEach((t=>e[null==t?void 0:t.productId]=t)),u(e)}}),[f]),(0,a.useEffect)((()=>{var e,t;if((null==g||null===(e=g.data)||void 0===e||null===(t=e.items)||void 0===t?void 0:t.length)>0){var o,a;const e=null==g||null===(o=g.data)||void 0===o||null===(a=o.items)||void 0===a?void 0:a.map((e=>null==e?void 0:e.productId));m({productIds:e})}}),[g]);return a.createElement(r.A,{id:"PopularProducts",component:"section"},a.createElement(L.w,{title:"Popular Products",description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}),a.createElement(l.A,{className:"ToggleWrapper"},a.createElement(C,{color:"primary",value:n,onChange:(e,t)=>{null!==t&&d(t)},"aria-label":"Products toggle",exclusive:!0},a.createElement(N,{value:"all"},"All"),a.createElement(N,{value:"gold"},"Gold"),a.createElement(N,{value:"silver"},"Silver"))),a.createElement(S.A,{className:"ProductsWrapper"},a.createElement(S.A,{className:"Wrapper"},(null==g||null===(e=g.data)||void 0===e||null===(t=e.items)||void 0===t?void 0:t.length)>0?null==g||null===(o=g.data)||void 0===o||null===(i=o.items)||void 0===i?void 0:i.map((e=>(e.priceWithDetails=s?s[null==e?void 0:e.productId]:null,a.createElement(D.A,{key:e.productId,product:e})))):Array(12).fill(0).map(((e,t)=>a.createElement(M.A,{className:"ProductCard",key:t},a.createElement(O.A,{animation:"wave",height:500,style:{borderRadius:"10px 10px 0 0",padding:"0px"}}),a.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}},a.createElement(O.A,{animation:"wave",height:95,width:"95%",style:{marginBottom:"4px"}}),a.createElement(O.A,{animation:"wave",height:70,width:"95%"})))))),a.createElement(l.A,{className:"Action"},a.createElement(P.A,{className:"DiscoverMore",name:"DiscoverMore","aria-label":"DiscoverMore",variant:"contained"},"Discover More"))))}var X=a.memo(H)}}]);
//# sourceMappingURL=514-6cd0bad9b29c7cfa7f66.js.map