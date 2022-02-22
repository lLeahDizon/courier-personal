// import { MIN_LIMIT_MILLISECOND } from './config'
import { generateDataStr } from './util'

const requestKey = {}
const formatURL = (host, path) => (process.env.NODE_ENV === 'production'
  ? host.replace(/\/+$/, '')
  : '') +
  '/' + path.replace(/^\/+/, '')

export function limitRequest (config) {
  // 清除无用的cache
  Object.keys(requestKey).forEach(item => {
    const { isResponse, timestamp } = requestKey[item]
    if (isResponse && Date.now() - timestamp >= 300) {
      delete requestKey[item]
    }
  })
  const dateStr = generateDataStr(config)
  const { method, url, baseURL, unique, data } = config
  const URL = formatURL(baseURL, url)
  const hash = `${method}${URL}${dateStr}${unique ? Math.random() : ''}`
  if (requestKey[hash]) {
    // const { isResponse, method, url } = requestKey[hash]
    // 距离上次请求不到指定最小毫秒数
    // if (Date.now() - timestamp < MIN_LIMIT_MILLISECOND) {
    //   console.warn('请求过于频繁', method, url)
    //   throw new RequestError('请求过于频繁')
    // }
    // 请求尚未返回
    // if (!isResponse) {
    //   console.warn('请勿重复提交', method, url)
    //   throw new RequestError('请勿重复提交')
    // }
  }
  // 新请求初始化
  requestKey[hash] = {
    method,
    url,
    data,
    isResponse: false,
    timestamp: Date.now()
  }
}

export function releaseResponse (config) {
  const dataStr = generateDataStr(config)
  const { method, url, baseURL } = config
  const URL = formatURL(baseURL, url)
  const hash = `${method}${URL}${dataStr}`
  if (requestKey[hash]) {
    requestKey[hash].isResponse = true
  }
}
