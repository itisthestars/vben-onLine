import { defineConfig, presetTypography, presetUno } from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetTypography()],
  shortcuts: {
    // 定义 btn-primary 快捷方式
    'btn-primary':
      'py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors',
    // 你也可以先定义基础 btn 样式，再在其基础上扩展
    btn: 'py-2 px-4 rounded-md transition-colors',
    'btn-secondary': 'btn bg-gray-200 text-gray-800 hover:bg-gray-300',
  },
});
