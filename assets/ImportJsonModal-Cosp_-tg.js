var M=Object.defineProperty,I=Object.defineProperties;var U=Object.getOwnPropertyDescriptors;var C=Object.getOwnPropertySymbols;var j=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var b=(e,o,a)=>o in e?M(e,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[o]=a,i=(e,o)=>{for(var a in o||(o={}))j.call(o,a)&&b(e,a,o[a]);if(C)for(var a of C(o))k.call(o,a)&&b(e,a,o[a]);return e},m=(e,o)=>I(e,U(o));import{u as J}from"./useFormDesignState-DYJ_lylh.js";import{f as g,g as O}from"./index-BTc5V_Az.js";import{C as _,M as w}from"./index-qKNocfd8.js";import{a as E,c as N}from"./entry/index-DAHXR0BT.js";import{M as D,aH as S}from"./antd-Bp8JzQqk.js";import{d as F,r as V,I as $,ai as r,a3 as x,V as B,a6 as n,X as h,k as l,G as c}from"./vue-DdhQyU-d.js";import"./useWindowSizeFn-CmfjHW1W.js";const T=F({name:"ImportJsonModal",components:{CodeEditor:_,Upload:S,Modal:D},setup(){const{createMessage:e}=E(),o=V({visible:!1,json:`{
  "schemas": [
    {
      "component": "input",
      "label": "输入框",
      "field": "input_2",
      "span": 24,
      "props": {
        "type": "text"
      }
    }
  ],
  "layout": "horizontal",
  "labelLayout": "flex",
  "labelWidth": 100,
  "labelCol": {},
  "wrapperCol": {}
}`,jsonData:{schemas:{},config:{}},handleSetSelectItem:null}),{formDesignMethods:a}=J(),d=()=>{o.visible=!1},f=()=>{o.visible=!0},p=()=>{try{const t=JSON.parse(o.json);t.schemas&&g(t.schemas,s=>{O(s)}),a.setFormConfig(m(i({},t),{activeKey:1,currentItem:{component:""}})),d(),e.success("导入成功")}catch(t){e.error("导入失败，数据格式不对")}};return m(i({handleImportJson:p,beforeUpload:t=>{const s=new FileReader;return s.readAsText(t),s.onload=function(){o.json=this.result,p()},!1},handleCancel:d,showModal:f},$(o)),{MODE:w})}}),K={class:"v-json-box"};function L(e,o,a,d,f,p){const u=r("CodeEditor"),t=r("a-button"),s=r("Upload"),v=r("Modal");return B(),x(v,{title:"JSON数据",open:e.visible,onOk:e.handleImportJson,onCancel:e.handleCancel,cancelText:"关闭",destroyOnClose:!0,wrapClassName:"v-code-modal",style:{top:"20px"},width:850},{footer:n(()=>[l(t,{onClick:e.handleCancel},{default:n(()=>[...o[1]||(o[1]=[c("取消",-1)])]),_:1},8,["onClick"]),l(s,{class:"upload-button",beforeUpload:e.beforeUpload,showUploadList:!1,accept:"application/json"},{default:n(()=>[l(t,{type:"primary"},{default:n(()=>[...o[2]||(o[2]=[c("导入json文件",-1)])]),_:1})]),_:1},8,["beforeUpload"]),l(t,{type:"primary",onClick:e.handleImportJson},{default:n(()=>[...o[3]||(o[3]=[c("确定",-1)])]),_:1},8,["onClick"])]),default:n(()=>[o[4]||(o[4]=h("p",{class:"hint-box"},"导入格式如下:",-1)),h("div",K,[l(u,{value:e.json,"onUpdate:value":o[0]||(o[0]=y=>e.json=y),ref:"myEditor",mode:e.MODE.JSON},null,8,["value","mode"])])]),_:1},8,["open","onOk","onCancel"])}const P=N(T,[["render",L],["__scopeId","data-v-62ebfefa"]]);export{P as default};
