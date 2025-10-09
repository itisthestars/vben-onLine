<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'myname'">{{ record.myname }} </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '编辑',
                onClick: (e) => {
                  e.stopPropagation();
                  edit();
                },
                size: 'small',
                type: 'primary',
                ifShow: !editShow1,
                popConfirm: {
                  title: '是否确认',
                  description: '编辑后将无法恢复，请谨慎操作',
                  okText: '确认',
                  cancelText: '取消',
                  okType: 'success',
                  confirm: () => {
                    // console.log('编辑', record);
                    openDrawer(record);
                  },
                  cancel: () => {
                    console.log('取消编辑');
                  },
                },
              },
            ]"
          >
          </TableAction>
        </template>
      </template>
    </BasicTable>
    <Drawer1 @register="registerDrawer1" />
    
  </div>
</template>

<script setup>
  import { ref, onMounted, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { useDrawer } from '@/components/Drawer';
  import Drawer1 from './components/Drawer1.vue';

  const tableColumns = ref([
    {
      title: '姓名',
      dataIndex: 'myname',
      width: 200,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 200,
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: 200,
    },
  ]);
  const editShow1 = ref(false);
  const dataSource = ref([
    { myname: '张三', age: 18, address: '北京市朝阳区' },
    { myname: '李四', age: 20, address: '北京市海淀区' },
    { myname: '王五', age: 22, address: '北京市东城区' },
    { myname: '赵六', age: 24, address: '北京市西城区' },
    { myname: '孙七', age: 26, address: '北京市丰台区' },
    { myname: '周八', age: 28, address: '北京市石景山区' },
    { myname: '吴九', age: 30, address: '北京市门头沟区' },
    { myname: '郑十', age: 32, address: '北京市房山区' },
    { myname: '钱十一', age: 34, address: '北京市通州区' },
    { myname: '孙十二', age: 36, address: '北京市顺义区' },
    { myname: '周十三', age: 38, address: '北京市怀柔区' },
    { myname: '吴十四', age: 40, address: '北京市延庆区' },
    { myname: '郑十五', age: 42, address: '北京市密云区' },
    { myname: '钱十六', age: 44, address: '北京市平谷区' },
    { myname: '孙十七', age: 46, address: '北京市延庆区' },
    { myname: '周十八', age: 48, address: '北京市延庆区' },
    { myname: '吴十九', age: 50, address: '北京市延庆区' },
  ]);
  const [
    registerTable,
    {
      setLoading,
      setProps,
      getColumns,
      getDataSource,
      getRawDataSource,
      reload,
      getPaginationRef,
      setPagination,
      getSelectRows,
      getSelectRowKeys,
      setSelectedRowKeys,
      clearSelectedRowKeys,
    },
  ] = useTable({
    canResize: true,
    title: 'useTable',
    titleHelpMessage: '使用useTable',
    //   // api: demoListApi,
    columns: tableColumns.value,
    dataSource: dataSource.value,
    showIndexColumn: true,
    pagination: true,
    clickToRowSelect: true,
    rowSelection: {
      type: 'checkbox',
    },
    showTableSetting: true,
    striped: true,

    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
    },
  });
  const [registerDrawer1, { openDrawer: openDrawer1 }] = useDrawer();
  const edit = (record) => {
    // console.log(record);
  };

  const openDrawer = (item) => {
    openDrawer1(true, item);
  };
</script>

<style lang="less" scoped>
  // :deep(.ant-table-body) {
  //   height: 100%!important;

  // }
  ::v-deep(.ant-table-body) {
    height: 500px !important;
    // min-height: 616px;
  }
</style>
