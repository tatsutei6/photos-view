<template>
  <div>
    <!-- マスク -->
    <transition name='fade'>
      <div
          v-if='visible'
          @click='close'
          class='w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0'
      ></div>
    </transition>
    <!-- 内容 -->
    <transition name='up'>
      <div
          v-if='visible'
          class='w-[80%] fixed top-1/3 left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-lg border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:w-[35%]'
      >
        <!-- タイトル -->
        <div class='text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2'>
          {{ title }}
        </div>
        <!-- 内容 -->
        <div class='text-base text-zinc-900 dark:text-zinc-200 mb-2'>
          {{ content }}
        </div>
        <!-- ボタン -->
        <div class='flex justify-end'>
          <TypeButton type='info' size='large' class='rounded mr-2' @click='onCancelClick'>
            {{ cancelText }}
          </TypeButton>
          <TypeButton type='primary' class='rounded' @click='onConfirmClick'> {{ confirmText }}
          </TypeButton>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ConfirmModalVue'
}
</script>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import TypeButton from '@/components/TypeButton.vue'

const props = defineProps({
  // タイトル
  title: {
    type: String
  },
  // 内容
  content: {
    type: String,
    required: true
  },
  // キャンセルボタンテキスト
  cancelText: {
    type: String,
    default: '取消'
  },
  // 確定ボタンテキスト
  confirmText: {
    type: String,
    default: '确定'
  },
  // キャンセルボタンイベント
  cancelHandler: {
    type: Function
  },
  // 確定ボタンイベント
  confirmHandler: {
    type: Function
  },
  // ConfirmModalを閉じる時のコールバック
  close: {
    type: Function
  }
})

// ConfirmModalの表示をコントロールする
const visible = ref(false)
/**
 * ConfirmModalを表示する
 */
const show = () => {
  visible.value = true
}
/**
 * マウント直後に、ConfirmModalを表示する
 */
onMounted(() => {
  show()
})

// 閉じるアニメーションの所要時間
const duration = '0.6s'
// 秒
const second = duration.replace('0.', '').replace('s', '')
// ミリ秒
const timeout = parseInt(second) * 100
let timer
/**
 * ConfirmModalを閉じる，アニメーションの所要時間を確保するために、setTimeoutを利用する
 */
const close = () => {
  visible.value = false
  timer = setTimeout(() => {
    if (props.close) {
      props.close()
    }
  }, timeout)
}
/**
 * アンマウントの時、timerをクリアする
 */
onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
/**
 *  キャンセルボタンイベント
 */
const onCancelClick = () => {
  if (props.cancelHandler) {
    props.cancelHandler()
  }
  close()
}

/**
 *  確定ボタンイベント
 */
const onConfirmClick = () => {
  if (props.confirmHandler) {
    props.confirmHandler()
  }
  close()
}
</script>

<style lang='scss' scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all 0.5s;
}

.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
