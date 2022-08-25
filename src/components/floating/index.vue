<template>
  <div class='floating-container'>
    <!-- ガイド -->
    <div
        class='floating-guide guide-start group'
        @click='onGuideClick'
    >
      <SvgIcon
          name='guide'
          class='w-2 h-2'
          fillClass='fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main'
      ></SvgIcon>
    </div>
    <!-- DB初期化 -->
    <Popover class='flex items-center guide-setting absolute' position='top-left'>
      <template #reference>
        <div
            class='floating-setting-popover group'>
          <SvgIcon
              name='setting'
              class='w-2 h-2'
              fillClass='fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main'
          ></SvgIcon>
        </div>
      </template>

      <div class='w-[140px] overflow-hidden'>
        <div
            class='floating-db-init'
            @click='onClickInitDB'
        >
          <SvgIcon
              name='warn'
              class='w-1.5 h-1.5 mr-1'
              fillClass='fill-zinc-900 dark:fill-zinc-300'
          ></SvgIcon>
          <span class='floating-db-init-text'>DBの初期化</span>
        </div>
      </div>
    </Popover>
  </div>

</template>
<script>
export default {
  // フローティングウィンドウ
  name: 'Floating'
}
</script>
<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'

import SvgIcon from '@/components/svg-icon/index.vue'
import Popover from '@/components/popover/index.vue'
import { initDB } from '@/utils/db'
import { MessageBox } from '@/components/message-box/message-box'
import { ConfirmModal } from '@/components/confirm-modal/confirm-modal'
import { onMounted } from 'vue'
import steps from '@/components/floating/steps'

/**
 * 引导页处理
 */
let driver = null
onMounted(() => {
  driver = new Driver({
    // マスクをクリックしても、ガイドを閉じない
    allowClose: false,
    closeBtnText: '閉じる',
    nextBtnText: '次へ',
    prevBtnText: '前へ'
  })
})

/**
 * 开始引导
 */
const onGuideClick = () => {
  driver.defineSteps(steps)
  driver.start()
}

const onClickInitDB = () => {
  ConfirmModal('DB初期化', 'DBを初期化しますか').then(() => {
    initDB()
    MessageBox('success', 'DB初期されました')
  }).catch(() => {
    MessageBox('success', 'キャンセルしました')
  })
}

</script>

<style lang='scss' scoped>
.floating-container {
  @apply fixed bottom-10 right-2;
}

.floating-guide {
  @apply w-4 h-4 mb-1 bg-white dark:bg-zinc-900
  border dark:border-0 border-zinc-200 rounded-full
  flex justify-center items-center cursor-pointer
  duration-200 hover:shadow-lg;
}

.floating-setting-popover {
  @apply w-4 h-4 bg-white dark:bg-zinc-900
  border dark:border-0 border-zinc-200 rounded-full
  flex justify-center items-center cursor-pointer
  duration-200 hover:shadow-lg;
}


.floating-db-init {
  @apply flex items-center p-1 cursor-pointer
  rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800;
}

.floating-db-init-text {
  @apply text-zinc-800 dark:text-zinc-300 text-sm;
}

.driver-fix-stacking {
  position: fixed;
  z-index: 100004 !important;
}
</style>