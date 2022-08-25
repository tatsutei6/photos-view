<template>
  <transition name="down" @after-leave="destroy">
    <div
        v-show="visible"
        class="min-w-[320px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
        :class="styles[type].containerClass"
    >
      <SvgIcon
          :name="styles[type].icon"
          :fillClass="styles[type].fillClass"
          class="h-1.5 w-1.5 mr-1.5"
      ></SvgIcon>
      <span class="text-sm" :class="styles[type].textClass">
        {{ content }}
      </span>
    </div>
  </transition>
</template>

<script>
// messagebox のタイプ
const typeEnum = ['success', 'warn', 'error']
export default {
  name: 'MessageBoxVue'
}
</script>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SvgIcon from '@/components/svg-icon/index.vue'
import { CLOSE_DELAY } from '@/utils/constants'

const props = defineProps({
  /**
   * messagebox のタイプ('success', 'warn', 'error')
   */
  type: {
    type: String,
    required: true,
    validator(val) {
      const result = typeEnum.includes(val)
      if (!result) {
        throw new Error(`typeの値は ${typeEnum.join('、')} の中の一つ出なければならない`)
      }
      return result
    }
  },
  /**
   * messageboxの表示内容
   */
  content: {
    type: String,
    required: true
  },
  /**
   * messageboxの表示時間
   */
  duration: {
    type: Number,
    default:CLOSE_DELAY // 3s
  },
  /**
   * 閉じるイベントのcallback
   */
  destroy: {
    type: Function
  }
})

// 様式
const styles = {
  // warn様式
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
        'bg-warn-100 border-warn-200  hover:shadow-lg hover:shadow-warn-100'
  },
  // error様式
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
        'bg-error-100 border-error-200  hover:shadow-lg hover:shadow-error-100'
  },
  // success様式
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
        'bg-success-100 border-success-200  hover:shadow-lg hover:shadow-success-100'
  }
}
// messageboxを表示するか
const visible = ref(false)
/**
 * マウントされた後、messageboxを表示する
 */
let timeout
onMounted(() => {
  visible.value = true

  // 指定された時間の後、messageboxを閉じる
  timeout=setTimeout(() => {
    visible.value = false
  }, props.duration)
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

<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
  transition: all 0.5s;
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>