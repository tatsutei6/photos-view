<template>
  <div class='mobile-nav-container'>
    <ul id='nav-ul' class='mobile-category-bar' ref='navUlRef'>
      <!-- ハンバガーボタン -->
      <li class='mobile-hamburger-btn' @click='isOpenPopup = !isOpenPopup'>
        <SvgIcon class='w-1.5 h-1.5' name='hamburger'></SvgIcon>
      </li>
      <!-- ハイライトスライド(選択ハイライト) -->
      <li
          class='mobile-category-slider'
          :style='sliderStyle'
      ></li>
      <!-- category item -->
      <li
          v-for='(item, index) in store.getters.categories'
          class='mobile-category-item'
          :ref='setItemRef'
          :class="{ 'text-zinc-100 ': store.getters.currentCategoryIndex === index }"
          @click='onItemClick(item, index)'
      >
        {{ item.jp_name }}
      </li>
    </ul>
    <!-- category popup menu-->
    <Popup v-model='isOpenPopup'>
      <Menu :categories='$props.categories' @onItemClick='onItemClick'></Menu>
    </Popup>
  </div>
</template>
<script>
export default {
  name: 'MobileNavigation'
}
</script>
<script setup>
import Menu from '@/components/menu/index.vue'
import Popup from '@/components/popup/index.vue'
import SvgIcon from '@/components/svg-icon/index.vue'
import { onBeforeUpdate, ref, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import { useStore } from 'vuex'

defineProps({
  categories: {
    type: Array,
    required: true
  }
})
// popup menuを表示するか
let isOpenPopup = ref(false)
// ul elementのレファレンスの取得，sliderのoffsetを計算する
const navUlRef = ref(null)
// navUlスクロールのx座標を取得する
const { x } = useScroll(navUlRef)
// ハイライトスライドスタイル
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52.1px'
})

// vuexのstore
const store = useStore()

/**
 * li elementのクリックイベント
 */
const onItemClick = (item, index) => {
  // popup menuを閉じる
  isOpenPopup.value = false
  // クリックされたitemをvuexに送る
  store.commit('app/changeCurrentCategory', item)
  // クリックされたitemのindexをvuexに送る
  store.commit('app/changeCurrentCategoryIndex', index)
}
// 全てのli elementのレファレンス
let itemRefs = []

/**
 * 全てのli elementを取得する
 * Domに変更さえあれば、実行する
 */
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}

/**
 * vuexにあるcurrentCategoryIndexを監視する
 */
watch(
    () => store.getters.currentCategoryIndex,
    (val) => {
      // currentCategoryIndexを取得する
      val = store.getters.currentCategoryIndex.valueOf()
      // クリックされたelementの left、width
      const { left, width } = itemRefs[val].getBoundingClientRect()
      // 調整値
      const adjustment = 10
      // ハイライトスライドのx座標のオフセット
      const offsetX = x.value + left - adjustment
      // sliderStyleを更新する
      sliderStyle.value = {
        transform: `translateX(${offsetX + 'px'})`,
        width: width + 'px'
      }

      // クリックされたelementが見えるように、navUlスクロールのx座標を調整する
      if (left + width > document.body.clientWidth) {
        const adjustment = 45
        navUlRef.value.scrollLeft =
            navUlRef.value.scrollLeft + (left + width - document.body.clientWidth) + adjustment
      }
      // クリックされたelementが見えるように、navUlスクロールのx座標を調整する
      if (left < 0) {
        navUlRef.value.scrollLeft = 0
      }
    }
)

/**
 * beforeUpdate:リアクティブデータに変更を行った後、DOMをレンダーする前に実行する
 */
onBeforeUpdate(() => {
  // 「:ref='setItemRef'」はDOMをレンダーする度に、実行するため、
  // itemRefsを空にする
  itemRefs = []
})
</script>

<style lang='scss' scoped>
.mobile-nav-container {
  @apply bg-white dark:bg-zinc-900 duration-500 sticky top-0 left-0 z-10;
}

.mobile-category-bar {
  @apply relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden;
}

.mobile-hamburger-btn {
  @apply z-20 fixed top-0 right-[-1px] h-4 px-1
  flex items-center
  bg-white dark:bg-zinc-900 shadow-l-white dark:shadow-l-zinc;
}

.mobile-category-slider {
  @apply absolute h-[22px] bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200;
}

.mobile-category-item {
  @apply shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4
}

</style>
