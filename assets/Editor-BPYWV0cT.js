import{_ as c}from"./BasicForm.vue_vue_type_script_setup_true_lang-CkMQGU5R.js";import"./BasicForm.vue_vue_type_style_index_0_lang-Dkq0xDme.js";import"./componentMap-Dx0-ykY0.js";import{C as d,a as f}from"./entry/index-D1R5ealb.js";import{P as _}from"./index-4bXuCKFT.js";import{M as a,C as i}from"./index-BoeqH2Vt.js";import{d as g,a3 as C,V as b,a6 as n,k as s,u as o,l as p}from"./vue-CZYcLuVH.js";import"./FormItem.vue_vue_type_script_lang-BIG81rrZ.js";import"./helper-WuhOTZAd.js";import"./antd-BA4tRdrP.js";import"./index-CyawGd3i.js";import"./useWindowSizeFn-Dr2N6HA_.js";import"./useFormItem-CEoeBkec.js";import"./RadioButtonGroup.vue_vue_type_script_setup_true_lang-CpDGByoJ.js";import"./index-B3QqxTHi.js";import"./uuid-D0SLUWHI.js";import"./useSortable-BhZe--oJ.js";import"./download-i8FiAY3w.js";import"./base64Conver-sUr-KUg7.js";import"./index-CZnVNp6n.js";import"./IconPicker.vue_vue_type_script_setup_true_lang-lCP7WTux.js";import"./copyTextToClipboard-EhsKC1py.js";import"./index-C8oigSXZ.js";import"./index-DaEHBofd.js";import"./useContentViewHeight-CxxsxD2O.js";import"./onMountedOrActivated-DahpobXO.js";const G=g({__name:"Editor",setup(h){const m=[{field:"title",component:"Input",label:"title",defaultValue:"标题",rules:[{required:!0}]},{field:"JSON",component:"Input",label:"JSON",defaultValue:`{
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
