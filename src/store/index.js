/*
 * @Author: zouyifei@myhexin.com
 * @Date: 2022-08-08 10:17:47
 * @LastEditors: zouyifei@myhexin.com
 * @LastEditTime: 2022-08-08 10:24:56
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    canJump: localStorage.getItem('canJump') ? localStorage.getItem('canJump') : 0,
    includeComponent: ''
  },
  getters: {
  },
  mutations: {
    setChange(state,val) {
      state.canJump = val
      if(val == true){
        localStorage.setItem('canJump',1)
      }else {
        localStorage.setItem('canJump',0)
      }
    },
    setIncludeComponent(state,val){
      state.includeComponent = val
    }
  },
  actions: {
  },
  modules: {
  }
})
