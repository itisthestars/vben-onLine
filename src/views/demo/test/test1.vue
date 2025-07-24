<template>
  <div
    >这是测试页面1-- 一个页面只能有一个根元素
    <div>
      ant-icon
      <a-space warp>
        <a-button type="primary" danger>Primary</a-button>
        <a-button danger>Default</a-button>
        <a-button type="dashed" danger>Dashed</a-button>
        <a-button type="text" danger>Text</a-button>
        <a-button type="link" danger>Link</a-button>
      </a-space>
      <a-space>
        <home-outlined />
        <setting-filled />
        <smile-outlined />
        <sync-outlined spin />
        <smile-outlined :rotate="180" />
        <loading-outlined /> </a-space
    ></div>
    <div
      >iconify iconname<Icon icon="skill-icons:gitlab-light" color="#3fb27f" size="30"></Icon>
      iconsvg
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 256 256">
        <g fill="none">
          <rect width="256" height="256" fill="#2231cd" rx="60" />
          <path fill="#e24329" d="m127.999 220.001l37.562-113.192h-75.12L128 219.997z" />
          <path fill="#501e05" d="M127.999 220.001L90.441 106.809h-52.64l90.198 113.188z" />
          <path
            fill="#94611a"
            d="m37.8 106.806l-11.417 34.4c-1.043 3.136.094 6.574 2.822 8.513L128 220.001L37.8 106.809z"
          />
          <path
            fill="#e24329"
            d="M37.8 106.805h52.641L67.817 38.63c-1.164-3.507-6.235-3.507-7.397 0L37.8 106.808z"
          />
          <path fill="#501e05" d="m128 220.001l37.562-113.192h52.643L128 219.997z" />
          <path
            fill="#94611a"
            d="m218.203 106.806l11.416 34.4c1.041 3.136-.1 6.574-2.824 8.513L128 220.001l90.203-113.192z"
          />
          <path
            fill="#e24329"
            d="M218.202 106.805h-52.64l22.622-68.175c1.165-3.506 6.235-3.506 7.397 0l22.624 68.178z"
          />
        </g>
      </svg>
    </div>
    <div
      >ant-design
      按需引入
      <div>
        <Slider id="test" v-model:value="value1" :disabled="disabled" />
        <Slider v-model:value="value2" range :disabled="disabled" />
        Disabled:
        <Switch v-model:checked="disabled" size="small" />
      </div>
      <div>
        <Card hoverable style="width: 300px">
          <template #cover>
            <img alt="example" src="https://itisthestar.oss-cn-hangzhou.aliyuncs.com/wanye.jpg" />
          </template>
          <template #actions>
            <setting-outlined key="setting" />
            <edit-outlined key="edit" />
            <ellipsis-outlined key="ellipsis" />
          </template>
          <CardMeta title="这是标题" description="这是描述">
            <template #avatar>
              <Avatar src="https://itisthestar.oss-cn-hangzhou.aliyuncs.com/web2.png" />
            </template>
          </CardMeta>
        </Card>
      </div>
      <!-- <img src="https://itisthestar.oss-cn-hangzhou.aliyuncs.com/wanye.jpg" alt=""> -->

      <!-- <a-card hoverable style="width: 240px">
        <template #cover>
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </template>
        <a-card-meta title="Europe Street beat">
          <template #description>www.instagram.com</template>
        </a-card-meta>
      </a-card> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Slider, Switch, Card, CardMeta,  Avatar } from 'ant-design-vue';
  import {
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
    HomeOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
    LoadingOutlined,
  } from '@ant-design/icons-vue';

  import Icon from '@/components/Icon/Icon.vue';

  import { ref } from 'vue';

  const value1 = ref<number>(0);
  const value2 = ref<[number, number]>([20, 50]);
  const disabled = ref<boolean>(false);
</script>

<style scoped lang="less"></style>
