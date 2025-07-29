import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/ja_JP';

const modules = import.meta.glob('./ja/**/*.{json,ts,js}', { eager: true });
export default {
  message: {
    ...genMessage(modules as Recordable<Recordable>, 'ja'),
    antdLocale,
  },
  dateLocale: null,
  dateLocaleName: 'ja',
};
