<template>
  <McLayout class="container">
    <McHeader :title="'TUORen'" :logoImg="'src/assets/images/tuoren-logo.png'"  :logoClickable="true" @logoClicked="onLogoClicked">
      <template #operationArea>
        <div class="operations">
          <i class="icon-helping"></i>
        </div>
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
      ></McIntroduction>
      <McPrompt
        :list="promptData"
        direction="horizontal"
        class="intro-prompt"
        @itemClick="onSubmit($event.label)"
      ></McPrompt>
         <McPrompt
        :list="promptData1"
        direction="horizontal"
        class="intro-prompt"
        @itemClick="onSubmit($event.label)"
      ></McPrompt>
    </McLayoutContent>
    <McLayoutContent class="content-container" v-else>
      <template v-for="(msg, idx) in messages" :key="idx">
        <McBubble
          v-if="msg.from === 'user'"
          :content="msg.content"
          :align="'right'"
          :avatarConfig="{ imgSrc: 'https://matechat.gitcode.com/png/demo/userAvatar.svg' }"
        >
        </McBubble>
        <McBubble
          v-else
          :content="msg.content"
          :avatarConfig="{ imgSrc: 'https://matechat.gitcode.com/logo.svg' }"
        >
        </McBubble>
      </template>
    </McLayoutContent>
    <div class="shortcut" style="display: flex; align-items: center; gap: 8px">
      <McPrompt
        v-if="!startPage"
        :list="simplePrompt"
        :direction="'horizontal'"
        style="flex: 1"
        @itemClick="onSubmit($event.label)"
      ></McPrompt>
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
              <span v-for="(item, index) in inputFootIcons" :key="index">
                <i :class="item.icon"></i>
                {{ item.text }}
              </span>
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
  </McLayout>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Button } from 'vue-devui/button';
  import 'vue-devui/button/style.css';
import OpenAI from 'openai';
  const description = [

    '如果您有任何问题，请随时向我提问。',

  ];
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

  const messages = ref<any[]>([]);
const client = ref<OpenAI>();

client.value = new OpenAI({
  apiKey: 'sk-4bf67fef6d4b463ebf8599a14cd25cbd', // 模型APIKey
  baseURL: 'https://api.deepseek.com/v1', // 模型API地址
  dangerouslyAllowBrowser: true,
});
  const newConversation = () => {
    startPage.value = true;
    messages.value = [];
  };

const fetchData = async (ques) => {
  if (!client.value) {
  console.error('OpenAI client is not initialized.');
  return;
}
console.log('OpenAI client is initialized.',client.value);
  messages.value.push({
    from: 'model',
    content: '',
    avatarConfig: { name: 'model' },
    id: '',
    loading: true,
  });
  const completion = await client.value!.chat.completions.create({
    model: 'deepseek-reasoner', // 根据deepseek模型列表进行替换
    messages: [{ role: 'user', content: ques }],
    stream: true, // 为 true 则开启接口的流式返回
  });
  messages.value[messages.value.length - 1].loading = false;
  console.log('completion', completion);
  for await (const chunk of completion) {
    console.log(chunk);
    const content = chunk.choices[0]?.delta?.content || '';
    const chatId = chunk.id;
    messages.value[messages.value.length - 1].content += content;
    messages.value[messages.value.length - 1].id = chatId;
  }
};
const onSubmit = (evt) => {
  inputValue.value = '';
  startPage.value = false;
  // 用户发送消息
  messages.value.push({
    from: 'user',
    content: evt,
    avatarConfig: { name: 'user' },
  });

  console.log('用户发送的消息为：', evt);

  fetchData(evt);
};
  // const onSubmit = (evt) => {
  //   inputValue.value = '';
  //   startPage.value = false;
  //   // 用户发送消息
  //   messages.value.push({
  //     from: 'user',
  //     content: evt,
  //   });
  //   setTimeout(() => {
  //     // 模型返回消息
  //     messages.value.push({
  //       from: 'model',
  //       content: evt,
  //     });
  //   }, 200);
  // };
  const onLogoClicked = () => {
    window.open('https://www.tuoren.com', '_blank');
  };
</script>

<style lang="scss" scoped>

  .container {
    width: 1000px;
    height: calc(100vh - 82px);
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 16px;
    background: #fff;
    gap: 8px;
  } 
  
  :deep(.mc-introduction-logo-container img) {
    width: 30px;
    height: 30px;
  }


    


  .content-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: auto;
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

    :deep(.mc-header-logo){
width: 80px;
height: 30px;
  }
</style>
