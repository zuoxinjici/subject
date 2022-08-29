/*
 * @Author: zouyifei@myhexin.com
 * @Date: 2022-08-08 10:17:47
 * @LastEditors: zouyifei@myhexin.com
 * @LastEditTime: 2022-08-08 10:24:56
 */
import Vue from "vue";
import Vuex from "vuex";
import { setChange, setIncludeComponent } from "./mutation";
import moduleCheckbox from "./modules/moduleCheckbox";
import Count from "./modules/Count";

Vue.use(Vuex);
const plugin = store => {
  console.log(1);
  store.subscribe(({ type }) => {
    console.log(4);
    if (type === 'updateVxcount') console.log(2);
  });
  console.log(3);
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
  mutations: {
    setChange,
    setIncludeComponent,
  },
  actions: {},
  modules: {
    checkbox: moduleCheckbox,
    count: Count,
  },
});
