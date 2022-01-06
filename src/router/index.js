import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '环球旅递'
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/Home')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "login" */ '../views/Order')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import(/* webpackChunkName: "login" */ '../views/My')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || {x: 0, y: 0}
  }
})

export default router
