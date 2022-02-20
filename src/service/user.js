import Request from '@/request'

// 实名认证
export function userVerify(data) {
  return Request({
    url: '/user/verify',
    method: 'post',
    data
  })
}

// 获取认证前校验信息
export function userDetectAuth() {
  return Request({
    url: '/user/detect/auth',
    method: 'get'
  })
}

// 存在地址
export function userExitAddress() {
  return Request({
    url: '/user/exist/address',
    method: 'get'
  })
}

// 地址列表
export function userAddressList() {
  return Request({
    url: '/user/address/list',
    method: 'get'
  })
}

// 保存地址
export function userAddressSave(data) {
  return Request({
    url: '/user/address/save',
    method: 'post',
    data
  })
}

// 手机验证码
export function userSendCode(phone) {
  return Request({
    url: `/user/send/phone/verify/code?phone=${phone}`,
    method: 'get'
  })
}

// 微信用户授权
export function userDoAuthorize(code) {
  return Request({
    url: `/user/do/authorize?code=${code}`,
    method: 'get'
  })
}
