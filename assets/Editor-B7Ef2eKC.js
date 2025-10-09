import{_ as c}from"./BasicForm.vue_vue_type_script_setup_true_lang-BU12mo26.js";import"./BasicForm.vue_vue_type_style_index_0_lang-DPVDUe8e.js";import"./componentMap-B6KkKZ1q.js";import{C as d,a as f}from"./entry/index-Be056_tE.js";import{P as _}from"./index-D4crmGeM.js";import{M as a,C as i}from"./index-WrAQ8-Js.js";import{d as g,a3 as C,V as b,a6 as n,k as s,u as o,l as p}from"./vue-CZYcLuVH.js";import"./FormItem.vue_vue_type_script_lang-q8KGAMLR.js";import"./helper-D46bqAPs.js";import"./antd-BA4tRdrP.js";import"./index-Cu9m3Ahs.js";import"./useWindowSizeFn-DzNNC3Qx.js";import"./useFormItem-CEoeBkec.js";import"./RadioButtonGroup.vue_vue_type_script_setup_true_lang-CJgKo72p.js";import"./index-DVe6ygqc.js";import"./uuid-D0SLUWHI.js";import"./useSortable-D7YRm_9I.js";import"./download-Du6vLd8B.js";import"./base64Conver-sUr-KUg7.js";import"./index-CSRBlFSn.js";import"./IconPicker.vue_vue_type_script_setup_true_lang-0dSb6THa.js";import"./copyTextToClipboard-EhsKC1py.js";import"./index-sH4Ip0Xa.js";import"./index-SIJwhUpc.js";import"./useContentViewHeight-DT9lRWta.js";import"./onMountedOrActivated-DahpobXO.js";const G=g({__name:"Editor",setup(h){const m=[{field:"title",component:"Input",label:"title",defaultValue:"标题",rules:[{required:!0}]},{field:"JSON",component:"Input",label:"JSON",defaultValue:`{
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
