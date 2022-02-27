import Request from '@/request'

// 订单确认页信息
export function orderConfirmInfo(data) {
  return Request({
    url: '/order/confirm/info',
    method: 'post',
    data
  })
}

// 订单确认页信息
export function orderPreInfo(data) {
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

// 订单支付
export function orderPay(id) {
  return Request({
    url: `/order/pay?id=${id}`,
    method: 'get'
  })
}

// 订单待支付
export function orderUnPay(id) {
  return Request({
    url: `/order/unPay?id=${id}`,
    method: 'get'
  })
}

// 订单取消
export function orderCancel(id) {
  return Request({
    url: `/order/cancel?id=${id}`,
    method: 'get'
  })
}

// 订单详情
export function orderDetail(id) {
  return Request({
    url: `/order/detail?id=${id}`,
    method: 'get'
  })
}
