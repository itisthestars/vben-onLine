<script lang="tsx">
  // 导入Vue相关类型定义
  import type { PropType, CSSProperties } from 'vue';

  // 导入Vue核心API和组件
  import { computed, defineComponent, unref, toRef } from 'vue';
  import { BasicMenu } from '@/components/Menu'; // 基础菜单组件
  import { SimpleMenu } from '@/components/SimpleMenu'; // 简化版菜单组件
  import { AppLogo } from '@/components/Application'; // 应用Logo组件

  // 导入菜单相关枚举常量
  import { MenuModeEnum, MenuSplitTyeEnum } from '@/enums/menuEnum';

  // 导入hooks
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'; // 菜单配置相关hook
  import { ScrollContainer } from '@/components/Container'; // 滚动容器组件

  import { useGo } from '@/hooks/web/usePage'; // 页面跳转相关hook
  import { useSplitMenu } from './useLayoutMenu'; // 菜单分割逻辑hook
  import { openWindow } from '@/utils'; // 打开新窗口工具函数
  import { propTypes } from '@/utils/propTypes'; // 属性类型定义工具
  import { isHttpUrl } from '@/utils/is'; // URL判断工具函数
  import { useRootSetting } from '@/hooks/setting/useRootSetting'; // 根配置相关hook
  import { useAppInject } from '@/hooks/web/useAppInject'; // 应用注入相关hook
  import { useDesign } from '@/hooks/web/useDesign'; // 样式设计相关hook

  // 定义布局菜单组件
  export default defineComponent({
    name: 'LayoutMenu', // 组件名称
    props: {
      // 菜单主题：浅色/深色
      theme: propTypes.oneOf(['light', 'dark']),

      // 菜单分割类型：不分割/顶部分割/左侧分割
      splitType: {
        type: Number as PropType<MenuSplitTyeEnum>,
        default: MenuSplitTyeEnum.NONE,
      },

      // 是否为水平菜单布局
      isHorizontal: propTypes.bool,

      // 菜单模式：纵向/横向等
      menuMode: {
        type: [String] as PropType<MenuModeEnum | null>,
        default: '',
      },
    },
    setup(props) {
      // 获取页面跳转方法
      const go = useGo();

      // 从菜单配置hook中获取所需配置
      const {
        getMenuMode, // 菜单模式
        getMenuType, // 菜单类型
        getMenuTheme, // 菜单主题
        getCollapsed, // 菜单是否折叠
        getCollapsedShowTitle, // 折叠时是否显示标题
        getAccordion, // 是否开启手风琴模式（只展开一个子菜单）
        getIsHorizontal, // 是否为水平布局
        getIsSidebarType, // 是否为侧边栏类型
        getSplit, // 是否开启菜单分割
      } = useMenuSetting();

      // 从根配置hook中获取是否显示Logo
      const { getShowLogo } = useRootSetting();

      // 获取样式前缀（用于CSS命名空间）
      const { prefixCls } = useDesign('layout-menu');

      // 根据分割类型获取对应的菜单数据
      const { menusRef } = useSplitMenu(toRef(props, 'splitType'));

      // 从应用注入中获取是否为移动设备
      const { getIsMobile } = useAppInject();

      /**
       * 计算最终的菜单模式
       * - 移动设备下强制使用INLINE模式（纵向菜单）
       * - 否则使用props传入的menuMode或全局配置的getMenuMode
       */
      const getComputedMenuMode = computed(() => unref(getIsMobile) ? MenuModeEnum.INLINE : props.menuMode || unref(getMenuMode),
      );

      /**
       * 计算最终的菜单主题
       * - 优先使用props传入的theme
       * - 否则使用全局配置的getMenuTheme
       */
      const getComputedMenuTheme = computed(() => props.theme || unref(getMenuTheme));

      /**
       * 计算是否显示Logo
       * - 需同时满足：全局配置显示Logo 且 是侧边栏类型布局
       */
      const getIsShowLogo = computed(() => unref(getShowLogo) && unref(getIsSidebarType));

      /**
       * 计算是否需要使用滚动容器
       * 满足以下条件时启用：
       * - 非水平布局
       * - 且（是侧边栏类型 或 分割类型为左侧 或 不分割）
       */
      const getUseScroll = computed(() => {
        return (
          !unref(getIsHorizontal) &&
          (unref(getIsSidebarType) ||
            props.splitType === MenuSplitTyeEnum.LEFT ||
            props.splitType === MenuSplitTyeEnum.NONE)
        );
      });

      /**
       * 计算菜单容器样式
       * - 高度根据是否显示Logo动态调整（显示Logo则减去48px高度）
       */
      const getWrapperStyle = computed((): CSSProperties => {
        return {
          height: `calc(100% - ${unref(getIsShowLogo) ? '48px' : '0px'})`,
        };
      });

      /**
       * 计算Logo的样式类名
       * - 包含基础类名、主题类名
       * - 移动设备下添加移动设备类名
       */
      const getLogoClass = computed(() => {
        return [
          `${prefixCls}-logo`,
          unref(getComputedMenuTheme),
          {
            [`${prefixCls}--mobile`]: unref(getIsMobile),
          },
        ];
      });

      /**
       * 计算菜单组件的公共属性
       * 提取通用配置，供BasicMenu和SimpleMenu共用
       */
      const getCommonProps = computed(() => {
        const menus = unref(menusRef);
        return {
          menus, // 菜单数据
          beforeClickFn: beforeMenuClickFn, // 点击前的拦截函数
          items: menus, // 菜单项（兼容不同组件的参数名）
          theme: unref(getComputedMenuTheme), // 主题
          accordion: unref(getAccordion), // 手风琴模式
          collapse: unref(getCollapsed), // 是否折叠
          collapsedShowTitle: unref(getCollapsedShowTitle), // 折叠时是否显示标题
          onMenuClick: handleMenuClick, // 菜单点击事件处理
        };
      });

      /**
       * 菜单点击事件处理函数
       * @param path - 菜单对应的路径
       */
      function handleMenuClick(path: string) {
        go(path); // 调用路由跳转方法
      }

      /**
       * 菜单点击前的拦截函数
       * @param path - 菜单对应的路径
       * @returns 是否允许继续执行点击事件
       */
      async function beforeMenuClickFn(path: string) {
        // 如果是HTTP链接（外部链接）
        if (!isHttpUrl(path)) {
          return true; // 允许继续执行（内部路由跳转）
        }
        openWindow(path); // 打开外部链接
        return false; // 阻止后续事件（不执行内部路由跳转）
      }

      /**
       * 渲染Logo头部区域
       * @returns Logo组件或null（不满足显示条件时）
       */
      function renderHeader() {
        // 不显示Logo且非移动设备时，返回null
        if (!unref(getIsShowLogo) && !unref(getIsMobile)) return null;

        return (
          <AppLogo
            showTitle={!unref(getCollapsed)} // 菜单未折叠时显示标题
            class={unref(getLogoClass)} // 应用计算的样式类
            theme={unref(getComputedMenuTheme)} // 应用主题
          />
        );
      }

      /**
       * 渲染菜单组件
       * 根据布局类型选择SimpleMenu或BasicMenu
       * @returns 菜单组件或null（无菜单数据时）
       */
      function renderMenu() {
        console.log('公共配置',getComputedMenuMode.value)
        console.log('isHorizontal',props.isHorizontal)
        const { menus, ...menuProps } = unref(getCommonProps);
        console.log('菜单配置', menus); // 调试用：打印菜单数据

        // 无菜单数据时返回null
        if (!menus || !menus.length) return null;

        // 非水平布局使用SimpleMenu，水平布局使用BasicMenu
        if(!props.isHorizontal){
          console.log('渲染SimpleMenu');
        }else{
          console.log('渲染BasicMenu');
        }
        return !props.isHorizontal ? (
          <SimpleMenu {...menuProps} isSplitMenu={unref(getSplit)} items={menus} />
        ) : (
          <BasicMenu
            {...(menuProps as any)}
            isHorizontal={props.isHorizontal} // 标记为水平菜单
            type={unref(getMenuType)} // 菜单类型
            showLogo={unref(getIsShowLogo)} // 是否显示Logo
            mode={unref(getComputedMenuMode as any)} // 菜单模式
            items={menus} // 菜单项
          />
        );
      }

      // 组件渲染函数
      return () => {
        return (
          <>
            {/* 渲染Logo头部 */}
            {renderHeader()}

            {/* 根据是否需要滚动容器，决定是否包裹滚动组件 */}
            {unref(getUseScroll) ? (
              <ScrollContainer style={unref(getWrapperStyle)}>{() => renderMenu()}</ScrollContainer>
            ) : (
              renderMenu()
            )}
          </>
        );
      };
    },
  });
</script>

<style lang="less">
  // 定义样式前缀（与JS中的prefixCls对应）
  @prefix-cls: ~'@{namespace}-layout-menu';
  @logo-prefix-cls: ~'@{namespace}-app-logo';

  // 布局菜单主样式
  .@{prefix-cls} {
    // Logo区域样式
    &-logo {
      height: @header-height; // 使用全局头部高度变量
      padding: 10px 4px 10px 10px;padding // 内边距

      // Logo图片样式
      img {
        width: @logo-width; // 使用全局Logo宽度变量
        height: @logo-width;// 宽高相等（正方形）
      }
    }

    // 移动设备下的样式
    &--mobile {
      // 移动设备下Logo标题始终显示（opacity: 1）
      .@{logo-prefix-cls} {
        &__title {
          opacity: 1;
        }
      }
    }
  }
</style>