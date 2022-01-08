import { TOKEN_KEY } from 'src/constant'

// 获取请求内容字符串
export function generateDataStr (config) {
  const { method, data, params } = config
  let dateStr = ''
  if (method === 'get' && params) {
    dateStr = typeof params !== 'string' ? JSON.stringify(params) : params
  }
  if (method === 'post' && data) {
    dateStr = typeof data !== 'string' ? JSON.stringify(data) : data
  }
  return dateStr
}

export function generateRequestHeader (headers) {
  const token = sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY)
  const formatedHeaders = {
    ...headers,
    'token': token,
    // 防止接口请求缓存。https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control
    'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate'
  }
  return formatedHeaders
}
