import Request from '@/request'

// 订单确认页信息
export function orderConfirmInfo(data) {
  return Request({
    url: '/order/confirm/info',
    method: 'post',
    data
  })
}

// 创建订单
export function orderCreate() {
  return Request({
    url: '/order/create',
    method: 'get'
  })
}

// 订单列表
export function orderList(data) {
  return Request({
    url: '/order/list',
    method: 'post',
    data
  })
}

// 订单确认页信息
export function orderPay() {
  return Request({
    url: '/order/pay',
    method: 'get'
  })
}
