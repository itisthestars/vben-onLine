import type { AppRouteModule } from '@/router/types';
import { getParentLayout, LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const test: AppRouteModule = {
  path: '/test', // 路由路径
  name: 'TestModule', // 路由名称，需唯一
  component: LAYOUT, // 使用全局默认布局
  redirect: '/test/test1', // 默认跳转的子路由
  meta: {
    orderNo: 10, // 路由排序，决定在菜单中的位置
    icon: 'fxemoji:dolphin', // 菜单图标
    title: '测试模块', // 菜单标题，使用i18n国际化
  },
  children: [
    // 测试页面1
    {
      path: 'test1', // 完整路径为/test/test1
      name: 'TestPage1', // 路由名称，需唯一
      meta: {
        title: '测试页面1', // 页面标题
         icon: 'fxemoji:grinwide',
        // 不需要单独设置图标，会继承父级
      },
      // 引入测试页面1的组件
      component: () => import('@/views/demo/test/test1.vue'),
    },
    
    // 测试页面2（包含子页面）
    {
      path: 'test2', // 完整路径为/test/test2
      name: 'TestPage2', // 路由名称，需唯一
      component: getParentLayout('TestPage2'), // 使用父级布局
      meta: {
        title: '测试页面2', // 页面标题
            icon: 'fxemoji:sunflower',
      },
      redirect: '/test/test2/test2-1', // 默认跳转的子路由
      children: [
        // 测试页面2-1
        {
          path: 'test2-1', // 完整路径为/test/test2/test2-1
          name: 'TestPage2-1', // 路由名称，需唯一
          component: () => import('@/views/demo/test/test21.vue'),
          meta: {
            title:'测试页面2-1', // 页面标题
            icon: 'fxemoji:spurtingwhale',
          },
        },
        // 测试页面2-2
        {
          path: 'test2-2', // 完整路径为/test/test2/test2-2
          name: 'TestPage2-2', // 路由名称，需唯一
          component: () => import('@/views/demo/test/test22.vue'),
          meta: {
            title: '测试页面2-2', // 页面标题
            icon: 'fxemoji:snowmanwithoutsnow',
          },
        },
      ],
    },
  ],
};

export default test;
    