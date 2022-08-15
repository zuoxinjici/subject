/*
 * @Author: zouyifei@myhexin.com
 * @Date: 2022-08-08 10:17:47
 * @LastEditors: zouyifei@myhexin.com
 * @LastEditTime: 2022-08-08 10:25:50
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/practice2',
    name: 'practice2',
    component: () => import('../views/PracticeView.vue'),
    beforeEnter: (to,from,next) => {
      console.log('路由独享守卫')
      next()
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  console.log('全局前置守卫')
  console.log(to)
  console.log(from)
  let canJump = localStorage.getItem('canJump')
  canJump = Number(canJump)
  if(!canJump && to.path !== '/') {
    next('/')
  } else {
    next()
  }
})
router.afterEach((to,from) => {
  console.log('全局后置守卫')
  console.log(to)
  console.log(from)
})

export default router
