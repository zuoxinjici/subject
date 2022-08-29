// const plugin = store => {
//   console.log(1);
//   store.subscribe(({ type }) => {
//     console.log(4);
//     if (type === 'updateVxcount') console.log(2);
//   });
//   console.log(3);
// }

export default {
  // plugins: [plugin],
  state: () => ({
    vxcount: 0,
  }),
  mutations: {
    updateVxcount(state, val) {
      state.vxcount += val;
    },
  },
  getters: {
    countGetter(state) {
      console.log(`getter: ${state.vxcount}`);
      return state.vxcount;
    },
    countGetterFn: (state) => (multiple) => {
      console.log(`getterFn: ${state.vxcount * multiple}`);
      return state.vxcount * multiple;
    }
  }

}