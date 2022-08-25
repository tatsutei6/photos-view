<template>
  <div class='h-screen'>
    <div class='h-main'>
      <div class='h-full overflow-auto bg-white dark:bg-zinc-800
      duration-500 scrollbar-thin scrollbar-thumb-transparent
      xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900
      scrollbar-track-transparent'>
        <MobileNavigation :categories='categories'></MobileNavigation>
        <div class='max-w-screen-xl mx-auto relative m-1.5 xl:mt-4'>
          <PhotoList />
        </div>
      </div>
    </div>
  </div>
  <!--  </div>-->
</template>
<script>
export default {
  name: 'MobileHome'
}
</script>
<script setup>
import MobileNavigation from '@/components/navigation/mobile/index.vue'
import PhotoList from '@/components/photo-list/index.vue'
import { Dao } from '@/dao/Dao'
import { ref } from 'vue'
import { useStore } from 'vuex'

const dao = Dao.getInstance()
let categories = ref([])
dao.getAllCategories().then((value) => {
  categories.value = value
})
const store = useStore()
// 触发 category 数据获取动作
store.dispatch('category/useCategoryData')
</script>

<style scoped></style>
