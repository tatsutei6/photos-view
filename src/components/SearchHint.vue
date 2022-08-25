<template>
  <div
      v-for='(item) in hintData'
      :key='item.id'
      class='hint-data'
      @click='onItemClick(item)'
      v-html='highlightText(item.title)'
  ></div>
</template>

<script>
// ヒントデータをクリックするイベント
const EMITS_HINT_CLICK = 'hintClick'

export default {
  name: 'SearchHint'
}

</script>

<script setup>

import { Dao } from '@/dao/Dao'
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/core'

const props = defineProps({
  searchText: {
    type: String,
    required: true
  }
})

// ヒントデータ
const hintData = ref([])
/**
 * ヒントデータを取得する
 */
const getHintData = async () => {
  // searchTextはnull、または空文字列の場合
  if (props.searchText == null || props.searchText.length === 0) {
    // hintDataは空でない場合
    if (hintData.value.length > 0) {
      // hintDataを空にする
      hintData.value = []
    }
    return
  }
  // 全ての写真データを取得する
  const photos = await Dao.getInstance().getAllPhotos()
  hintData.value = []
  for (const ele of photos) {
    // 写真のタイトルにsearchTextを含む場合
    if (ele.title.indexOf(props.searchText) !== -1) {
      // hintDataに追加する
      const result = hintData.value.filter((item) => {
        return item.id === ele.id
      })
      if (result.length === 0) {
        hintData.value.push(ele)
      }
    }
  }
}

/**
 * vuexにあるsearchTextの変更を監視する
 */
watchDebounced(() => props.searchText, () => {
  getHintData()
}, {
  immediate: true,
  // 600ミリ遅延して、実行する
  debounce: 600
})

/**
 * 検索キーワードをハイライトする
 */
const highlightText = (text) => {
  // ハイライトタグ
  const highlightStr = `<span class='text-blue-400 dark:text-zinc-200'>${props.searchText}</span>`
  // ハイライトされた検索キーワードで置き換える
  return text.replace(props.searchText, highlightStr)
}

// 親コンポーネントへ送るイベントを定義する
const emits = defineEmits([EMITS_HINT_CLICK])

/**
 * ヒントデータをクリックする
 */
const onItemClick = (item) => {
  emits(EMITS_HINT_CLICK, item)
}

</script>

<style lang='scss' scoped>
.hint-data {
  @apply py-1 pl-1 text-base font-bold text-zinc-500
  rounded cursor-pointer duration-300
  hover:bg-zinc-200 dark:hover:bg-zinc-900;
}

</style>