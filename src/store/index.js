import Vue from 'vue'
import Vuex from 'vuex'
import {USER_INFO_KEY} from '@/constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: undefined
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo || undefined
    },
  },
  actions: {
    setUserInfo({commit}, userInfo) {
      commit('SET_USER_INFO', userInfo)
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
    }
  },
  modules: {},
  getters: {
    userInfo: state => state.userInfo
  }
})
