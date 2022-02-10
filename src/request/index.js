import axios from 'axios'
import RequestError from './RequestError'
import { TIME_OUT } from './config'
import { limitRequest, releaseResponse } from './requestGovern'
import { handleRequest, handleResponse } from './requestFilter'
import {handleLogin} from '@/utils/weixin'

// 在类上定义默认值
axios.defaults.headers['Content-Type'] = 'application/json'
// 接口请求是否绕过指定时间内不可重复请求。开启时，请确认代码的可用性。
axios.defaults.unique = false
axios.defaults.follow = false

// 创建axios实例
const service = axios.create({
  // 本地开使用相对路径，打包使用绝对路径
  baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_ROOT : '/api',
  // 请求超时时间
  timeout: TIME_OUT
})

// request拦截器
service.interceptors.request.use(config => {
  // 如果当前网络有问题，直接报错
  if (!window.navigator.onLine) {
    throw new RequestError('请检查您的网络情况')
  }
  // 阻止频繁请求和重复请求
  limitRequest(config)
  return handleRequest(config)
}, error => {
  throw new RequestError(error)
})

// response拦截器
service.interceptors.response.use(response => {
  // 如果请求返回，对应的requestKey.isResponse设置为true
  releaseResponse(response.config)
  return handleResponse(response)
}, error => {
  // 自定义错误类直接抛出
  if (error instanceof RequestError) {
    throw error
  } else {
    // 如果请求返回，无论错误失败，对应的requestKey.isResponse设置为true
    releaseResponse(error.config)
    // 超时
    if (error.code === 'ECONNABORTED') {
      throw new RequestError('服务端响应超时，请稍后再试')
    }
    if ([400, 401].includes(error.response.status)) {
      return handleLogin()
    }
    // 处理HTTP 错误 如404
    throw new RequestError(error.response.data.message)
  }
})

export default service
