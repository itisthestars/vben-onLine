import{_ as c}from"./BasicForm.vue_vue_type_script_setup_true_lang-DIn1pRzt.js";import"./BasicForm.vue_vue_type_style_index_0_lang-DQUhReNk.js";import"./componentMap-CYFpdnng.js";import{C as d,a as f}from"./entry/index-VJM-_B3m.js";import{P as _}from"./index-DIB0dVNh.js";import{M as a,C as i}from"./index-C6Ohhv3l.js";import{d as g,a3 as C,V as b,a6 as n,k as s,u as o,l as p}from"./vue-CZYcLuVH.js";import"./FormItem.vue_vue_type_script_lang-gXjHvygV.js";import"./helper-MM8B7jAV.js";import"./antd-BA4tRdrP.js";import"./index-CrJR8h6z.js";import"./useWindowSizeFn-9RgF6vNY.js";import"./useFormItem-CEoeBkec.js";import"./RadioButtonGroup.vue_vue_type_script_setup_true_lang-Br6s4Q0L.js";import"./index-iguYw4db.js";import"./uuid-D0SLUWHI.js";import"./useSortable-CluWmx7V.js";import"./download-C5sSDlBo.js";import"./base64Conver-sUr-KUg7.js";import"./index-CAgrvdh2.js";import"./IconPicker.vue_vue_type_script_setup_true_lang-B0uAEQ4k.js";import"./copyTextToClipboard-EhsKC1py.js";import"./index-DojOR5b0.js";import"./index-B9CI9CxX.js";import"./useContentViewHeight-CYA2lL7o.js";import"./onMountedOrActivated-DahpobXO.js";const G=g({__name:"Editor",setup(h){const m=[{field:"title",component:"Input",label:"title",defaultValue:"标题",rules:[{required:!0}]},{field:"JSON",component:"Input",label:"JSON",defaultValue:`{
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
