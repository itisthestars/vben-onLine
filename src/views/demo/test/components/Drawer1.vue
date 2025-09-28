<template>
  <BasicDrawer v-bind="$attrs" @register="register" title="Drawer Title" width="50%">
    {{ data }}
    <a-button type="primary" @click="closeDrawer"> 内部关闭drawer </a-button>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  const data = ref();
  const [register, { closeDrawer }] = useDrawerInner((record) => {
    console.log(record);
    data.value = record;
  });
</script>
