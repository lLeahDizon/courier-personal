import Vue from 'vue'
import Router from 'vue-router'
import {$error} from '@/utils'

Vue.use(Router)

const routes = [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '环球旅递'
    },
    component: () => import(/* webpackChunkName: "home" */ 'src/views/Home')
  },
  {
    path: '/sender/info',
    name: 'senderInfo',
    meta: {
      title: '发件信息'
    },
    component: () => import(/* webpackChunkName: "sender-info" */ 'src/views/SenderInfo')
  },
  {
    path: '/receipt/info',
    name: 'receiptInfo',
    meta: {
      title: '收件信息'
    },
    component: () => import(/* webpackChunkName: "receipt-info" */ 'src/views/SenderInfo')
  },
  {
    path: '/address/confirm',
    name: 'addressConfirm',
    meta: {
      title: '地址确认'
    },
    component: () => import(/* webpackChunkName: "address-confirm" */ 'src/views/AddressConfirm')
  },
  {
    path: '/certification',
    name: 'certification',
    meta: {
      title: '实名认证'
    },
    component: () => import(/* webpackChunkName: "certification" */ 'src/views/Certification')
  },
  {
    path: '/certification/result',
    name: 'certificationResult',
    meta: {
      title: '认证结果'
    },
    component: () => import(/* webpackChunkName: "certification-result" */ 'src/views/CertificationResult')
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      title: '订单'
    },
    component: () => import(/* webpackChunkName: "order" */ 'src/views/Order')
  },
  {
    path: '/my',
    name: 'my',
    meta: {
      title: '环球旅递'
    },
    component: () => import(/* webpackChunkName: "my" */ 'src/views/My')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '环球旅递'
    },
    component: () => import(/* webpackChunkName: "login" */ 'src/views/Login.vue')
  },
  {
    path: '/order/confirm',
    name: 'orderConfirm',
    meta: {
      title: '确认订单'
    },
    component: () => import(/* webpackChunkName: "order-confirm" */ 'src/views/OrderConfirm')
  },
  {
    path: '/order/detail',
    name: 'orderDetail',
    meta: {
      title: '订单详情'
    },
    component: () => import(/* webpackChunkName: "order-detail" */ 'src/views/OrderDetail')
  },
  {
    path: '/goods/info',
    name: 'goodsInfo',
    meta: {
      title: '物品信息'
    },
    component: () => import(/* webpackChunkName: "goods-info" */ 'src/views/GoodsInfo')
  }
]

const router = new Router({
  mode: 'history',
  // 移动端使用以项目名命名的子目录
  base: '/' + process.env.VUE_APP_BASE_NAME,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || {x: 0, y: 0}
  }
})

router.beforeEach(async (to, from, next) => {
  try {
    if (to.meta && to.meta.title) {
      document.title = to.meta.title
    }
    next()
  } catch (e) {
    $error(e)
  }
})

export default router
