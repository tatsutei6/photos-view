<template>
  <div>
    <!-- teleport -->
    <teleport to='body'>
      <!-- マクス -->
      <transition name='fade'>
        <!-- マクスをクリックして、popupを閉じる（isOpenをfalseにする） -->
        <div
            v-if='isOpen'
            class='w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0'
            @click='isOpen = false'
        ></div>
      </transition>
      <!-- 内容 -->
      <transition name='popup-down-up'>
        <div
            v-if='isOpen'
            v-bind='$attrs'
            class='w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0'>
          <slot />
        </div>
      </transition>
    </teleport>
  </div>
</template>
<script>
export default {
  name: 'Popup'
}
</script>
<script setup>
import { useScrollLock } from '@vueuse/core'
import { useVModel } from '@vueuse/core'
import { watch } from 'vue'

const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  }
})
// 親コンポーネントへ送るイベントを定義する
defineEmits(['update:modelValue'])
// useVModelを利用して、 isOpenというリアクティブデータを取得する
// isOpenに変更があれば，自動的にupdate:modelValueというイベントを発火する
const isOpen = useVModel(props)

// スクロールロック
const isLocked = useScrollLock(document.body)

/**
 * isOpenの変化を監視する
 */
watch(isOpen, (val) => {
      isLocked.value = val
    },
    // watch は通常監視を始めて、データが変わった直後にコールバックを実行するが
    // immediateにtrueを付与した watch は監視を始めた直後に一回コールバックを実行する
    {
      immediate: true
    }
)

</script>

<style lang='scss' scoped>
.fade-enter-active {
  transition: all 0.3s;
}

.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popup-down-up-enter-active {
  transition: all 0.3s;
}

.popup-down-up-leave-active {
  transition: all 0.3s;
}

.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
