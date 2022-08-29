/*
 * @Author: zouyifei@myhexin.com
 * @Date: 2022-08-08 10:17:47
 * @LastEditors: zouyifei@myhexin.com
 * @LastEditTime: 2022-08-08 10:24:56
 */
import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutation";
import Checkbox from "./modules/moduleCheckbox";
import Count from "./modules/Count";

Vue.use(Vuex);
const plugin = store => {
  console.log('插件注册开始');
  store.subscribe(({ type }) => {
    // console.log('无判断直接调用插件'); 
    if (type === 'updateVxcount') console.log('修改了count');
    if (type === 'updateCheckboxs') console.log('修改了checkbox');
  });
  console.log('插件注册结束');
}

export default new Vuex.Store({
  plugins: [plugin],
  state: {
    canJump: localStorage.getItem("canJump")
      ? localStorage.getItem("canJump")
      : 0,
    includeComponent: "",
  },
  getters: {},
  mutations,
  actions: {},
  modules: {
    checkbox: Checkbox,
    count: Count,
  },
});
