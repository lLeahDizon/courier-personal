import RequestError from './RequestError'
import router from 'src/router'
import {requestTypes} from './config'
import {generateRequestHeader} from './util'
import {TOKEN_KEY} from '@/constants'

const ERROR_INFO = {
  10001: '系统错误',
  10002: '无权限访问',
  10006: '需要登录',
  400: '需要登录',
  401: '登录过期'
}

export function handleRequest(config) {
  // 格式化定制请求头
  config.headers = generateRequestHeader(config.headers)
  // 如果指定了传输类型
  const type = config.type || 'json'
  const format = requestTypes[type]
  if (format) {
    config.headers['Content-Type'] = format
    // 如果传输类型是form
    if (type === 'form') {
      config.transformRequest = [function (data) {
        if (data) {
          data = Object(data)
          data = Object.keys(data).map(key => `${key}=${data[key]}&`).join('')
        }
        return data
      }]
    }
  } else {
    throw new RequestError('请求的Type类型错误')
  }
  return config
}

export function handleResponse(response) {
  const {code, data, msg: messages} = response.data
  const {token} = response.headers
  const {responseURL} = response.request
  if ('/user/do/authorize'.includes(responseURL) && token) {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.setItem(TOKEN_KEY, token)
  }
  if (!code) {
    return data
  } else {
    switch (code) {
      case 10002:
        router.replace({
          name: 'noPermission'
        })
        break
      case 400:
      case 401:
      case 10006:
        router.push({name: 'login'})
        break
    }
    return Promise.reject(new RequestError(ERROR_INFO[code] || messages))
  }
}
