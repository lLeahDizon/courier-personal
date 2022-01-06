// 客户端使用svg按需引入
import Vue from 'vue'
import Icon from '@/components/Icon'

Vue.component('Icon', Icon)

// 批量require所有的svg
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./', false, /\.svg$/)
requireAll(req)
