/*
 * @Author: zouyifei@myhexin.com
 * @Date: 2022-08-08 10:17:47
 * @LastEditors: zouyifei@myhexin.com
 * @LastEditTime: 2022-08-08 10:24:56
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { setChange, setIncludeComponent, updateCheckboxs } from './mutation'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    canJump: localStorage.getItem('canJump') ? localStorage.getItem('canJump') : 0,
    includeComponent: '',
    checkboxs: [],
    vxcount: 0,
  },
  getters: {
  },
  mutations: {
    setChange,
    setIncludeComponent,
    updateCheckboxs,
    updateVxcount(state, val) {
      state.vxcount += val;
    },
  },
  actions: {
  },
  modules: {
  }
})
