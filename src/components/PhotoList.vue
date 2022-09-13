<template>
  <!-- 列表处理 -->
  <InfiniteList v-model='loading' :finished='finished' @onLoad='getPhotos' ref='photoListRef'>
    <Waterfall
        v-model='loading'
        :data='photos'
        keyProp='id'
        :columns='isMobileDevice() ? 2 : 4'
        :preload='true'
        class='w-full px-1'
    >
      <template v-slot='{ item, width }'>
        <!--  widthはpreloadの場合、photoの元サイズとPhotoItemのサイズの比例を計算するため -->
        <!--  比例で、PhotoItemのheightを計算する -->
        <!--  height = (width / photoWidth) * photoHeight  -->
        <PhotoItem :data='item' :width='width' />
      </template>
    </Waterfall>
  </InfiniteList>
</template>
<script>
export default {
  name: 'PhotoList'
}
</script>
<script setup>
import { Dao } from '@/dao/Dao'
import { onUnmounted, ref, watch } from 'vue'
import Waterfall from '@/components/Waterfall.vue'
import PhotoItem from '@/components/PhotoItem.vue'
import { isMobileDevice } from '@/utils'
import InfiniteList from '@/components/InfiniteList.vue'
import { PHOTO_TOTAL } from '@/utils/db'
import { useStore } from 'vuex'

// データの読み込み中か
const loading = ref(false)
// 全てのデータを読み込んだか
const finished = ref(false)
// 写真データ
const photos = ref([])
// InfiniteList elementのレファレンス
const photoListRef = ref(null)
// データ検索のバラメータ
let queryParam = { page: 0, categoryId: 0, title: '', count: 8 }
// vuex store
const store = useStore()
// 写真データのトータル
let total = PHOTO_TOTAL

/**
 * 写真データをDBから取得する
 */
let timeout
const getPhotos = () => {
  // 全ての写真をロードした場合
  if (finished.value) {
    // ロード状態をfalseにする
    loading.value = false
    return
  }
  //　ロードした写真の数は写真データのトータルに等しい、またはより大きい場合
  if (photos.value.length >= total) {
    // 完成状態をtrueにする
    finished.value = true
    // ロード状態をfalseにする
    loading.value = false
    return
  }

  // queryParam.pageの初期値は０
  queryParam.page = queryParam.page + 1
  Dao.getInstance()
      .getPhotos(queryParam)
      .then((value) => {
        setTimeout(() => {
          photos.value = [...photos.value, ...value.data]
          total = value.total
        }, 1000)
      }).catch((error) => {
    console.log(error)
  })
}

/**
 * データ検索のバラメータと写真データをリセットする
 */
const resetQueryParamAndPhotos = (_queryParam) => {
  queryParam = { ...queryParam, ..._queryParam }
  finished.value = false
  loading.value = false
  photos.value = []
}

/**
 * vuexにあるcurrentCategoryの変更を監視する
 */
watch(
    () => store.getters.currentCategory,
    (val) => {
      // データ検索のバラメータと写真データをリセットする
      resetQueryParamAndPhotos({
        page: 0,
        // バラメータのタイトルを検索欄で入力した値にする
        title: store.getters.searchText,
        // バラメータのカテゴリをvuexにあるcurrentCategoryにする
        categoryId: val.id
      })
      if (photoListRef.value.targetIsIntersecting) {
        loading.value = true
        getPhotos()
      }
    }
)

/**
 * vuexにあるsearchTextの変更を監視する
 */
watch(
    () => store.getters.searchText,
    (val) => {
      // データ検索のバラメータと写真データをリセットする
      resetQueryParamAndPhotos({
        page: 0,
        // バラメータのタイトルを検索欄で入力した値にする
        title: val,
        // カテゴリを「全部」にする
        categoryId: 0
      })
      if (photoListRef.value.targetIsIntersecting) {
        loading.value = true
        getPhotos()
      }
    }
)

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
