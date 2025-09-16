<template>
  <div>
    <div class="btn-container">
      <d-button variant="solid" @click="generateAnswer">{{
        isLoading ? '停止' : '重新生成'
      }}</d-button>
    </div>
    <div id="think-demo-content">
      <template v-for="(msg, idx) in messages" :key="idx">
        <McBubble
          v-if="msg.from === 'user'"
          :content="msg.content"
          :align="'right'"
          :avatarConfig="msg.avatarConfig"
        ></McBubble>
        <McBubble
          v-else
          :loading="msg.loading ?? false"
          :avatarConfig="msg.avatarConfig"
          :variant="'bordered'"
          :class="msg.isThinkShrink ? 'think-block-shrink' : 'think-block-expand'"
        >
          <div class="think-toggle-btn" @click="toggleThink(msg)">
            <i class="icon-point"></i>
            <span>{{ thinkBtnText }}</span>
            <i :class="btnIcon"></i>
          </div>
          <McMarkdownCard :enableThink="true" :content="mockAnswer" :theme="theme"></McMarkdownCard>
        </McBubble>
      </template>
    </div>
  </div>
</template>
<script setup>
  import { ref, onMounted } from 'vue';
  let themeService;
  const theme = ref('light');
  const messages = ref([]);
  const aiModelAvatar = {
    imgSrc: 'https://matechat.gitcode.com/logo.svg',
    width: 32,
    height: 32,
  };
  const isLoading = ref(false);
  let interval = null;
  const thinkBtnText = ref('已深度思考 (用时16秒)');
  const btnIcon = ref('icon-chevron-up-2');
  const mockAnswer = `
<think>嗯，用户问的是“驼人集团在哪里？”，这是一个非常直接的地理位置查询问题。用户可能是需要前往该集团办事、求职或进行商业合作，所以需要具体的地址信息。

驼人集团在医疗器械领域比较知名，但可能不是大众耳熟能详的企业，所以用户可能对它的具体位置不太清楚。考虑到用户可能需要的不仅是地址，还包括如何前往、集团背景等附加信息，我可以提供更全面的回复。

首先确认驼人集团的总部所在地——河南新乡长垣市，这里是中国的医疗器械重要生产基地之一。然后提供详细地址，包括街道和邮编，这样用户可以直接使用导航或邮寄材料。考虑到用户可能从不同地方前往，补充交通方式会更有帮助，比如高铁、自驾或飞机路线。

另外，用户可能也想了解集团的基本情况，比如业务范围和产业地位，这样能更放心地前往或合作。所以我会简要介绍它的主营业务和行业地位，增加回复的实用性。

最后，提醒用户通过官方渠道核实信息，确保地址和交通方式的准确性，避免跑错地方。这样的回复既解决了核心问题，也提供了周边信息，用户应该会满意。
</think>

好的，很乐意为您解答。

驼人集团的总部位于 **河南省新乡市长垣市**。

更详细的地址和信息如下：

### 核心信息
*   **所在地**：河南省新乡市长垣市
*   **详细地址**：河南省长垣市驼人产业新城（或 长垣市孟岗镇工业区）

### 补充信息
1.  **城市背景**：长垣市是中国著名的“医疗器械之乡”和“卫生材料生产基地”，驼人集团是当地乃至全国医疗器械行业的龙头企业之一。
2.  **产业规模**：驼人集团已经发展成为一个大型企业集团，其总部所在的“驼人产业新城”是一个集生产、研发、交易、教育、医疗等多种功能于一体的现代化产业园区。
3.  **主要业务**：集团主要生产麻醉、疼痛、护理、检测、血液净化等领域的高科技医疗器械产品。

### 如何前往？
*   **公共交通**：
    *   可以乘坐高铁至 **滑浚站**（位于滑县与浚县之间，距离长垣市区约50公里），然后换乘出租车或公交前往。
    *   或乘坐高铁至 **新乡东站**，再换乘长途汽车或出租车前往长垣（距离约70公里）。
*   **自驾**：导航软件直接搜索“**驼人集团产业新城**”或“**河南驼人医疗器械集团有限公司**”即可。公司位于长垣市区的东北部，交通便利。

如果您需要联系他们或进行商务访问，建议提前通过其官方网站（[
www.tuoren.com](http://www.tuoren.com)）查找具体的联系方式和接待部门。

希望这些信息能对您有所帮助！
`;
  console.log('mockAnswer', mockAnswer);
  const changeTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    themeClass.value =
      themeClass.value === 'light-background' ? 'dark-background' : 'light-background';
  };

  const themeChange = () => {
    if (themeService) {
      theme.value = themeService.currentTheme.id === 'infinity-theme' ? 'light' : 'dark';
    }
  };

  const toggleThink = (msg) => {
    msg.isThinkShrink = !msg.isThinkShrink;
    btnIcon.value = !msg.isThinkShrink ? 'icon-chevron-up-2' : 'icon-chevron-down-2';
  };

  const generateAnswer = () => {
    if (isLoading.value) {
      isLoading.value = false;
      clearInterval(interval);
    } else {
      isLoading.value = true;
      messages.value = [
        {
          from: 'ai-model',
          avatarConfig: { ...aiModelAvatar },
          content: '',
          loading: false,
        },
      ];
      thinkBtnText.value = '思考中...';
      let currentIndex = 0;
      let totalTime = 0;
      interval = setInterval(() => {
        if (currentIndex < mockAnswer.length) {
          messages.value[messages.value.length - 1].content = mockAnswer.slice(0, currentIndex);
          console.log(messages.value[messages.value.length - 1].content);
          currentIndex += 10;
          totalTime += 100;
          if (
            messages.value[messages.value.length - 1].content.indexOf('</think>') > -1 &&
            thinkBtnText.value === '思考中...'
          ) {
            thinkBtnText.value = `已深度思考 (用时${totalTime / 1000}秒)`;
          }
        } else {
          isLoading.value = false;
          clearInterval(interval);
          messages.value[messages.value.length - 1].loading = false;
        }
      }, 100);
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

    messages.value.push({
      from: 'ai-model',
      avatarConfig: { ...aiModelAvatar },
      content: mockAnswer,
    });
  });
</script>

<style lang="scss" scoped>
  .btn-container {
    display: flex;
    justify-content: end;
    margin-bottom: 12px;
  }
</style>

<style lang="scss" scoped>
  .think-toggle-btn {
    display: flex;
    align-items: center;
    width: fit-content;
    margin-bottom: 12px;
    padding: 7px 10px;
    border-radius: 10px;
    background-color: rgb(149 227 247);
    cursor: pointer;
    gap: 8px;

    &:hover {
      background-color: rgb(149 227 247);
    }
  }

  .think-block-expand .mc-think-block {
    display: block;
  }

  .think-block-shrink .mc-think-block {
    display: none;
  }
</style>
