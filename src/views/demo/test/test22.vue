<template>
  <Row style="height: 98%; margin-top: 10px">
    <Col :span="2"></Col>
    <Col style="height: 100%" :span="5"
      ><leftList :currentMsg="messages" @selectMsg="getMsg"></leftList
    ></Col>
    <Col style="height: 100%" :span="17">
      <McLayout class="container">
        <McHeader
          :title="'TUORen'"
          :logoImg="'src/assets/images/tuoren-logo.png'"
          :logoClickable="true"
          @logo-clicked="onLogoClicked"
        >
          <template #operationArea>
            <div class="operations"> DS可用余额{{ balance }}<i class="icon-helping"></i> </div>
          </template>
        </McHeader>
        <McLayoutContent
          v-if="startPage"
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
          "
        >
          <McIntroduction
            :logoImg="'src/assets/images/tuoren-icon.png'"
            :title="'TR'"
            :subTitle="'欢迎'"
            :description="description"
          />
          <McPrompt
            :list="promptData"
            direction="horizontal"
            class="intro-prompt"
            @item-click="onSubmit($event.label)"
          />
          <McPrompt
            :list="promptData1"
            direction="horizontal"
            class="intro-prompt"
            @item-click="onSubmit($event.label)"
          />
        </McLayoutContent>
        <!-- 对话渲染区域 -->
        <McLayoutContent ref="talkContent" class="content-container" v-else>
          <template v-for="(msg, idx) in messages" :key="idx">
            <McBubble
              v-if="msg.role === 'user'"
              :content="msg.content"
              :align="'right'"
              :avatarPosition="'top'"
              :avatarConfig="{
                imgSrc: 'https://matechat.gitcode.com/png/demo/userAvatar.svg',
                displayName: 'My',
              }"
            />
            <!-- model回复气泡区域 -->
            <McBubble
              v-else
              :content="msg.content"
              :avatarConfig="{ imgSrc: 'https://matechat.gitcode.com/logo.svg', displayName: 'TR' }"
              :loading="msg.loading"
              :avatarPosition="'top'"
              :class="isThingk ? 'think-block-shrink' : 'think-block-expand'"
            >
              <template #default>
                <div
                  v-show="msg.model=='deepseek-reasoner'"
                  class="think-toggle-btn"
                  @click="toggleThink()"
                >
                  <!-- <i class="icon-point"></i> -->
                  <Icon icon="noto:thinking-face" size="30" color="#00a2ff"></Icon>
                  <span>{{ thinkBtnText }}</span>
                  <i :class="btnIcon"></i>
                </div>
                <McMarkdownCard :enableThink="true" :content="msg.content" :theme="theme" />
              </template>
              <template #loadingTpl>
                <div
                  >我正在思考中<Icon icon="line-md:loading-alt-loop" size="32" color="#00a2ff"
                /></div>
              </template>
            </McBubble>
          </template>
        </McLayoutContent>
        <div class="shortcut" style="display: flex; align-items: center; gap: 8px">
          <McPrompt
            v-if="!startPage"
            :list="simplePrompt"
            :direction="'horizontal'"
            style="flex: 1"
            @item-click="onSubmit($event.label)"
          />
          <Button
            style="margin-left: auto"
            icon="add"
            shape="circle"
            title="新建对话"
            size="md"
            @click="newConversation"
          />
        </div>
        <McLayoutSender>
          <McInput
            :value="inputValue"
            :maxLength="2000"
            @change="(e) => (inputValue = e)"
            @submit="onSubmit"
          >
            <template #extra>
              <div class="input-foot-wrapper">
                <div class="input-foot-left">
                  <!-- <span v-for="(item, index) in inputFootIcons" :key="index">
                    <i :class="item.icon"></i>
                    {{ item.text }}
                  </span> -->
                  <!-- 模型选择 -->
                   选择大模型:
                  <Select
                    ref="select"
                    v-model:value="selectModel"
                    placement="topRight"
                    style="width: 150px"
                    :options="modelOptions"
                    @change="modelChange"
                  ></Select>
                  <span class="input-foot-dividing-line"></span>
                  <span class="input-foot-maxlength">{{ inputValue.length }}/2000</span>
                </div>
                <div class="input-foot-right">
                  <Button
                    icon="op-clearup"
                    shape="round"
                    :disabled="!inputValue"
                    @click="inputValue = ''"
                    ><span class="demo-button-content">清空输入</span></Button
                  >
                </div>
              </div>
            </template>
          </McInput>
        </McLayoutSender>
      </McLayout></Col
    >
  </Row>
</template>

<script setup lang="ts">
  import { Row, Col, message, Select } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';
  import leftList from './components/leftList.vue';
  import { ref, nextTick, onMounted } from 'vue';
  import { Button } from 'vue-devui/button';
  import 'vue-devui/button/style.css';
  import OpenAI from 'openai';
  import axios from 'axios';

  const theme = ref('light');
  const talkContent = ref<any>(null);
  const thinkBtnText = ref('深度思考内容');
  const btnIcon = ref('icon-chevron-up-2');
  const isThingk = ref(false);
  //选择使用的模型 默认ds思考的那个模型
  const selectModel = ref('deepseek-reasoner');
  const modelOptions = [
    {
      value: 'deepseek-chat',
      label: 'DeepSeek-chat',
    },
    { value: 'deepseek-reasoner', label: 'DeepSeek-reasoner' },
  ];
  const toggleThink = () => {
    isThingk.value = !isThingk.value;
    console.log('isThingk', isThingk.value);
    // thinkBtnText.value = isThingk.value ? '已深度思考 (用时16秒)' : '深度思考';
    btnIcon.value = isThingk.value ? 'icon-chevron-down-2' : 'icon-chevron-up-2';
  };
  const modelChange = (value) => {
    selectModel.value = value;
    console.log(`selected ${value}`);
  };

  const contentTest = ref(`
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
  // const isLoading = ref(true);
  const description = ['如果您有任何问题，请随时向我提问。'];
  const promptData = [
    {
      value: 'quickSort',
      label: '驼人集团在哪里？',
      iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
      // desc: '使用 js 实现一个快速排序',
    },
    {
      value: 'helpMd',
      label: '你可以帮我做些什么？',
      iconConfig: { name: 'icon-star', color: 'rgb(255, 215, 0)' },
      // desc: '了解当前大模型可以帮你做的事',
    },
  ];
  const promptData1 = [
    {
      value: 'quickSort',
      label: '医疗器械都有哪些？',
      iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
      // desc: '使用 js 实现一个快速排序',
    },
    {
      value: 'helpMd',
      label: '医疗器械注册流程是怎样的？',
      iconConfig: { name: 'icon-star', color: 'rgb(255, 215, 0)' },
      // desc: '了解当前大模型可以帮你做的事',
    },
    {
      value: 'helpMd',
      label: '中国医疗耗材之都是哪里？',
      iconConfig: { name: 'icon-star', color: 'rgb(255, 215, 0)' },
      // desc: '了解当前大模型可以帮你做的事',
    },
  ];
  const simplePrompt = [
    {
      value: 'quickSort',
      iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
      label: '帮我写一个快速排序',
    },
    {
      value: 'helpMd',
      iconConfig: { name: 'icon-star', color: 'rgb(255, 215, 0)' },
      label: '你可以帮我做些什么？',
    },
  ];
  const startPage = ref(true);
  const inputValue = ref('');
  const inputFootIcons = [
    { icon: 'icon-at', text: '智能体' },
    { icon: 'icon-standard', text: '词库' },
    { icon: 'icon-add', text: '附件' },
  ];
  const allMsgs = ref<any[][]>([
    [
      {
        role: 'user',
        content: '你好！很高兴见到你！',
        avatarConfig: { name: 'user' },
      },
      {
        role: 'assistant',
        content:
          '好的，驼人集团的总部位于中国河南省**新乡市长垣市**。\n\n这是一个非常具体的位置，以下是详细信息：\n\n**1. 总部详细地址：**\n* **地址：** 河南省新乡市长垣市驼人健康产业园区\n* **邮编：** 453400\n\n**2. 关于所在地——长垣市：**\n* 长垣市是河南省的一个县级市，由新乡市代管。\n* 它被称为“中国医疗耗材之都”，医疗器械产业是其支柱产业。驼人集团正是从这里发展起来，并成为该领域的龙头企业。\n\n**3. 主要生产基地和园区：**\n* 驼人集团的核心生产和运营都集中在**长垣市**。\n* 集团建设了规模庞大的“**驼人健康产业园区**”，集生产、研发、交易、物流、医疗、教育等功能于一体。\n\n**4. 其他地点：**\n* 除了长垣总部，驼人集团在全国主要省市（如北京、上海、广州等）以及海外（如美国、印度、德国等）设有**子公司、办事处或研发中心**，用于市场销售、技术支持和研发合作。\n* 但其**主要制造基地和集团总部**始终在河南长垣。\n\n**总结一下：**\n\n如果您需要联系集团总部、参观工厂或进行商务合作，您的目的地就是：\n\n**河南省新乡市长垣市**。\n\n**如何前往：**\n* **最近的机场：** 新郑国际机场（CGO，位于郑州），然后可乘坐高铁或汽车前往长垣。\n* **高铁：** 可乘坐高铁至“**长垣站**”，出站后打车即可到达驼人集团园区。\n* **自驾：** 导航至“驼人健康产业园区”即可。\n\n如果您需要具体的联系方式，可以访问他们的官方网站（通常搜索“驼人集团官网”即可找到）获取最新的电话和邮箱。',
        avatarConfig: { name: 'model' },
        id: '0568ab1e-9985-4f34-9b8b-1c71de1f2270',
        loading: false,
      },
    ],
    [
      {
        role: 'user',
        content: '你好！很高兴见到你！',
        avatarConfig: { name: 'user' },
      },
      {
        role: 'assistant',
        content:
          '好的，驼人集团的总部位于中国河南省**新乡市长垣市**。\n\n这是一个非常具体的位置，以下是详细信息：\n\n**1. 总部详细地址：**\n* **地址：** 河南省新乡市长垣市驼人健康产业园区\n* **邮编：** 453400\n\n**2. 关于所在地——长垣市：**\n* 长垣市是河南省的一个县级市，由新乡市代管。\n* 它被称为“中国医疗耗材之都”，医疗器械产业是其支柱产业。驼人集团正是从这里发展起来，并成为该领域的龙头企业。\n\n**3. 主要生产基地和园区：**\n* 驼人集团的核心生产和运营都集中在**长垣市**。\n* 集团建设了规模庞大的“**驼人健康产业园区**”，集生产、研发、交易、物流、医疗、教育等功能于一体。\n\n**4. 其他地点：**\n* 除了长垣总部，驼人集团在全国主要省市（如北京、上海、广州等）以及海外（如美国、印度、德国等）设有**子公司、办事处或研发中心**，用于市场销售、技术支持和研发合作。\n* 但其**主要制造基地和集团总部**始终在河南长垣。\n\n**总结一下：**\n\n如果您需要联系集团总部、参观工厂或进行商务合作，您的目的地就是：\n\n**河南省新乡市长垣市**。\n\n**如何前往：**\n* **最近的机场：** 新郑国际机场（CGO，位于郑州），然后可乘坐高铁或汽车前往长垣。\n* **高铁：** 可乘坐高铁至“**长垣站**”，出站后打车即可到达驼人集团园区。\n* **自驾：** 导航至“驼人健康产业园区”即可。\n\n如果您需要具体的联系方式，可以访问他们的官方网站（通常搜索“驼人集团官网”即可找到）获取最新的电话和邮箱。',
        avatarConfig: { name: 'model' },
        id: '0568ab1e-9985-4f34-9b8b-1c71de1f2270',
        loading: false,
      },
    ],
  ]);
  const messages = ref<any[]>([
    // {
    //   role: 'user',
    //   content: '你好！很高兴见到你！',
    //   avatarConfig: { name: 'user' },
    // },
    // {
    //   role: 'assistant',
    //   content: '好的，驼人集团的总部位于中国河南省**新乡市长垣市**。\n\n这是一个非常具体的位置，以下是详细信息：\n\n**1. 总部详细地址：**\n* **地址：** 河南省新乡市长垣市驼人健康产业园区\n* **邮编：** 453400\n\n**2. 关于所在地——长垣市：**\n* 长垣市是河南省的一个县级市，由新乡市代管。\n* 它被称为“中国医疗耗材之都”，医疗器械产业是其支柱产业。驼人集团正是从这里发展起来，并成为该领域的龙头企业。\n\n**3. 主要生产基地和园区：**\n* 驼人集团的核心生产和运营都集中在**长垣市**。\n* 集团建设了规模庞大的“**驼人健康产业园区**”，集生产、研发、交易、物流、医疗、教育等功能于一体。\n\n**4. 其他地点：**\n* 除了长垣总部，驼人集团在全国主要省市（如北京、上海、广州等）以及海外（如美国、印度、德国等）设有**子公司、办事处或研发中心**，用于市场销售、技术支持和研发合作。\n* 但其**主要制造基地和集团总部**始终在河南长垣。\n\n**总结一下：**\n\n如果您需要联系集团总部、参观工厂或进行商务合作，您的目的地就是：\n\n**河南省新乡市长垣市**。\n\n**如何前往：**\n* **最近的机场：** 新郑国际机场（CGO，位于郑州），然后可乘坐高铁或汽车前往长垣。\n* **高铁：** 可乘坐高铁至“**长垣站**”，出站后打车即可到达驼人集团园区。\n* **自驾：** 导航至“驼人健康产业园区”即可。\n\n如果您需要具体的联系方式，可以访问他们的官方网站（通常搜索“驼人集团官网”即可找到）获取最新的电话和邮箱。',
    //   avatarConfig: { name: 'model' },
    //   id: '0568ab1e-9985-4f34-9b8b-1c71de1f2270',
    //   loading: false,
    // }
  ]);
  // messages.value = [
  //   {
  //     role: 'assistant',
  //     content: '你好！很高兴见到你！',
  //     // avatarConfig: { name: 'model' },
  //     id: '',
  //     loading: false,
  //   },
  // ];
  const client = ref<OpenAI>();

  client.value = new OpenAI({
    apiKey: 'sk-4bf67fef6d4b463ebf8599a14cd25cbd', // 模型APIKey
    baseURL: 'https://api.deepseek.com/v1', // 模型API地址
    dangerouslyAllowBrowser: true,
  });
  const newConversation = () => {
    // 将之前的对话存储起来
    // console.log(...messages.value);
    // allMsgs.value.push([...messages.value]);
    message.success('开始新对话！');
    startPage.value = true;
    messages.value = [];
  };
  const scrollToBottom = async (smooth = true) => {
    await nextTick();
    const element = talkContent.value?.$el;

    if (!element) return; // 元素不存在时直接返回

    const scrollHeight = element.scrollHeight;

    if (smooth) {
      element.scrollTo({
        top: scrollHeight,
        behavior: 'smooth',
      });
    } else {
      element.scrollTo(0, scrollHeight);
    }
  };
  let totalReasoningContent = '';
  const fetchData = async (ques) => {
    isThingk.value = false;
    totalReasoningContent = '';
    if (!client.value) {
      console.error('OpenAI client is not initialized.');
      return;
    }
    console.log('OpenAI client is initialized.', client.value);

    await scrollToBottom(true);
    // 拼接之前的对话，实现多轮上下文对话
    const newMessages = ref<any>([]);
    if (messages.value.length <= 2) {
      newMessages.value = [{ role: messages.value[0].role, content: messages.value[0].content }];
    } else {
      newMessages.value = messages.value.slice(0, messages.value.length - 1).map((msg) => {
        return { role: msg.role, content: msg.content };
      });
    }
    // const newMessages = [...messages.value, [{ role: 'user', content: ques }]];
    // console.log('发送给模型的消息：', newMessages);
    const completion = await client.value!.chat.completions.create({
      // model: 'deepseek-reasoner',
      model: selectModel.value,
      messages: newMessages.value,
      stream: true, // 为 true 则开启接口的流式返回
    });

    for await (const chunk of completion) {
      // console.log(chunk);
      const chatId = chunk.id;
      const reponseModel = chunk.model;
      messages.value[messages.value.length - 1].id = chatId;
      messages.value[messages.value.length - 1].model = reponseModel;
      // console.log(chunk.choices[0]?.delta?.content);
      if (
        (chunk.choices[0]?.delta?.content !== null &&
          chunk.choices[0]?.delta?.content !== undefined) ||
        ((chunk.choices[0]?.delta as any)?.reasoning_content !== '' &&
          (chunk.choices[0]?.delta as any)?.reasoning_content !== null)
      ) {
        messages.value[messages.value.length - 1].loading = false;
      }
      if (
        (chunk.choices[0]?.delta as any)?.reasoning_content !== '' &&
        (chunk.choices[0]?.delta as any)?.reasoning_content !== null &&
        chunk.choices[0]?.delta?.content === null
      ) {
        // 这是思考内容reasoning_content，需要放在think标签里
        let reasoningContent = (chunk.choices[0]?.delta as any)?.reasoning_content;
        totalReasoningContent += reasoningContent;
        messages.value[messages.value.length - 1].content = `<think>${totalReasoningContent}
  </think>

  `;
      } else if (
        chunk.choices[0]?.delta?.content !== null &&
        chunk.choices[0]?.delta?.content !== ''
      ) {
        // 这是正常的回答内容content
        const content = chunk.choices[0]?.delta?.content;
        messages.value[messages.value.length - 1].content += content;
      }
      console.log('messages.value', messages.value[messages.value.length - 1].content);
      await scrollToBottom(false);
    }
    await scrollToBottom(false);
    getBalance();
  };
  const onSubmit = async (evt) => {
    inputValue.value = '';
    startPage.value = false;
    // 用户发送消息
    messages.value.push({
      role: 'user',
      content: evt,
      avatarConfig: { name: 'user' },
    });
    messages.value.push({
      model:'',
      role: 'assistant',
      content: '',
      avatarConfig: { name: 'model' },
      id: null,
      loading: true,
    });
    console.log('用户发送的消息为：', evt);

    await scrollToBottom(true);
    fetchData(evt);
    // scrollToBottom()
  };
  // const onSubmit = (evt) => {
  //   inputValue.value = '';
  //   startPage.value = false;
  //   // 用户发送消息
  //   messages.value.push({
  //     role: 'user',
  //     content: evt,
  //   });
  //   setTimeout(() => {
  //     // 模型返回消息
  //     messages.value.push({
  //       role: 'model',
  //       content: evt,
  //     });
  //   }, 200);
  // };
  const onLogoClicked = () => {
    window.open('https://www.tuoren.com', '_blank');
  };
  const getMsg = (msg, start = false) => {
    console.log('选中消息', msg);
    messages.value = msg;
    startPage.value = start;
  };

  // 查询余额

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.deepseek.com/user/balance',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer sk-4bf67fef6d4b463ebf8599a14cd25cbd',
    },
  };
  // 可用余额
  const balance = ref(0);
  const getBalance = async () => {
    try {
      const response = await axios.request(config);
      console.log(response.data.balance_infos[0].total_balance);
      balance.value = response.data.balance_infos[0].total_balance;
    } catch (error) {
      console.log(error);
    }
  };
  onMounted(() => {
    getBalance();
  });
</script>

<style lang="scss" scoped>
  .container {
    width: 80%;
    height: 100%;
    // height: 100%;
    // margin: 10px auto;
    padding: 30px;
    // border: 1px solid #ddd;
    border-radius: 0 8px 8px 0;
    background: #fff;
    gap: 8px;
    box-shadow: 5px 2px 6px 4px rgb(0 0 0 / 20%);
  }

  :deep(.mc-introduction-logo-container img) {
    width: 30px;
    height: 30px;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    overflow: scroll;
    overflow-x: hidden;
  }

  .input-foot-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    margin-right: 8px;

    .input-foot-left {
      display: flex;
      align-items: center;
      gap: 8px;

      span {
        color: #252b3a;
        font-size: 14px;
        line-height: 18px;
        cursor: pointer;
      }

      .input-foot-dividing-line {
        width: 1px;
        height: 14px;
        background-color: #d7d8da;
      }

      .input-foot-maxlength {
        color: #71757f;
        font-size: 14px;
      }
    }

    .input-foot-right {
      .demo-button-content {
        font-size: 14px;
      }

      & > *:not(:first-child) {
        margin-left: 8px;
      }
    }
  }

  :deep(.mc-header-logo) {
    width: 80px;
    height: 30px;
  }

  .think-toggle-btn {
    display: flex;
    align-items: center;
    width: fit-content;
    margin-bottom: 12px;
    padding: 7px 10px;
    border-radius: 10px;
    background-color: rgb(226 226 226);
    cursor: pointer;
    gap: 8px;

    &:hover {
      background-color: rgb(149 227 247);
    }
  }

  :deep(.think-block-expand .mc-think-block) {
    display: block;
  }

  :deep(.think-block-shrink .mc-think-block) {
    display: none;
  }
</style>
