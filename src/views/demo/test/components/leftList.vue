<template>
  <Card
    style="height: 100%; overflow: auto; overflow-x: hidden; border-radius: 8px 0 0 8px"
    title="存储对话列表"
  >
    <p style="margin-bottom: 16px; color: rgb(0 0 0 / 85%); font-size: 14px; font-weight: 500">
      <button @click="clearTalk">清除对话</button>
    </p>
    <Card
      v-for="(item, index) in allMsgs"
      :key="item[1]?.id || index"
      :hoverable="true"
      :title="item[0]?.content || '对话'"
      style="margin-top: 10px"
    >
      <div
        style="
          display: -webkit-box;
          max-height: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          line-clamp: 3;
        "
      >
        {{ item[1]?.content || '' }}
      </div>
    </Card>
  </Card>
</template>

<script setup lang="ts">
  import { defineProps, ref, watch, onMounted } from 'vue';
  import type { PropType } from 'vue';
  import { Card } from 'ant-design-vue';

  // 明确 props 类型
  const props = defineProps({
    currentMsg: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  });

  // 使用内部状态，不直接复用 props 引用
  const allMsgs = ref<any[][]>([
    [
      {
        from: 'user',
        content: '你好！很高兴见到你！',
        avatarConfig: { name: 'user' },
      },
      {
        from: 'model',
        content:
          '好的，驼人集团的总部位于中国河南省**新乡市长垣市**。\n\n这是一个非常具体的位置，以下是详细信息：\n\n**1. 总部详细地址：**\n* **地址：** 河南省新乡市长垣市驼人健康产业园区\n* **邮编：** 453400\n\n**2. 关于所在地——长垣市：**\n* 长垣市是河南省的一个县级市，由新乡市代管。\n* 它被称为“中国医疗耗材之都”，医疗器械产业是其支柱产业。驼人集团正是从这里发展起来，并成为该领域的龙头企业。\n\n**3. 主要生产基地和园区：**\n* 驼人集团的核心生产和运营都集中在**长垣市**。\n* 集团建设了规模庞大的“**驼人健康产业园区**”，集生产、研发、交易、物流、医疗、教育等功能于一体。\n\n**4. 其他地点：**\n* 除了长垣总部，驼人集团在全国主要省市（如北京、上海、广州等）以及海外（如美国、印度、德国等）设有**子公司、办事处或研发中心**，用于市场销售、技术支持和研发合作。\n* 但其**主要制造基地和集团总部**始终在河南长垣。\n\n**总结一下：**\n\n如果您需要联系集团总部、参观工厂或进行商务合作，您的目的地就是：\n\n**河南省新乡市长垣市**。\n\n**如何前往：**\n* **最近的机场：** 新郑国际机场（CGO，位于郑州），然后可乘坐高铁或汽车前往长垣。\n* **高铁：** 可乘坐高铁至“**长垣站**”，出站后打车即可到达驼人集团园区。\n* **自驾：** 导航至“驼人健康产业园区”即可。\n\n如果您需要具体的联系方式，可以访问他们的官方网站（通常搜索“驼人集团官网”即可找到）获取最新的电话和邮箱。',
        avatarConfig: { name: 'model' },
        id: '0568ab1e-9985-4f34-9b8b-1c71de1f2270',
        loading: false,
      },
    ],
    [
      {
        from: 'user',
        content: '你好！很高兴见到你！',
        avatarConfig: { name: 'user' },
      },
      {
        from: 'model',
        content:
          '好的，驼人集团的总部位于中国河南省**新乡市长垣市**。\n\n这是一个非常具体的位置，以下是详细信息：\n\n**1. 总部详细地址：**\n* **地址：** 河南省新乡市长垣市驼人健康产业园区\n* **邮编：** 453400\n\n**2. 关于所在地——长垣市：**\n* 长垣市是河南省的一个县级市，由新乡市代管。\n* 它被称为“中国医疗耗材之都”，医疗器械产业是其支柱产业。驼人集团正是从这里发展起来，并成为该领域的龙头企业。\n\n**3. 主要生产基地和园区：**\n* 驼人集团的核心生产和运营都集中在**长垣市**。\n* 集团建设了规模庞大的“**驼人健康产业园区**”，集生产、研发、交易、物流、医疗、教育等功能于一体。\n\n**4. 其他地点：**\n* 除了长垣总部，驼人集团在全国主要省市（如北京、上海、广州等）以及海外（如美国、印度、德国等）设有**子公司、办事处或研发中心**，用于市场销售、技术支持和研发合作。\n* 但其**主要制造基地和集团总部**始终在河南长垣。\n\n**总结一下：**\n\n如果您需要联系集团总部、参观工厂或进行商务合作，您的目的地就是：\n\n**河南省新乡市长垣市**。\n\n**如何前往：**\n* **最近的机场：** 新郑国际机场（CGO，位于郑州），然后可乘坐高铁或汽车前往长垣。\n* **高铁：** 可乘坐高铁至“**长垣站**”，出站后打车即可到达驼人集团园区。\n* **自驾：** 导航至“驼人健康产业园区”即可。\n\n如果您需要具体的联系方式，可以访问他们的官方网站（通常搜索“驼人集团官网”即可找到）获取最新的电话和邮箱。',
        avatarConfig: { name: 'model' },
        id: '0568ab1e-9985-4f34-9b8b-1c71de1f2270',
        loading: false,
      },
    ],
  ]);

  // 从 localStorage 恢复（如果有）
  onMounted(() => {
    const raw = localStorage.getItem('allmsgs');
    if (raw) {
      const parsed = JSON.parse(raw);
      allMsgs.value = parsed;
    }
  });

  // 当父组件传入的 currentMsg 有变化时，追加其深拷贝到 allMsgs（不要直接 push props 引用）
  watch(
    () => props.currentMsg,
    (newVal) => {
      // console.log('监听到 currentMsg 变化：', newVal);
      if (!newVal || !Array.isArray(newVal) || newVal.length === 0) {
        console.log('newVal 无效，忽略');
        return;
      }

      const copy = JSON.parse(JSON.stringify(newVal));
      // console.log('currentMsg 变化，追加到 allMsgs：', copy);
      // 如果 newVal 本身是单条对话（二维结构），按需追加
      // 这里避免重复追加：可根据 id 或内容做去重检查（示例中简单追加）
      if (
        (allMsgs.value.length === 0 ||
          allMsgs.value[allMsgs.value.length - 1][1]?.id !== copy[1]?.id) &&
        copy[1]?.id !== null
      ) {
        console.log('追加新对话', copy);
        allMsgs.value.push(copy);
        localStorage.setItem('allmsgs', JSON.stringify(allMsgs.value));
      } else if (copy[1]?.id !== null) {
        console.log('更新最后一条对话');
        allMsgs.value[allMsgs.value.length - 1] = copy;
        localStorage.setItem('allmsgs', JSON.stringify(allMsgs.value));
      }
    },
    { deep: true },
  );

  // 持久化 allMsgs 到 localStorage
  // watch(
  //   () => allMsgs.value,
  //   (newVal) => {
  //     try {
  //       localStorage.setItem('allmsgs', JSON.stringify(newVal));
  //     } catch (e) {
  //       console.error('保存 allmsgs 失败', e);
  //     }
  //   },
  //   { deep: true, immediate: true },
  // );

  const clearTalk = () => {
    try {
      localStorage.removeItem('allmsgs');
      allMsgs.value = [];
    } catch (e) {
      console.error(e);
    }
  };
</script>

<style scoped lang="less"></style>
