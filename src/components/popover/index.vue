<template>
  <div class='relative' @mouseleave='onMouseleave' @mouseenter='onMouseenter'>
    <div ref='referenceRef'>
      <!-- 名付きスロット -->
      <slot name='reference' />
    </div>
    <!-- 表示アニメーション -->
    <transition name='pop'>
      <div
          v-show='visible'
          ref='contentDivRef'
          class='absolute p-1 z-20 bg-white dark:bg-zinc-900 border rounded-md dark:border-zinc-700'
          :style='contentStyle'
      >
        <!-- 匿名スロット -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
// setTimeoutのタイミング
const DELAY_TIME = 100

const PROP_TOP_LEFT = 'top-left'
const PROP_TOP_RIGHT = 'top-right'
const PROP_BOTTOM_LEFT = 'bottom-left'
const PROP_BOTTOM_RIGHT = 'bottom-right'

// 表示位置 Enum
const positionEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]

export default {
  name: 'Popover'
}
</script>

<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue'

const props = defineProps({
  position: {
    type: String,
    default: 'bottom-left',
    validator(val) {
      const result = positionEnum.includes(val)
      if (!result) {
        throw new Error(
            `position は ${positionEnum.join('、')} のどちらかでなければ、なりません`
        )
      }
      return result
    }
  }
})

// popoverを表示するか
const visible = ref(false)

/**
 * マウスポインターが入ったときの処理
 */
let timeout = null
const onMouseenter = () => {
  visible.value = true
  // タイマーをクリアする
  if (timeout) {
    clearTimeout(timeout)
  }
}
/**
 * マウスポインタが離れた時の処理
 */
const onMouseleave = () => {
  // setTimeoutを配置して、popoverを閉じる
  timeout = setTimeout(() => {
    visible.value = false
  }, DELAY_TIME)
}


const referenceRef = ref(null)
const contentDivRef = ref(null)

/**
 * DOMのサイズを取得する
 */
const useElementSize = (target) => {
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}

/**
 * popoverの表示位置
 */
const contentStyle = ref({
  top: '0',
  left: '0'
})

/**
 * popoverを閉じる
 */
const hidePopover = () => {
  visible.value = false
}
// 親コンポーネントへhidePopoverを公開する
defineExpose({
  hidePopover
})

/**
 * visibleを監視して，popoverの表示位置を計算する
 */
watch(visible, (val) => {
  if (!val) {
    return
  }
  // DOM 更新サイクルの後に、popoverの表示位置の設定を実行する
  nextTick(() => {
    switch (props.position) {
        // 左上
      case PROP_TOP_LEFT:
        contentStyle.value.top = '0'
        contentStyle.value.left = -useElementSize(contentDivRef.value).width + 'px'
        break
        // 右上
      case PROP_TOP_RIGHT:
        contentStyle.value.top = '0'
        contentStyle.value.left = useElementSize(referenceRef.value).width + 'px'
        break
        // 左下
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top = useElementSize(referenceRef.value).height + 'px'
        const adjustment = 25
        contentStyle.value.left =
            -useElementSize(contentDivRef.value).width + adjustment + 'px'
        break
        // 右下
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top =
            useElementSize(referenceRef.value).height + 'px'
        contentStyle.value.left =
            useElementSize(referenceRef.value).width + 'px'
        break
    }
  })
})

/**
 * タイマーをクリアする
 */
onUnmounted(()=>{
  if(timeout){
    clearTimeout(timeout)
  }
})
</script>

<style lang='scss' scoped>
.pop-enter-active {
  transition: opacity 0.3s, transform 0.3s;
}

.pop-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.pop-enter-from,
.pop-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
