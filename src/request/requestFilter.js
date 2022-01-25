import RequestError from './RequestError'
import router from 'src/router'
import {requestTypes} from './config'
import {generateRequestHeader} from './util'

const ERROR_INFO = {
  10001: '系统错误',
  10002: '无权限访问',
  10006: '需要登录'
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
  const {code, data, message: messages} = response.data
  if (!code) {
    return data
  } else {
    switch (code) {
      case 10002:
        router.replace({
          name: 'noPermission'
        })
        break
      case 10006:
        router.push({name: 'login'})
        break
    }
    return Promise.reject(new RequestError(ERROR_INFO[code] || messages))
  }
}
