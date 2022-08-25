import { ALL_CATEGORY_ITEM } from '@/utils/constants'

export default {
  namespaced: true,
  state: () => ({
    // 当前选中的分类
    currentCategory: ALL_CATEGORY_ITEM,
    currentCategoryIndex: 0,
    // 搜索的文本
    searchText: '',
    // 路由跳转类型
    routerType: 'none'
  }),
  mutations: {
    /**
     * 切换选中分类
     */
    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory
    },
    changeCurrentCategoryIndex(state, newCategoryIndex) {
      state.currentCategoryIndex = newCategoryIndex
    },
    /**
     * 修改 searchText
     */
    changeSearchText(state, newSearchText) {
      state.searchText = newSearchText
    }
  }
}
