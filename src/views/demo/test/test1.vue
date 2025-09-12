/* stylelint-disable at-rule-no-unknown */
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
      >iconify iconname<Icon icon="skill-icons:gitlab-light" color="#3fb27f" size="30" />
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
      >ant-design 按需引入
      <div>
        <Slider id="test" v-model:value="value1" :disabled="disabled" />
        <Slider v-model:value="value2" range :disabled="disabled" />
        Disabled:
        <Switch v-model:checked="disabled" size="small" />
      </div>
      <div>
        <Row justify="start" :gutter="{ xs: 5, sm: 16, md: 24, lg: 32 }">
          <Col :span="6">
            <Card hoverable style="width: 100%">
              <template #cover>
                <img
                  alt="example"
                  src="https://itisthestar.oss-cn-hangzhou.aliyuncs.com/wanye.jpg"
                />
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
              </CardMeta> </Card
          ></Col>
          <Col :span="12">
            <Table
              @change="handleTableChange"
              :pagination="paginationConfig"
              :dataSource="currentPageData"
              :columns="columns"
            >
              <template #headerCell="{ column }">
                <template v-if="column.key === 'name'">
                  <span>
                    <smile-outlined />
                    姓名
                  </span>
                </template>
              </template>
              <template #bodyCell="{ text, record, index, column }">
                <template v-if="column.key === 'age'">
                  <span :style="{ color: record.age > 10 ? 'green' : 'red' }">
                    {{ record.age }}
                  </span>
                </template>
                <template v-if="column.key === 'action'">
                  <Space>
                    <Button type="primary" size="small" @click="edit(record.key, record)"
                      >编辑</Button
                    >
                    <Button
                      type="primary"
                      size="small"
                      @click="console.log(text, index, column, record)"
                      >打印</Button
                    >
                    <Button type="primary" size="small" @click="del(record.key)"
                      >删除</Button
                    ></Space
                  >
                </template>
              </template>
            </Table>
          </Col>
        </Row>
        <Modal @ok="handldOk" v-model:open="isOpenEdit">
          <template #title>
            <span style="display: inline-block; width: 400px; cursor: move" ref="modalTitleRef"
              >用户信息修改<Icon icon="line-md:edit-twotone" size="16" />
              <Icon icon="si:move-duotone" size="16"
            /></span>
          </template>
          <template #closeIcon>
            <Icon icon="logos:close" size="32" />
          </template>
          <template #cancelText>
            <span>放弃编辑<Icon icon="noto-v1:face-without-mouth" size="16" /></span>
          </template>
          <template #modalRender="{ originVNode }">
            <div :style="transformStyle">
              <component :is="originVNode" />
            </div>
          </template>
          <div>{{ edititem }}</div>
          <Input v-model:value="edititem.name" placeholder="Basic usage">
            <template #prefix>
              <div style="padding: 0 5px; border-right: 1px solid black"></div>
            </template>
            <template #suffix>
              <Tooltip title="请修改信息">
                <info-circle-outlined style="color: rgb(0 0 0 / 45%)" />
              </Tooltip>
            </template>
            <template #addonBefore
              ><div style="padding: 0 5px">Name<user-outlined /></div>
            </template>
            <template #addonAfter
              ><Icon icon="streamline-ultimate-color:smiley-prank" size="16"
            /></template>
          </Input>

          <Input
            v-model:value="edititem.age"
            placeholder="Basic usage"
            :class="{ 'age-over-18': isOver18, 'age-under-18': !isOver18 }"
          >
            <template #prefix>
              <div style="padding: 0 5px; border-right: 1px solid black"></div>
            </template>
            <template #suffix>
              <Tooltip title="请修改信息">
                <info-circle-outlined style="color: rgb(0 0 0 / 45%)" />
              </Tooltip>
            </template>
            <template #addonBefore
              ><div style="padding: 0 5px">Age <Icon icon="openmoji:mage" size="25" /></div>
            </template>
            <template #addonAfter
              ><Icon icon="streamline-ultimate-color:smiley-prank" size="16"
            /></template>
          </Input>
          <Input style="margin-top: 5px" v-model:value="edititem.address" placeholder="Basic usage">
            <template #prefix>
              <div style="padding: 0 5px; border-right: 1px solid black"></div>
            </template>
            <template #suffix>
              <Tooltip title="请修改信息">
                <info-circle-outlined style="color: rgb(0 0 0 / 45%)" />
              </Tooltip>
            </template>
            <template #addonBefore
              ><div style="padding: 0 5px">Address <Icon icon="entypo:address" size="25" /></div>
            </template>
            <template #addonAfter
              ><Icon icon="streamline-ultimate-color:smiley-prank" size="16"
            /></template>
          </Input>
          <br />
          <br />
        </Modal>
      </div>
      <div>
        <Row :gutter="10">
          <Col class="gutter-row" :span="6">
            <Button type="primary" danger @click="useGoPath()">Usego 跳转</Button>
          </Col>
          <Col class="gutter-row" :span="12">
            <div class="gutter-box">col-6</div>
          </Col>
        </Row>
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
  import {
    Slider,
    Switch,
    Card,
    CardMeta,
    Avatar,
    Table,
    Row,
    Col,
    Button,
    Space,
    Modal,
    Input,
    Tooltip,
  } from 'ant-design-vue';
  import {
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
    HomeOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
    LoadingOutlined,
    UserOutlined,
    InfoCircleOutlined,
  } from '@ant-design/icons-vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { useDraggable } from '@vueuse/core';
  import { ref, computed, watch, watchEffect } from 'vue';
  import { GoType, useGo } from '@/hooks/web/usePage';

  const value1 = ref<number>(0);
  const value2 = ref<[number, number]>([20, 50]);
  const disabled = ref<boolean>(false);
  const isOpenEdit = ref<boolean>(false);
  const go = useGo();

  // 拖动弹窗
  const modalTitleRef = ref<any>(null);
  const { x, y, isDragging } = useDraggable(modalTitleRef);
  const startX = ref<number>(0);
  const startY = ref<number>(0);
  const startedDrag = ref(false);
  const transformX = ref(0);
  const transformY = ref(0);
  const preTransformX = ref(0);
  const preTransformY = ref(0);
  const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });
  watch([x, y], () => {
    if (!startedDrag.value) {
      startX.value = x.value;
      startY.value = y.value;
      const bodyRect = document.body.getBoundingClientRect();
      const titleRect = modalTitleRef.value.getBoundingClientRect();
      dragRect.value.right = bodyRect.width - titleRect.width;
      dragRect.value.bottom = bodyRect.height - titleRect.height;
      preTransformX.value = transformX.value;
      preTransformY.value = transformY.value;
    }
    startedDrag.value = true;
  });
  watch(isDragging, () => {
    if (!isDragging) {
      startedDrag.value = false;
    }
  });

  watchEffect(() => {
    if (startedDrag.value) {
      transformX.value =
        preTransformX.value +
        Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
        startX.value;
      transformY.value =
        preTransformY.value +
        Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
        startY.value;
    }
  });
  const transformStyle = computed(() => {
    return {
      transform: `translate(${transformX.value}px, ${transformY.value}px)`,
    };
  });

  const dataSource = ref([
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底号',
    },
    {
      key: '3',
      name: '王小虎',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '4',
      name: 'wqxq',
      age: 2,
      address: '西湖区湖底公园1号',
    },
    {
      key: '5',
      name: '张丽华',
      age: 28,
      address: '西湖区湖畔路8号',
    },
    {
      key: '6',
      name: '李明远',
      age: 35,
      address: '西湖区湖畔路12号',
    },
    {
      key: '7',
      name: '赵文静',
      age: 29,
      address: '西湖区湖心岛5号',
    },
    {
      key: '8',
      name: '陈志强',
      age: 45,
      address: '西湖区湖心岛18号',
    },
    {
      key: '9',
      name: '孙晓东',
      age: 26,
      address: '西湖区湖边街7号',
    },
    {
      key: '10',
      name: '欧阳雪',
      age: 31,
      address: '西湖区湖边街15号',
    },
    {
      key: '11',
      name: '吴建国',
      age: 52,
      address: '西湖区湖光路9号',
    },
    {
      key: '12',
      name: '郑婷婷',
      age: 27,
      address: '西湖区湖光路22号',
    },
    {
      key: '13',
      name: '王大力',
      age: 38,
      address: '西湖区湖景园3号楼',
    },
    {
      key: '14',
      name: '刘芳',
      age: 33,
      address: '西湖区湖景园7号楼',
    },
    {
      key: '15',
      name: '黄俊杰',
      age: 24,
      address: '西湖区湖心路5号',
    },
    {
      key: '16',
      name: '周敏',
      age: 41,
      address: '西湖区湖心路19号',
    },
    {
      key: '17',
      name: '林小燕',
      age: 29,
      address: '西湖区湖西村8组',
    },
    {
      key: '18',
      name: '张强',
      age: 36,
      address: '西湖区湖西村12组',
    },
    {
      key: '19',
      name: '赵敏',
      age: 30,
      address: '西湖区湖东小区15号',
    },
    {
      key: '20',
      name: 'liuyy',
      age: 5,
      address: '西湖区湖东小区23号',
    },
  ]);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      key: 'action',
    },
  ];
  // 3. 分页配置（响应式）
  const paginationConfig = ref({
    pageSize: 5, // 默认每页5条
    showSizeChanger: true, // 显示每页条数选择器
    pageSizeOptions: ['5', '10', '20'], // 可选每页条数
    showTotal: (total: number) => `共 ${total} 条数据`, // 显示总条数
    current: 1, // 默认当前页
    total: dataSource.value.length, // 总数据量
  });
  // 4. 计算当前页需要显示的数据（前端分页）
  const currentPageData = computed(() => {
    const { current, pageSize } = paginationConfig.value;
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    // 从原始数据中截取当前页数据
    return dataSource.value.slice(startIndex, endIndex);
  });

  // 5. 监听分页变化事件（页码切换/每页条数切换）
  const handleTableChange = (pagination: any) => {
    // 更新分页配置（current页码 或 pageSize每页条数）
    paginationConfig.value = {
      ...paginationConfig.value,
      current: pagination.current, // 新页码;currentcurrentcurrentcurrentcurrentcurrentcurrent
      pageSize: pagination.pageSize, // 新每页条数pageSizepageSizepageSizepageSizepageSizepageSize
    };
  };
  const del = (key: string) => {
    console.log(key);
    dataSource.value = dataSource.value.filter((item) => item.key !== key);
  };
  let edititem = ref<any>({
    key: '13',
    name: '王大力',
    age: 38,
    address: '西湖区湖景园3号楼',
  });
  const edit = (key: string, item) => {
    console.log('编辑', key, item);
    // 避免内存引用问题 使用对象展开运算符进行浅拷贝
    edititem.value = { ...dataSource.value.find((item) => item.key === key) };
    // console.log(edititem.value);
    isOpenEdit.value = true;
  };
  const handldOk = () => {
    console.log('点击了确定按钮');
    // 这里可以添加保存逻辑
    // 比如更新dataSource中的对应数据
    const index = dataSource.value.findIndex((item) => item.key === edititem.value.key);
    if (index !== -1) {
      dataSource.value[index] = { ...edititem.value }; // 更新数据
    }
    isOpenEdit.value = false; // 关闭弹窗
  };
  // 计算属性：判断是否大于18岁
  const isOver18 = computed(() => {
    const age = Number(edititem.value.age);
    return !isNaN(age) && age > 18;
  });
  watch(
    () => edititem, // 监听整个edititem对象
    (newVal) => {
      console.log('edititem任意属性变化了', newVal);
    },
    {
      deep: true,
      immediate: true, // 立即执行一次回调函数
    }, // 必须加deep: true，否则无法监听对象内部属性变化
  );
  // watchEffect(() => {
  //   // 关键：访问 edititem.value（ref的内部值）
  //   console.log('edititem任意属性变化了', edititem.value.name);
  // });
  // const ageInputStyle = computed(() => {
  //     return {
  //       marginTop: '5px',
  //       color: edititem.value.age > 10 ? 'green' : 'red',
  //     };
  //   });
  // const ageInputStyle = ref({ marginTop: '5px', color: 'black' });
  // watch(edititem, (newVal) => {
  //   ageInputStyle.value.color = newVal.age > 10 ? 'green' : 'red';
  // });
  const useGoPath = () => {
    // go();
    go('/dashboard/workbench?data1=1', GoType.after);
  };
</script>

<style scoped lang="less">
  @bg1: #52c41a;

  :deep(.ant-table-thead > tr > th) {
    background-color: #1890ff !important; /* Ant Design 蓝色主题色 */
    color: white !important; /* 文字颜色改为白色，与蓝色背景对比 */
  }

  /* 可选：修改表头hover状态的样式 */
  :deep(.ant-table-thead > tr > th:hover) {
    background-color: #096dd9 !important; /* 稍深的蓝色 */
  }

  .gutter-box {
    width: 100%;
    height: 32px;
    background-color: pink;
  }

  :deep(.ant-input) {
    // color: pink;colorcolorcolorcolorcolorcolorcolorcolor
  }

  /* 大于18岁的样式 - 使用deep穿透到内部input元素 */
  :deep(.age-over-18 .ant-input) {
    color: @bg1 !important;
  }

  /* 小于等于18岁的样式 */
  :deep(.age-under-18 .ant-input) {
    color: red !important;
  }
</style>
