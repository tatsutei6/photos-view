<template>
  <div class="pc-nav-container">
    <ul
      class='pc-category-bar'
      :class="[collapseState ? 'h-[206px]' : 'h-[56px]']"
    >
      <li class="pc-category-collapse-btn" @click="toggleCollapse">
        <!-- fold unfold svg -->
        <SvgIcon
          :name="collapseState ? 'fold' : 'unfold'"
          class="w-1 h-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></SvgIcon>
      </li>
      <!-- category item -->
      <li
        v-for="(item, index) in store.getters.categories"
        :key="item.id"
        class='pc-category-item'
        :class="{'selected-pc-category-item': store.getters.currentCategoryIndex === index }"
        @click="onItemClick(item, index)"
      >
        {{ item.jp_name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'PCNavigation'
}
</script>
<script setup>
import SvgIcon from '@/components/svg-icon/index.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'
// vuex store
const store = useStore()
// 展開するか
const collapseState = ref(false)

/**
 * 展開状態を変更する
 */
const toggleCollapse = () => {
  collapseState.value = !collapseState.value
}

/**
 * li elementのクリックイベント
 */
const onItemClick = (item, index) => {
  // クリックされたitemをvuexに送る
  store.commit('app/changeCurrentCategory', item)
  // クリックされたitemのindexをvuexに送る
  store.commit('app/changeCurrentCategoryIndex', index)
}
</script>

<style lang="scss" scoped>
.pc-nav-container {
  @apply bg-white dark:bg-zinc-800 duration-500 sticky top-0 left-0 w-full z-10;
}
.pc-category-collapse-btn {
  @apply absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer
  duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900;
}
.pc-category-bar{
  @apply w-[800px] relative flex flex-wrap justify-center
  px-[10px] py-1 text-xs text-zinc-600 duration-300
  overflow-x-auto overflow-hidden mx-auto;
}
.pc-category-item {
  @apply shrink-0 px-1.5 py-0 z-10 duration-200 last:mr-4
  text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300
  hover:bg-zinc-200 dark:hover:bg-zinc-900
  text-base font-bold leading-4 cursor-pointer
  h-4 rounded mr-1 mb-1;
}

.selected-pc-category-item {
  @apply text-zinc-900 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-900;
}
</style>
