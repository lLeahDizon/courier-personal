import Vue from 'vue'
import Router from 'vue-router'
import {$error, getBrowserType} from '@/utils'
import {HREF_TO_OTHER_PAGE, PAY_ROUTER_LIST} from '@/constants'

Vue.use(Router)

const filter2PayRouter = (toName, fromName) => {
  if (!PAY_ROUTER_LIST.includes(toName)) {
    return false
  }
  if (!(getBrowserType().iPhone || getBrowserType().iPad)) {
    return false
  }
  return !!fromName
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
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
    // if (!WHITE_LIST.includes(to.name) && !store.getters.userInfo && !JSON.parse(localStorage.getItem(USER_INFO_KEY))) {
    //   next({name: 'login'})
    //   return
    // }
    if (filter2PayRouter(to.name, from.name)) {
      const query = to.query
      let action = 'assign'
      let queryStr = ''
      let queryItemList = []
      if (query && typeof query === 'object') {
        if (query.replace) {
          action = 'replace'
          delete query.replace
        }
        Object.keys(query).forEach(key => {
          queryItemList.push(`${key}=${query[key]}`)
        })
        queryStr = queryItemList.join('&')
      }
      // 兼容ios多文档之间跳转时浏览器后退会访问缓存的问题
      if (action === 'assign') {
        sessionStorage.setItem(HREF_TO_OTHER_PAGE, HREF_TO_OTHER_PAGE)
      }
      window.location[action](`/${process.env.VUE_APP_BASE_NAME}${queryStr ? `${to.path}?${queryStr}` : `${to.path}`}`)
      next(false)
      return
    }
    next()
  } catch (e) {
    $error(e)
  }
})

export default router
