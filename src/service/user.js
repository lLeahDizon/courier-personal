import Request from '@/request'

// 实名认证
export function userVerify(data) {
  return Request({
    url: '/user/verify',
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
