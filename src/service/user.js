import Request from '@/request'

// 实名认证
export function userVerify(data) {
  return Request({
    url: '/user/verify',
    method: 'post',
    data
  })
}
