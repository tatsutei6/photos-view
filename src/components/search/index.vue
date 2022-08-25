<template>
  <div ref='containerDivRef' class='search-container group'>
    <div>
      <input
          class='search-input'
          type='text'
          v-model='inputVal'
          placeholder='検索'
          ref='inputRef'
          @focus='onFocus'
          @blur='onBlur'
          @keydown.enter='onSearchClick'
      />
      <SvgIcon
          v-show='inputVal'
          name='input-delete'
          class='search-delete'
          @click='onClearClick'
      ></SvgIcon>
      <div class='search-divide-line'></div>
      <SvgIcon class='search-btn' name='search' @click='onSearchClick'></SvgIcon>
    </div>
    <transition name='dropdown'>
      <div
          class='max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 absolute z-20 left-0 top-[56px] p-2 rounded hover:shadow-3xl border border-zinc-200 dark:border-zinc-600 duration-200 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent'
          v-show='isFocus'
      >
        <div>
          <SearchHint :search-text='inputVal' @hintClick='onHintClick' />
          <SearchHistory @historyClick='onHistoryClick' />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
// 更新イベント
const EMIT_UPDATE_MODEL_VALUE = 'update:modelValue'
// 検索イベント
const EMIT_SEARCH = 'search'
// 入力欄をクリアするイベント
const EMIT_CLEAR = 'clear'
// 入力イベント
const EMIT_INPUT = 'input'
// 焦点を取得するイベント
const EMIT_FOCUS = 'focus'
// 焦点を失うイベント
const EMIT_BLUR = 'blur'
export default {
  name: 'Search'
}
</script>
<script setup>
import SvgIcon from '@/components/svg-icon/index.vue'
import { useVModel, onClickOutside } from '@vueuse/core'
import { ref, watch } from 'vue'
import SearchHint from '@/components/search-hint/index.vue'
import SearchHistory from '@/components/search-history/index.vue'
import store from '@/store'

// 親コンポーネントへ送るイベントを定義する
const emits = defineEmits([
  EMIT_UPDATE_MODEL_VALUE,
  EMIT_CLEAR,
  EMIT_INPUT,
  EMIT_FOCUS,
  EMIT_BLUR,
  EMIT_SEARCH
])

// 入力された値
const inputVal = ref('')
// input elementのレファレンス
const inputRef=ref(null)
// フォーカスがあるか
const isFocus = ref(false)

// container divのレファレンス
const containerDivRef = ref(null)
/**
 * 入力欄をクリアする
 */
const onClearClick = () => {
  inputVal.value = ''
  inputRef.value.focus()
  emits(EMIT_CLEAR, '')
}

/**
 * 検索イベントを実行する
 */
const onSearchClick = () => {
  // 保存历史记录
  if (inputVal.value) {
    store.commit('search/addHistory', inputVal.value)
  }
  store.commit('app/changeSearchText', inputVal.value)
  isFocus.value = false
  emits(EMIT_SEARCH, inputVal.value.trim())
}

/**
 * 焦点を取得するイベントを実行する
 */
const onFocus = () => {
  isFocus.value = true
  emits(EMIT_FOCUS)
}

/**
 * 焦点を失うイベントを実行する
 */
const onBlur = () => {
  emits(EMIT_BLUR)
}

/**
 * 焦点を失うイベントを実行する
 */
onClickOutside(containerDivRef, () => {
  isFocus.value = false
})

/**
 * inputValの変更を監視する
 */
watch(inputVal, (val) => {
  emits(EMIT_INPUT, val)
})

/**
 * ヒントをクリックする
 */
const onHintClick = (item) => {
  if (!item || !item.title) {
    return
  }
  // 入力欄の値をクリックされたitemのタイトルにする
  inputVal.value = item.title
  // vuexにあるhistoryの値を更新する
  store.commit('search/addHistory', item.title)
  // vuexにあるsearchTextの値を更新する
  store.commit('app/changeSearchText', item.title)
  // 焦点を失う
  isFocus.value = false
}
/**
 * 検索履歴をクリックする
 */
const onHistoryClick = (item) => {
  if (!item) {
    return
  }
  // 入力欄の値をクリックされたitemのタイトルにする
  inputVal.value = item
  // vuexにあるsearchTextの値を更新する
  store.commit('app/changeSearchText', item)
  // 焦点を失う
  isFocus.value = false
}

</script>

<style lang='scss' scoped>
.dropdown-enter-active {
  transition: all 0.5s;
}

.dropdown-leave-active {
  transition: all 0.5s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  transform: translateY(40px);
  opacity: 0;
}

.search-container {
  @apply w-full relative p-0.5
  rounded-xl border-white
  duration-500 hover:bg-zinc-300/40;
}

.search-input {
  @apply block w-full h-[44px] pl-4 text-sm outline-0
  bg-zinc-100 dark:bg-zinc-800 caret-zinc-400
  rounded-xl text-zinc-900 dark:text-zinc-200
  tracking-wide font-semibold border border-zinc-300 dark:border-zinc-700
  duration-500 group-hover:bg-white dark:group-hover:bg-zinc-900
  group-hover:border-zinc-300 dark:group-hover:border-zinc-700;
}

.search-divide-line {
  @apply absolute opacity-0 h-1.5 w-[1px]
  translate-y-[-50%] top-[50%] right-[62px]
  duration-500 bg-zinc-200 group-hover:opacity-100;
}

.search-delete {
  @apply h-1.5 w-1.5 absolute
  translate-y-[-50%] top-[50%] right-8
  duration-500 cursor-pointer;
}

.search-btn {
  @apply absolute opacity-0 h-1.5 w-1.5
  translate-y-[-50%] top-[50%] right-3
  duration-500 cursor-pointer group-hover:opacity-100;
}
</style>
