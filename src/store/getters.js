import { isMobileDevice } from '@/utils'

export default {
  /**
   * navigationBar 数据源
   */
  categories: (state) => state.category.categories,
  /**
   * 当前主题
   */
  themeType: (state) => state.theme.themeType,
  /**
   * category选中项
   */
  currentCategory: (state) => state.app.currentCategory,
  /**
   * category选中项下标
   */
  currentCategoryIndex: (state) => state.app.currentCategoryIndex,
  /**
   * 搜索记录
   */
  histories: (state) => state.search.histories,
  /**
   * 搜索文本
   */
  searchText: (state) => state.app.searchText,
}
