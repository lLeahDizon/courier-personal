import Vue from 'vue'
import Vuex from 'vuex'
import {USER_INFO_KEY} from '@/constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: undefined,
    addressInfo: {},
    orderInfo: {}
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo || undefined
    },
    SET_ADDRESS_INFO: (state, addressInfo) => {
      state.addressInfo = addressInfo || undefined
    },
    SET_ORDER_INFO: (state, orderInfo) => {
      state.orderInfo = orderInfo || undefined
    }
  },
  actions: {
    setUserInfo({commit}, userInfo) {
      commit('SET_USER_INFO', userInfo)
      localStorage.removeItem(USER_INFO_KEY)
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
    },
    setAddressInfo({commit}, addressInfo) {
      commit('SET_ADDRESS_INFO', addressInfo)
    },
    setOrderInfo({commit}, orderInfo) {
      commit('SET_ORDER_INFO', orderInfo)
    }
  },
  modules: {},
  getters: {
    userInfo: state => state.userInfo,
    addressInfo: state => state.addressInfo,
    orderInfo: state => state.orderInfo
  }
})
