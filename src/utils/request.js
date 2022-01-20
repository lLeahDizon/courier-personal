import axios from 'axios'

export class RequestError extends Error {
  constructor (data) {
    super()
    this.name = this.constructor.name
    if (typeof data === 'object') {
      this.code = data.code
      this.message = data.message
    } else {
      this.message = data
    }
  }
}
const isProd = process.env.NODE_ENV === 'production'

// 在类上定义默认值
axios.defaults.headers['Content-Type'] = 'application/json'
// 接口请求是否绕过300ms内不可重复请求。开启时，请确认代码的可用性。
axios.defaults.unique = false

// 创建axios实例
const service = axios.create({
  // 本地开使用相对路径，打包使用绝对路径
  baseURL: isProd ? process.env.VUE_APP_API_ROOT : '/api',
  // 请求超时时间
  timeout: 15000
})

// 请求缓存
const requestKey = {}

// 获取请求内容字符串
const generateDataStr = config => {
  const { method, data, params } = config
  let dataStr = ''
  if (method === 'get' && params) {
    dataStr = typeof params !== 'string' ? JSON.stringify(params) : params
  }
  if (method === 'post' && data) {
    dataStr = typeof data !== 'string' ? JSON.stringify(data) : data
  }
  return dataStr
}

/**
 * 对url进行容错
 * @param host 域名 https://a.com/ 或者 https://a.com
 * @param path 相对路径 /a/b/c 或者 a/b/c
 * @returns {string} https://a.com/b/c 或者 /api/a/b/c
 * @source https://github.com/axios/axios/blob/master/lib/helpers/combineURLs.js
 */
const formatURL = (host, path) => (isProd ? host.replace(/\/+$/, '') : '') + '/' + path.replace(/^\/+/, '')

// request拦截器
service.interceptors.request.use(config => {
  // 如果当前网络有问题，直接报错
  if (!window.navigator.onLine) {
    throw new RequestError('请检查您的网络情况')
  }

  // 清除多余数据
  Object.keys(requestKey).forEach(item => {
    const { isResponse, timestamp } = requestKey[item]
    if (isResponse && Date.now() - timestamp >= 300) {
      delete requestKey[item]
    }
  })

  // 阻止频繁请求和重复请求
  const { method, url, data, baseURL, unique } = config
  const dataStr = generateDataStr(config)
  const URL = formatURL(baseURL, url)
  const hash = `${method}${URL}${dataStr}${unique ? Math.random() : ''}`
  // 重复请求
  if (requestKey[hash]) {
    const { timestamp, isResponse, method, url } = requestKey[hash]
    // 距离上次请求不足300毫秒
    if (Date.now() - timestamp < 300) {
      console.warn('请求过于频繁', method, url)
      throw new RequestError('请求过于频繁')
    }
    // 请求尚未返回
    if (!isResponse) {
      console.warn('请勿重复提交', method, url)
      throw new RequestError('请勿重复提交')
    }
  }

  requestKey[hash] = {
    method,
    url,
    data,
    isResponse: false,
    timestamp: Date.now()
  }

  config.headers = {
    ...config.headers,
    // 防止接口请求缓存。https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control
    'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate'
  }
  return config
}, error => {
  throw new RequestError(error)
})

// response拦截器
service.interceptors.response.use(response => {
  // 如果请求返回，对应的requestKey.isResponse设置为true
  const { method, url, baseURL } = response.config
  const dataStr = generateDataStr(response.config)
  const URL = formatURL(baseURL, url)
  const hash = `${method}${URL}${dataStr}`
  if (requestKey[hash]) {
    requestKey[hash].isResponse = true
  }

  let { code, data, message } = response.data
  if (code === 0) {
    return data
  } else if (code === 10001) {
    message = '系统错误'
  } else if (code === 10002) {
    message = '无权限访问'
  } else if (code === 10006) {
    message = '请先登录'
    // TODO
  } else if (code === 20000) {
    message = '用户未关联公众号'
  }
  return Promise.reject(new RequestError({
    message,
    code
  }))
}, error => {
  // 自定义错误类直接抛出
  if (error instanceof RequestError) {
    throw error
  } else {
    // 如果请求返回，无论错误失败，对应的requestKey.isResponse设置为true
    const { config: { method, url }, code } = error
    const dataStr = generateDataStr(error.config)
    const URL = url.replace(/^\/api/, '')
    const hash = `${method}${URL}${dataStr}`
    if (requestKey[hash]) {
      requestKey[hash].isResponse = true
    }
    // 超时
    if (code === 'ECONNABORTED') {
      throw new RequestError('服务端响应超时')
    }
    // 处理HTTP 错误 如404
    throw new RequestError(error)
  }
})

export default service
