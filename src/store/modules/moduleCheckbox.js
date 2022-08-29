export default {
  state: () => ({
    checkboxs: [],
    vxcount: 0,
  }),
  mutations: {
    updateCheckboxs(state, val) {
      state.checkboxs = val
    }
  }

}