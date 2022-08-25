import { Dao } from '@/dao/Dao'

export default {
  // 独立作用域
  namespaced: true,
  state: () => ({
    // navigationBar 展示的数据源
    categories: []
  }),
  mutations: {
    /**
     * 为 categories 赋值
     */
    setCategories(state, categories) {
      state.categories = [...categories]
    }
  },
  actions: {
    /**
     * 获取 category 数据，并自动保存到 vuex 中
     */
    async useCategoryData(context) {
      const dao = Dao.getInstance()
      const categories  = await dao.getAllCategories()
      context.commit('setCategories', categories)
    }
  }
}
