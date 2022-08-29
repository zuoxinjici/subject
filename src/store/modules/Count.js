const plugin = store => {
  console.log(1);
  store.subscribe(({ type }) => {
    console.log(4);
    if (type === 'updateVxcount') console.log(2);
  });
  console.log(3);
}

export default {
  plugins: [plugin],
  state: () => ({
    vxcount: 0,
  }),
  mutations: {
    updateVxcount(state, val) {
      state.vxcount += val;
    },
  }
}