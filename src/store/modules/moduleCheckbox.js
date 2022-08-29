export default {
  state: () => ({
    checkboxs: [],
    vxcount: 0,
  }),
  mutations: {
    updateCheckboxs(state, val) {
      state.checkboxs = val
    },
    pop(state) {
      if (state.checkboxs.length > 0) {
        state.checkboxs.pop();
      }
    }
  },
  actions: {
    async reset({ state, commit }) {
      // commit('pop');

      /* let timePop = new Promise((resolve) => {
        setTimeout(() => {
          commit('pop');
          resolve('done');
        }, 1000)
      }); */

      while (state.checkboxs.length > 0) {
        await new Promise((resolve) => setTimeout(() => {
          commit('pop');
          resolve('done');
        }, 1000));

        console.log(state.checkboxs);
      }
      // console.log(222);

    }
  }
}