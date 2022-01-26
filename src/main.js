import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/icons'
import '@/components/vant'
import Nav from '@/components/Nav'
import Layout from '@/components/Layout'
import VConsole from 'vconsole'
import {initWeChatEnv} from '@/utils/weixin'
import {getBrowserType} from '@/utils'
import {HREF_TO_OTHER_PAGE} from '@/constants'

Vue.config.productionTip = false

Vue.component('Nav', Nav)
Vue.component('Layout', Layout)

if (!['production'].includes(process.env.VUE_APP_ENV) && window.location.hostname !== 'localhost') {
  new VConsole()
}

const browserType = getBrowserType()

if (browserType.ios) {
  window.addEventListener('pageshow', function (e) {
    if ((sessionStorage.getItem(HREF_TO_OTHER_PAGE) === HREF_TO_OTHER_PAGE) && e.persisted) {
      sessionStorage.removeItem(HREF_TO_OTHER_PAGE)
      setTimeout(() => store.commit('RESET_VIEW'), 10)
    }
  }, false)
}

window._AMapSecurityConfig = {
  securityJsCode:'70368fbc0dd164853706027aa847f80b',
}

initWeChatEnv()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
