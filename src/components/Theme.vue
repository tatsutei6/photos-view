<template>
  <Popover ref='popoverRef'>
    <template #reference>
      <SvgIcon
          :name='svgIconName'
          class='theme-icon guide-theme'
          fillClass='fill-zinc-900 dark:fill-zinc-300'
      ></SvgIcon>
    </template>

    <div class='w-[140px] overflow-hidden'>
      <div
          class='theme-popover-item'
          v-for='item in themeArr'
          :key='item.id'
          @click='onItemClick(item)'
      >
        <SvgIcon
            :name='item.icon'
            class='w-1.5 h-1.5 mr-1'
            fillClass='fill-zinc-900 dark:fill-zinc-300'
        ></SvgIcon>
        <span class='text-zinc-800 dark:text-zinc-300 text-sm'>{{
            item.name
          }}</span>
      </div>
    </div>
  </Popover>
</template>
<script>
export default {
  name: 'Theme'
}
</script>

<script setup>
import { computed, ref } from 'vue'

import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/utils/constants'
import Popover from '@/components/Popover.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { useStore } from 'vuex'
// popover elementのレファレンス
const popoverRef = ref(null)
// themeデータ
const themeArr = [
  {
    id: '0',
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: 'ライト'
  },
  {
    id: '1',
    type: THEME_DARK,
    icon: 'theme-dark',
    name: 'ダーク'
  },
  {
    id: '2',
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: 'OS Default'
  }
]
// vuex store
const store = useStore()
// themeのicon
const svgIconName = computed(() => {
  // 選択されたThemeのicon
  const findTheme = themeArr.find((theme) => {
    return theme.type === store.getters.themeType
  })
  // 選択されたThemeは存在しなければ、themeArrの先頭の要素のiconを返す
  return findTheme?.icon || themeArr[0].icon
})

/**
 * themeをクリックする
 */
const onItemClick = (item) => {
  popoverRef.value.hidePopover()
  store.commit('theme/changeThemeType', item.type)
}
</script>

<style lang='scss' scoped>
.theme-icon {
  @apply w-4 h-4 p-1
  cursor-pointer rounded-sm duration-200 outline-none
  hover:bg-zinc-100/60 dark:hover:bg-zinc-900;
}

.theme-popover-item {
  @apply flex items-center p-1 cursor-pointer rounded
  hover:bg-zinc-100/60 dark:hover:bg-zinc-800;
}

</style>