<template>
  <div>
    <div ref="echartsContainer" id="main" style="width: 50vw; height: 40vh"></div>

    <CheckableTag
      v-for="(tag, index) in tagsData"
      :key="tag"
      v-model:checked="selectTags[index]"
      @change="(checked) => handleChange(tag, checked)"
    >
      {{ tag }}
    </CheckableTag></div
  >
</template>

<script setup>
  import { ref, onMounted, reactive } from 'vue';
  import { CheckableTag } from 'ant-design-vue';
  import * as echarts from 'echarts';
  window.echarts = echarts;
  import wonderland from './theme/wonderland.json';
  const tagsData = reactive(['Movies', 'Books', 'Music', 'Sports']);
  const selectTags = reactive([false, true, false, false]);
  const handleChange = (tag, checked) => {
    console.log(tag, checked);
  };
  const echartsContainer = ref(null);
  let myChart = null;
  // 指定图表的配置项和数据
  const option1 = {
    legend: {},
    tooltip: {},
    dataset: {
      // 提供一份数据。
      source: [
        ['product', '2015', '2016', '2017'],
        ['Matcha Latte', 43.3, 85.8, 93.7],
        ['Milk Tea', 83.1, 73.4, 55.1],
        ['Cheese Cocoa', 86.4, 65.2, 82.5],
        ['Walnut Brownie', 72.4, 53.9, 39.1],
      ],
    },
    // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
    xAxis: { type: 'category' },
    // 声明一个 Y 轴，数值轴。
    yAxis: {},
    // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'line' }],
  };
  const option = {
    grid: [
      { right: '55%', containLabel: true },
      { left: '50%', containLabel: true },
    ],
    xAxis: [
      { type: 'category', gridIndex: 0, data: ['A', 'B', 'C'] },
      { type: 'category', gridIndex: 1, data: ['X', 'Y', 'Z'] },
    ],
    yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
    series: [
      { type: 'bar', data: [10, 20, 30], xAxisIndex: 0, yAxisIndex: 0 },
      { type: 'bar', data: [20, 30, 40], xAxisIndex: 1, yAxisIndex: 1 },
      { type: 'line', data: [15, 25, 35], xAxisIndex: 0, yAxisIndex: 0 },
      { type: 'line', data: [5, 15, 25], xAxisIndex: 1, yAxisIndex: 1 },
    ],
  };

  const option2 = {
    title: {
      text: 'ECharts ',
    },
    tooltip: {},
    legend: {
      data: ['销量'],
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [
          {
            value: 12,
            itemStyle: { color: '#FF6B6B' },
          }, // 单独设置颜色
          {
            value: 20,
            itemStyle: { color: '#4ECDC4' },
          },
          {
            value: 15,
          },
          {
            value: 8,
          },
          {
            value: 7,
          },
          {
            value: 11,
          },
        ],
      },
      {
        name: '销量1',
        type: 'line',
        color: ['#FFD04B', '#843F97'],
        data: [15, 20, 36, 10, 10, 20],
      },
      {
        name: '销量3',
        type: 'line',
        data: [25, 10, 16, 30, 10, 40],
        lineStyle: {
          width: 3,
          type: 'dashed',
          color: '#5470C6',
        },
      },
      {
        name: '销量2',
        type: 'line',
        data: [15, 30, 46, 20, 20, 30],
      },
    ],
  };

  onMounted(() => {
    echarts.registerTheme('wonderland', wonderland);
    myChart = echarts.init(echartsContainer.value, 'wonderland');

    // 使用配置项显示图表
    myChart.setOption(option);

    // 可选：监听窗口大小变化，自动调整图表尺寸
    window.addEventListener('resize', () => {
      myChart.resize();
    });
  });
</script>

<style lang="scss" scoped></style>
