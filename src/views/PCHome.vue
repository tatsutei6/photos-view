<template>
  <div class='h-screen'>
    <!-- 需要在 tailwind 中定义 h-header、h-mobile-home 高度 -->
    <!--  header  -->
    <Header class='h-header'></Header>
    <!--  main  -->
    <div class='h-main'>
      <div
          class='pc-home-main'>
        <PCNavigation></PCNavigation>
        <div class='pc-home-main-content'>
          <PhotoList />
        </div>
      </div>
    </div>
    <Floating/>
  </div>
</template>
<script>
export default {
  name: 'PCHome'
}
</script>
<script setup>
import Header from '@/components/Header.vue'
import Floating from '@/components/floating/index.vue'
import PCNavigation from '@/components/PCNavigation.vue'
import PhotoList from '@/components/PhotoList.vue'
import { useStore } from 'vuex'

const store = useStore()
// 触发 category 数据获取动作
store.dispatch('category/useCategoryData')
</script>

<style lang='scss' scoped>
.pc-home-main {
  @apply h-full overflow-auto bg-white dark:bg-zinc-800 duration-500
  scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200
  xl:dark:scrollbar-thumb-zinc-400 scrollbar-track-transparent;
}

.pc-home-main-content {
  @apply max-w-screen-xl mx-auto relative m-1 xl:mt-4;
}

</style>