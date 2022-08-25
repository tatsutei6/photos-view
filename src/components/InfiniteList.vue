<template>
  <div>
    <!-- 内容 -->
    <slot />
    <div ref="targetRef" class="h-6 py-4">
      <!-- 写真をロードするlogo-->
      <SvgIcon
        v-show="loading && !finished"
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"
        color="#A1A1AA"
      ></SvgIcon>
      <!-- 全ての写真をロードした -->
      <p v-if="finished" class="text-center text-base text-zinc-400">全ての写真をロードしました</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfiniteList'
}
</script>
<script setup>
import { onUnmounted, ref, watch } from 'vue'
import { useIntersectionObserver, useVModel } from '@vueuse/core'
import { useStore } from 'vuex'
import SvgIcon from '@/components/SvgIcon.vue'

const props = defineProps({
  // 写真をロード中か
  modelValue: {
    type: Boolean,
    required: true
  },
  // 全ての写真をロードしたか
  finished: {
    type: Boolean,
    default: false
  }
})
// vuex store
const store = useStore()
// 親コンポーネントへ送るイベントを定義する
const emits = defineEmits(['onLoad', 'update:modelValue'])

// 写真ロード状態
const loading = useVModel(props)

// ターゲットとなる要素
const targetRef = ref(null)
// ターゲット要素は底にあるか
const targetIsIntersecting = ref(false)

//　targetIsIntersectingを親コンポーネントに公開する
defineExpose({
  targetIsIntersecting
})

/**
 * ターゲット要素は底にあるか監視する
 */
useIntersectionObserver(targetRef, ([{ isIntersecting }], observerElement) => {
  // ターゲット要素は底にあるかを更新する
  targetIsIntersecting.value = isIntersecting
  // emitLoadを実行する
  emitLoad()
})

/**
 * emitLoad
 */
const emitLoad = () => {
  // ターゲット要素は底にある、且つロード状態はfalse、且つ、全ての写真のロード完成状態はfalse
  if (targetIsIntersecting.value && !loading.value && !props.finished) {
    // ロード状態はtrueにする
    loading.value = true
    // onLoadイベントを親コンポーネントへ送る
    emits('onLoad')
  }
}

/**
 * ロード状態を監視する、写真をロードしたが，ターゲット要素はまだ底にあるのを解決する
 * 例えば、写真を５枚ロードしたが、画面にまだ空きがあって、ターゲット要素はまだ底にある
 * ロード状態を監視して，emitLoadを実行する
 */
let timeout
watch(loading, () => {
  // setTimeoutを配置するのはレンダーとuseIntersectionObserverを再実行するのを待つためだ
  timeout = setTimeout(() => {
    emitLoad()
  }, 500)
})

/**
 * タイマーをクリアする
 */
onUnmounted(() => {
  if (timeout) {
    clearTimeout(timeout)
  }
})
</script>

<style scoped></style>
