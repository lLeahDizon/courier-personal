import Request from '@/request'

// 获取保费
export function insuranceAmount(itemAmount) {
  return Request({
    url: `/common/insurance/amount?itemAmount=${itemAmount}`,
    method: 'get'
  })
}
