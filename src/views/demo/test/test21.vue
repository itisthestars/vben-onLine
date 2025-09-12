<template>
  <div>
    <div class="btn-container">
      <d-button variant="solid" @click="changeTheme">切换主题</d-button>
    </div>
    <div class="theme-container" :class="themeClass">
      <McMarkdownCard :content="content" :theme="theme" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  const theme = ref('light');
  const themeClass = ref('light-background');
  let themeService;
  const content = ref(`
# 快速排序（Quick Sort）

### 介绍
**快速排序（Quick Sort）**：是一种高效的排序算法，它采用分治法（Divide and Conquer）的思想。它的基本思路是：

1. 选择一个基准值（pivot）
2. 将数组分成两部分：小于基准值的部分和大于等于基准值的部分
3. 递归地对这两部分进行排序

### 代码实现

1. 以下是快速排序的实现方法
\`\`\`ts
function quickSort(arr) {
  function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 使用示例
const arr = [3, 6, 8, 10, 1, 2, 1];
console.log(quickSort(arr)); // 输出排序后的数组
}
\`\`\`
`);

  const changeTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    theme.value;
    themeClass.value =
      themeClass.value === 'light-background' ? 'dark-background' : 'light-background';
    themeClass.value;
  };

  const themeChange = () => {
    if (themeService) {
      theme.value = themeService.currentTheme.id === 'infinity-theme' ? 'light' : 'dark';
      themeService.currentTheme.id;
      themeClass.value =
        themeService.currentTheme.id === 'infinity-theme' ? 'light-background' : 'dark-background';
      themeService.currentTheme.id;
    }
  };

  onMounted(() => {
    if (typeof window !== 'undefined') {
      themeService = window['devuiThemeService'];
    }
    themeChange();
    if (themeService && themeService.eventBus) {
      themeService.eventBus.add('themeChanged', themeChange);
    }
  });
</script>
<style scoped lang="scss">
  .btn-container {
    display: flex;
    justify-content: end;
  }

  .theme-container {
    margin-top: 8px;
    padding: 12px;
    border-radius: 8px;
  }

  .light-background {
    background-color: #f6f6f8;
  }

  .dark-background {
    background-color: #1a1a1c;
  }
</style>
