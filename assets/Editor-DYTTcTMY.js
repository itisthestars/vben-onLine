import{_ as c}from"./BasicForm.vue_vue_type_script_setup_true_lang-DsotBgMo.js";import"./BasicForm.vue_vue_type_style_index_0_lang-CCGaOPP2.js";import"./componentMap-BfomYzjV.js";import{C as d,a as f}from"./entry/index-DAHXR0BT.js";import{P as _}from"./index-X8e0NcGH.js";import{M as a,C as i}from"./index-qKNocfd8.js";import{d as g,a3 as C,V as b,a6 as n,k as s,u as o,l as p}from"./vue-DdhQyU-d.js";import"./FormItem.vue_vue_type_script_lang-Bh6CdOaz.js";import"./helper-dtqtwqJr.js";import"./antd-Bp8JzQqk.js";import"./index-4RrtIrO2.js";import"./useWindowSizeFn-CmfjHW1W.js";import"./useFormItem-qiFQow_c.js";import"./RadioButtonGroup.vue_vue_type_script_setup_true_lang-BGaBoiLt.js";import"./index-CpPkdiC-.js";import"./uuid-D0SLUWHI.js";import"./useSortable-BqxTRq3n.js";import"./download-8Siqj5dn.js";import"./base64Conver-sUr-KUg7.js";import"./index-DrJtsPVY.js";import"./IconPicker.vue_vue_type_script_setup_true_lang-mqQ3N-Op.js";import"./copyTextToClipboard-Cz3oY3iE.js";import"./index-DLxhcpHN.js";import"./index-_U9yz__m.js";import"./useContentViewHeight-DxET5L8Y.js";import"./onMountedOrActivated-wek5WTBG.js";const G=g({__name:"Editor",setup(h){const m=[{field:"title",component:"Input",label:"title",defaultValue:"标题",rules:[{required:!0}]},{field:"JSON",component:"Input",label:"JSON",defaultValue:`{
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
