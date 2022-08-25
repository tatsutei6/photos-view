<template>
  <div
      class='header-container'>
    <div class='flex items-center'>
      <img
          class='header-logo'
          src='/src/assets/icons/vue.svg'
          alt='toHome' />
      <Search class='mr-1 guide-search'/>
      <Theme class='mr-2'/>
    </div>
  </div>
</template>
<script>
export default {
  //　PCページ用のヘッダー
  name: 'Header'
}
</script>
<script setup>
import Search from '@/components/search/index.vue'
import Theme from '@/components/theme/index.vue'
</script>

<style lang='scss' scoped>
.header-container {
  @apply w-full duration-500 bg-white dark:bg-zinc-800
  border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1;
}

.header-logo {
  @apply h-4 cursor-pointer ml-2 mr-2 cursor-default;
}
</style>