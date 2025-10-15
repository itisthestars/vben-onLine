<template>
  <div>
    <div class="space-y-4 bg-yellow-600 border border-indigo-500/40 w-max">
      <div>
        <button class="first:text-blue-500 last:text-white" v-for="item in 8" :key="item">333</button>
      </div>

      <button
        class="first:rounded-full last:text-white w-full bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-pink-300"
      >
        Save changes
      </button>
      <button class="btn-primary">123</button>
    </div>
    <!-- 媒体查询 -->
    <div class="space-x-2 md:bg-yellow-400 lg:bg-green-400 lg:max-xl:flex xl:bg-purple-400">
      <div class="btn-primary">111</div>
      <div>111</div>
      <div>111</div>
      <div>111</div>
      <div>111</div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped >

</style>
