import Request from '@/request'

// 实名认证
export function userVerify(data) {
  return Request({
    url: '/user/verify',
    method: 'post',
    data
  })
}

// 微信用户授权
export function userDoAuthorize(code) {
  return Request({
    url: `/user/do/authorize?code=${code}`,
    method: 'get'
  })
}
