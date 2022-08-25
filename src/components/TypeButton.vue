<template>
  <button class='text-sm text-center duration-150 flex justify-center items-center'
          :class="[
            typeEnum[type],
            sizeEnum[sizeKey].button,
            { 'active:scale-105': animation }
          ]"
          @click.stop='onBtnClick'
  >
    <!-- loadingを表示 -->
    <SvgIcon
        v-if='loading'
        name='loading'
        class='w-2 h-2 animate-spin mr-1'
    ></SvgIcon>
    <!-- icon ボタン -->
    <SvgIcon
        v-if='icon'
        :name='icon'
        class='m-auto'
        :class='sizeEnum[sizeKey].icon'
        :color='iconColor'
        :fillClass='iconClass'
    ></SvgIcon>
    <!-- 文字付きのボタン -->
    <slot v-else />
  </button>
</template>

<script>
// ボタンのスタイルタイプ
const typeEnum = {
  primary:
      'text-white bg-zinc-800 dark:bg-zinc-900 hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700',
  main: 'text-white bg-main dark:bg-zinc-900 hover:bg-hover-main dark:hover:bg-zinc-700 active:bg-main dark:active:bg-zinc-700',
  info: 'text-zinc-800 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-700'
}

// ボタンのサイズ
const sizeEnum = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-2 h-2'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  },
  large: {
    button: 'w-10 h-4 text-base',
    icon: ''
  },
  'icon-large': {
    button: 'w-5 h-5',
    icon: 'w-3 h-3'
  },
}

// ボタンをクリックするイベント
const EMITS_CLICK = 'click'

export default {
  name: 'TypeButton',
  data() {
    return { typeEnum, sizeEnum }
  }
}
</script>
<script setup>
import { computed } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

const props = defineProps({
  icon: String,
  iconColor: String,
  iconClass: String,
  type: {
    type: String,
    default: 'main',
    validator(val) {
      // 全てのボタンのスタイルタイプ
      const keys = Object.keys(typeEnum)
      // 指定された値はスタイルタイプに存在するか
      const result = keys.includes(val)
      // スタイルタイプに存在しなければ、エラー
      if (!result) {
        throw new Error(`指定の type は ${keys.join('、')}の中の一つ出なければならない`)
      }
      return result
    }
  },
  // 大小风格
  size: {
    type: String,
    default: 'default',
    validator(val) {
      // 全てのボタンのスタイルタイプ（icon-xxxを除く）
      const keys = Object.keys(sizeEnum).filter((key) => !key.includes('icon'))
      // 指定された値はボタンのスタイルタイプの中にあるか
      const result = keys.includes(val)
      // ボタンサイズの中になければ、エラー
      if (!result) {
        throw new Error(`指定の値は ${keys.join('、')} の中の一つ出なければならない`)
      }
      return result
    }
  },
  // アニメーション有効か
  animation: {
    type: Boolean,
    default: true
  },
  // ロード状態
  loading: {
    type: Boolean,
    default: false
  }
})

// sizeKeyを処理する
const sizeKey = computed(() => {
  // props.iconはnull、undefinedでなければ、sizeKeyに「icon-」を付け加える
  return props.icon ? 'icon-' + props.size : props.size
})
// 親コンポーネントへ送るイベントを定義する
const emits = defineEmits([EMITS_CLICK])

/**
 * ボタンをクリックする
 */
const onBtnClick = () => {
  // ロード状態をチェックする
  if (props.loading) {
    return
  }
  emits(EMITS_CLICK)
}
</script>

<style scoped>

</style>