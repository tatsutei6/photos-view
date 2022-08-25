<template>
  <div class='photo-item-container'>
    <div class='relative w-full rounded group'>
      <img ref='imgRef' class='photo-item-img' :src='data.url' :alt='data.title' />
      <!-- マスク -->
      <div class='photo-item-mask'>
        <TypeButton
            class='absolute bottom-1.5 left-1.5 rounded-md bg-zinc-300'
            type='info'
            icon='download'
            iconClass='fill-zinc-900 dark:fill-zinc-200'
            @click='onDownload'
        />
        <TypeButton
            class='absolute bottom-1.5 right-1.5 rounded-md bg-zinc-300'
            type='info'
            icon='full'
            iconClass='fill-zinc-900 dark:fill-zinc-200'
            @click='onImgFullScreen'
        />
      </div>
    </div>
    <p class='photo-item-title line-clamp-2'>
      {{ data.title }}
    </p>
    <div class='photo-item-author'>
      <img class='photo-item-author-avatar' :src='data.avatar' :alt='data.avatar' />
      <span class='photo-item-author-name'>{{ data.author }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PhotoItem'
}
</script>
<script setup>
import TypeButton from '@/components/type-button/index.vue'
import { saveAs } from 'file-saver'
import { MessageBox } from '@/components/message-box/message-box'
import { useFullscreen } from '@vueuse/core'
import { onUnmounted, ref } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  width: {
    type: Number,
    default: 0
  }
})
const imgRef = ref(null)

/**
 * 全画面表示のメゾットを作成する
 */
const { enter: onImgFullScreen } = useFullscreen(imgRef)

/**
 * ダウンロードボタンをクリックするイベント
 */
let timeout
const onDownload = () => {
  // MessageBoxを作成する
  MessageBox('success', 'ダウンロード始まります')
  // UXをよくするために、setTimeoutを配置する
  timeout = setTimeout(() => {
    /**
     * 写真をダウンロードする
     * パラメーター：
     * 1. ダウンロードする写真のurl
     * 2. ファイル名
     */
    saveAs(props.data.url, `${props.data.title}-${props.data.author}`)
  }, 500)
}

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
.photo-item-container {
  @apply bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1;
}

.photo-item-img {
  @apply w-full rounded bg-transparent;
}

.photo-item-mask {
  @apply absolute hidden opacity-0 w-full h-full
  bg-zinc-900/50 top-0 left-0 rounded
  duration-300 group-hover:opacity-100 xl:block;
}

.photo-item-title {
  @apply text-sm mt-1 px-1 font-bold text-zinc-900 dark:text-zinc-300;
}

.photo-item-author {
  @apply flex items-center mt-1 mb-0.5 px-1;
}

.photo-item-author-avatar {
  @apply h-2 w-2 rounded-full;
}

.photo-item-author-name {
  @apply text-sm text-zinc-500 ml-1;
}
</style>
