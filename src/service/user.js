import Request from '@/request'

// 实名认证
export function userVerify(data) {
  return Request({
    url: '/user/verify',
    method: 'post',
    data
  })
}

// 实名认证更新
export function userIsVerify(data) {
  return Request({
    url: '/user/is/verify',
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

// 批量删除地址
export function userDeleteAddress(idList) {
  return Request({
    url: `/user/batch/delete/address?idList=${idList}`,
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

// 绑定手机
export function userBindPhone({code, phone}) {
  return Request({
    url: `user/bind/phone?code=${code}&phone=${phone}`,
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
