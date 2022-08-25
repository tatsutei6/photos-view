export default {
  namespaced: true,
  state: () => ({
    histories: []
  }),
  mutations: {
    /**
     * 1. 新增的历史记录位于头部
     * 2. 不可出现重复的记录
     */
    addHistory(state, newVal) {
      const isFindIndex = state.histories.findIndex(
          (item) => item === newVal
      )
      // 剔除旧数据
      if (isFindIndex !== -1) {
        state.histories.splice(isFindIndex, 1)
      }
      // 新增记录
      state.histories.unshift(newVal)
    },
    /**
     * 删除指定数据
     */
    deleteHistory(state, index) {
      state.histories.splice(index, 1)
    },
    /**
     * 删除所有历史记录
     */
    deleteAllHistories(state) {
      state.histories = []
    }
  }
}
