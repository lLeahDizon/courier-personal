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

Vue.config.productionTip = false

Vue.component('Nav', Nav)
Vue.component('Layout', Layout)

if (!['production'].includes(process.env.VUE_APP_ENV) && window.location.hostname !== 'localhost') {
  new VConsole()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
