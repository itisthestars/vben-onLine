import{_ as c}from"./BasicForm.vue_vue_type_script_setup_true_lang-DgKkNEHu.js";import"./BasicForm.vue_vue_type_style_index_0_lang-CBL9Pk3p.js";import"./componentMap-CbjsbtCe.js";import{C as d,a as f}from"./entry/index-DE-8w0Ib.js";import{P as _}from"./index-ChRBae9_.js";import{M as a,C as i}from"./index-Rv0oRLRE.js";import{d as g,a3 as C,V as b,a6 as n,k as s,u as o,l as p}from"./vue-CZYcLuVH.js";import"./FormItem.vue_vue_type_script_lang-CJ9hrcOn.js";import"./helper-ce8zHzR8.js";import"./antd-BA4tRdrP.js";import"./index-thBebrz1.js";import"./useWindowSizeFn-i5Up7cMo.js";import"./useFormItem-CEoeBkec.js";import"./RadioButtonGroup.vue_vue_type_script_setup_true_lang-Ci4-WFSI.js";import"./index-DWHmde_l.js";import"./uuid-D0SLUWHI.js";import"./useSortable-DH1GueYk.js";import"./download-DvqDQGKc.js";import"./base64Conver-sUr-KUg7.js";import"./index-lqEBrA72.js";import"./IconPicker.vue_vue_type_script_setup_true_lang-CQLzM5-z.js";import"./copyTextToClipboard-EhsKC1py.js";import"./index-BA9r9vfs.js";import"./index-FocMm0aD.js";import"./useContentViewHeight-aF2OFGDl.js";import"./onMountedOrActivated-DahpobXO.js";const G=g({__name:"Editor",setup(h){const m=[{field:"title",component:"Input",label:"title",defaultValue:"标题",rules:[{required:!0}]},{field:"JSON",component:"Input",label:"JSON",defaultValue:`{
        "name":"BeJson",
        "url":"http://www.xxx.com",
        "page":88,
        "isNonProfit":true,"
        address:{ 
            "street":"科技园路.",
            "city":"江苏苏州",
            "country":"中国"
        },
}`,rules:[{required:!0,trigger:"blur"}],render:({model:e,field:t})=>p(i,{value:e[t],mode:a.JSON,onChange:r=>{e[t]=r},config:{tabSize:10}})},{field:"PYTHON",component:"Input",label:"PYTHON",defaultValue:`def functionname( parameters ):
   "函数_文档字符串"
   function_suite
   return [expression]`,rules:[{required:!0,trigger:"blur"}],render:({model:e,field:t})=>p(i,{value:e[t],mode:a.PYTHON,onChange:r=>{e[t]=r}})}],{createMessage:u}=f();function l(e){u.success("click search,values:"+JSON.stringify(e))}return(e,t)=>(b(),C(o(_),{title:"代码编辑器组件嵌入Form示例"},{default:n(()=>[s(o(d),{title:"代码编辑器组件"},{default:n(()=>[s(o(c),{labelWidth:100,schemas:m,actionColOptions:{span:24},baseColProps:{span:24},onSubmit:l})]),_:1})]),_:1}))}});export{G as default};
