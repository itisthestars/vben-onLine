import{M as i,C as g,J as _}from"./index-DUWfI_RE.js";import{P as C}from"./index-BJIJfNvs.js";import{am as d,$ as R,M as p}from"./antd-BA4tRdrP.js";import{d as b,f as v,ai as D,a3 as k,V as y,a6 as e,k as n,u as a,G as m,l as B}from"./vue-CZYcLuVH.js";import"./entry/index-BmFZXaSM.js";import"./useWindowSizeFn-BCz0jO_a.js";import"./useContentViewHeight-C1bdbeOg.js";import"./onMountedOrActivated-DahpobXO.js";const c='{"name":"BeJson","url":"http://www.xxx.com","page":88,"isNonProfit":true,"address":{"street":"科技园路.","city":"江苏苏州","country":"中国"},"links":[{"name":"Google","url":"http://www.xxx.com"},{"name":"Baidu","url":"http://www.xxx.com"},{"name":"SoSo","url":"http://www.xxx.com"}]}',M=`
(() => {
  var htmlRoot = document.getElementById('htmlRoot');
  var theme = window.localStorage.getItem('__APP__DARK__MODE__');
  if (htmlRoot && theme) {
    htmlRoot.setAttribute('data-theme', theme);
    theme = htmlRoot = null;
  }
})();
  `,P=`
<!DOCTYPE html>
<html lang="en" id="htmlRoot">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="renderer" content="webkit" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0"
    />
    <title><%= title %></title>
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body>
    <div id="app">
    </div>
  </body>
</html>
  `,V=b({__name:"index",setup(S){const r=d.Button,f=d.Group,l=v(i.JSON),o=v(c),h=s=>{const t=s.target.value;if(t===i.JSON){o.value=c;return}if(t===i.HTMLMIXED){o.value=P;return}if(t===i.JAVASCRIPT){o.value=M;return}};function w(){a(l)==="application/json"?p.info({title:"编辑器当前值",content:B(_,{data:JSON.parse(o.value)})}):p.info({title:"编辑器当前值",content:o.value})}return(s,t)=>{const x=D("a-button");return y(),k(a(C),{title:"代码编辑器组件示例",contentFullHeight:"",fixedHeight:"",contentBackground:""},{extra:e(()=>[n(a(R),{size:"middle"},{default:e(()=>[n(x,{onClick:w,type:"primary"},{default:e(()=>[...t[2]||(t[2]=[m("获取数据",-1)])]),_:1}),n(a(f),{"button-style":"solid",value:l.value,"onUpdate:value":t[0]||(t[0]=u=>l.value=u),onChange:h},{default:e(()=>[n(a(r),{value:"application/json"},{default:e(()=>[...t[3]||(t[3]=[m(" json数据 ",-1)])]),_:1}),n(a(r),{value:"htmlmixed"},{default:e(()=>[...t[4]||(t[4]=[m(" html代码 ",-1)])]),_:1}),n(a(r),{value:"javascript"},{default:e(()=>[...t[5]||(t[5]=[m(" javascript代码 ",-1)])]),_:1})]),_:1},8,["value"])]),_:1})]),default:e(()=>[n(a(g),{value:o.value,"onUpdate:value":t[1]||(t[1]=u=>o.value=u),mode:l.value},null,8,["value","mode"])]),_:1})}}});export{V as default};
