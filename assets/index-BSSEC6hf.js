import{M as c,a as _}from"./index-Fv5Cz2Qk.js";import{P as h}from"./index-DU2sVE1R.js";import{V as k}from"./antd-BA4tRdrP.js";import{d as w,f as s,ai as g,a3 as R,V,a6 as n,X as u,k as o,G as i,u as r}from"./vue-CZYcLuVH.js";import"./entry/index-BUx0ZtK4.js";import"./index-CyMTl9Jh.js";import"./useWindowSizeFn-D9WlziNN.js";import"./onMountedOrActivated-DahpobXO.js";import"./useContentViewHeight-BzqGlWnE.js";const b={class:"mt-2"},j=w({__name:"index",setup(C){const l=s(null),t=s(`
# 标题h1

##### 标题h5

**加粗**
*斜体*
~~删除线~~
[链接](https://github.com/vbenjs/vue-vben-admin)
↓分割线↓

---


* 无序列表1
  * 无序列表1.1

1. 有序列表1
2. 有序列表2

* [ ] 任务列表1
* [x] 任务列表2

> 引用示例

\`\`\`js
// 代码块:
(() => {
  var htmlRoot = document.getElementById('htmlRoot');
  var theme = window.localStorage.getItem('__APP__DARK__MODE__');
  if (htmlRoot && theme) {
    htmlRoot.setAttribute('data-theme', theme);
    theme = htmlRoot = null;
  }
})();
\`\`\`

| 表格 | 示例 | 🎉️ |
| --- | --- | --- |
| 1 | 2 | 3 |
| 4 | 5 | 6 |
`);function d(){const a=r(l);if(!a)return;a.getVditor().setTheme("dark","dark","dracula")}function f(a){t.value=a}function p(){t.value=""}return(a,e)=>{const m=g("a-button");return V(),R(r(h),{title:"MarkDown组件示例"},{default:n(()=>[u("div",null,[o(m,{onClick:d,class:"mb-2",type:"primary"},{default:n(()=>[...e[1]||(e[1]=[i(" 黑暗主题 ",-1)])]),_:1}),o(m,{onClick:p,class:"mb-2",type:"default"},{default:n(()=>[...e[2]||(e[2]=[i(" 清空内容 ",-1)])]),_:1}),o(r(c),{value:t.value,"onUpdate:value":e[0]||(e[0]=v=>t.value=v),onChange:f,ref_key:"markDownRef",ref:l,placeholder:"这是占位文本"},null,8,["value"])]),u("div",b,[o(r(k),{title:"Markdown Viewer 组件演示"},{default:n(()=>[o(r(_),{value:t.value},null,8,["value"])]),_:1})])]),_:1})}}});export{j as default};
