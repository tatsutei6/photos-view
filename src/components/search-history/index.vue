<template>
  <div class='history-container'>
    <span>検索履歴</span>
    <SvgIcon
        name='delete'
        class='history-delete-all-btn'
        fillClass='fill-zinc-400'
        @click='onDeleteAllClick'
    ></SvgIcon>
  </div>

  <div class='flex flex-wrap'>
    <div
        v-for='(item, index) in store.getters.histories'
        :key='item'
        class='history-item'
        @click='onItemClick(item)'
    >
      <span>{{ item }}</span>
      <SvgIcon
          name='input-delete'
          class='history-delete-btn'
          @click.stop='onDeleteClick(index)'
      ></SvgIcon>
    </div>
  </div>
</template>

<script>
// 検索履歴をクリックするイベント
const EMITS_HISTORY_CLICK = 'historyClick'

export default {
  name: 'SearchHistory'
}
</script>

<script setup>
import { useStore } from 'vuex'
import SvgIcon from '@/components/svg-icon/index.vue'
import { ConfirmModal } from '@/components/confirm-modal/confirm-modal.js'
import { MessageBox } from '@/components/message-box/message-box'
// 親コンポーネントへ送るイベントを定義する
const emits = defineEmits([EMITS_HISTORY_CLICK])
// vuex store
const store = useStore()
/**
 * 全ての検索履歴を削除する
 */
const onDeleteAllClick = () => {
  ConfirmModal('履歴削除', '全ての履歴を削除しますか').then(() => {
    store.commit('search/deleteAllHistories')
  }).catch(() => {
  })
}

/**
 * 検索履歴を一つ削除する
 */
const onDeleteClick = (index) => {
  store.commit('search/deleteHistory', index)
}

/**
 * 検索履歴をクリックする
 */
const onItemClick = (item) => {
  emits(EMITS_HISTORY_CLICK, item)
}
</script>

<style lang='scss' scoped>
.history-container {
  @apply flex items-center text-xs mb-1 text-zinc-400;
}

.history-item {
  @apply mr-2 mb-1.5 flex items-center cursor-pointer
  bg-zinc-100 px-1.5 py-0.5 text-zinc-900
  text-sm font-bold rounded-sm
  duration-300 hover:bg-zinc-200;
}

.history-delete-all-btn {
  @apply w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer rounded-sm
  duration-300 hover:bg-zinc-100;
}

.history-delete-btn {
  @apply w-2.5 h-2.5 p-0.5 ml-1 rounded-sm
  duration-300 hover:bg-zinc-100;
}
</style>