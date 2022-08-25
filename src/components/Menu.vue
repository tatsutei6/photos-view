<template>
  <div class="menu-container">
    <h2 class="menu-item-bold">全てのカテゴリー</h2>
    <ul class="overflow-y-scroll">
      <li
        v-for="(item, index) in store.getters.categories"
        :key="item.id"
        class="menu-item"
        @click="$emit('onItemClick', item, index)"
      >
        {{ item.jp_name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Menu'
}
</script>
<script setup>
import { useStore } from 'vuex'

defineProps({
  categories: {
    required: true,
    type: Array
  }
})

// 親コンポーネントへ送るイベントを定義する
defineEmits(['onItemClick'])
// vuexのstore
const store = useStore()
</script>

<style lang="scss" scoped>
.menu-container {
  @apply py-2 h-[80vh] flex flex-col;
}
.menu-item-bold {
  @apply text-lg text-zinc-900 dark:text-zinc-200 font-bold mb-2 px-1;
}
.menu-item {
  @apply text-sm text-zinc-900 dark:text-zinc-300 px-1 py-1.5
  duration-100 active:bg-zinc-100 active:dark:bg-zinc-900;
}
</style>
