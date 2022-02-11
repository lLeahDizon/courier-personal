import {ImagePreview, Toast} from 'vant'
import Vue from 'vue'
import {getBrowserType} from '@/utils/browser'
import {orderPay} from '@/service'
import {$error} from '@/utils/error'

export * from './error'
export * from './browser'

/**
 * loading
 * @param {number} [duration] 展示时长
 * @param {string} [message] 文案
 * @return {{clear: function}}
 */
export function $loading(duration = 0, message = '加载中...') {
  return Toast.loading({
    duration,
    message,
    forbidClick: true
  })
}

export const eventBus = new Vue()

/**
 * 转换弧度
 * @param d
 * @returns {number}
 */
function getRad(d) {
  const PI = Math.PI
  return d * PI / 180.0
}

/**
 * 根据经纬度计算两点间距离
 * @param lng1
 * @param lat1
 * @param lng2
 * @param lat2
 * @returns {number|*}
 * @constructor
 */
export function CoolWPDistance(lng1, lat1, lng2, lat2) {
  const f = getRad((lat1 + lat2) / 2)
  const g = getRad((lat1 - lat2) / 2)
  const l = getRad((lng1 - lng2) / 2)
  let sg = Math.sin(g)
  let sl = Math.sin(l)
  let sf = Math.sin(f)
  let s, c, w, r, d, h1, h2
  const a = 6378137.0
  const fl = 1 / 298.257
  sg = sg * sg
  sl = sl * sl
  sf = sf * sf
  s = sg * (1 - sl) + (1 - sf) * sl
  c = (1 - sg) * (1 - sl) + sf * sl
  w = Math.atan(Math.sqrt(s / c))
  r = Math.sqrt(s * c) / w
  d = 2 * w * a
  h1 = (3 * r - 1) / 2 / c
  h2 = (3 * r + 1) / 2 / s
  s = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg))
  const kilometer = s / 1000
  if (s >= 1000) {
    s = kilometer.toFixed(0)
  } else {
    s = Math.round(kilometer)
  }
  let desc = ''
  const distance = Number(s)
  if (distance < 300) desc = '1-6'
  if (distance >= 300 && distance < 500) desc = '4-8'
  if (distance >= 500 && distance < 700) desc = '5-10'
  if (distance >= 700 && distance < 1200) desc = '6-15'
  if (distance >= 1200) desc = '7-12'
  return {distance, desc}
}

export function getTimeArea() {
  return Array.from(
    {length: 24},
    (x, i) => ([(i + '').padStart(2, '0') + ':00', (i + 1 + '').padStart(2, '0') + ':00'])
  )
    .map(item => item.join('-'))
}

export function getSpaceTime(space = 30) {
  return getTimeArea().slice(new Date().getHours() + (new Date().getMinutes() >= space ? 2 : 1))
}

/**
 * 预览图片
 * @param {string} current
 * @param {string[]} urls
 */
export function previewImage({current = '', urls = []}) {
  if (getBrowserType().weChat && window.wx && typeof window.wx.previewImage === 'function') {
    window.wx.previewImage({
      current,
      urls
    })
  } else {
    ImagePreview({
      images: urls,
      startPosition: urls.findIndex(i => i === current) || 0
    })
  }
}

/**
 * 文字提示
 * @param {Object} options 提示内容
 */
export function $message(options) {
  Toast(options)
}

/**
 * location.search 转为k-v对象
 * @return {{}}
 */
export function structureQs(queryString) {
  const search = queryString || location.search.slice(1)
  const res = {}
  try {
    search.split('&').forEach(i => {
      const kv = i.split('=')
      res[kv[0]] = kv[1]
    })
  } catch (e) {
    console.log(e)
  }
  return res
}

/**
 * 支付
 * @param orderId 订单 id
 * @param success 成功回调
 * @param cancel 取消回调
 * @param fail 失败回调
 * @return {Promise<void>}
 */
export async function handlePay(orderId, success, cancel, fail) {
  const loading = $loading()
  try {
    const obj = await orderPay(orderId)
    if (obj) {
      obj.package = obj.packageStr
      const req = JSON.parse(JSON.stringify(obj))
      delete req.packageStr
      // const onBridgeReady = () => {
      //   window.WeixinJSBridge.invoke('getBrandWCPayRequest', req, (res) => {
      //     console.log('---getBrandWCPayRequest')
      //     console.log(res)
      //     if (res.err_msg === 'get_brand_wcpay_request:ok') {
      //       // success()
      //     }
      //     if (res.err_msg === 'get_brand_wcpay_request:cancel') {
      //       cancel()
      //     }
      //     if (res.err_msg === 'get_brand_wcpay_request:fail') {
      //       fail()
      //     }
      //   })
      // }
      // if (typeof window.WeixinJSBridge == 'undefined') {
      //   if (document.addEventListener) {
      //     document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
      //   } else if (document.attachEvent) {
      //     document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
      //     document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
      //   }
      // } else {
      //   onBridgeReady()
      // }
      wx.chooseWXPay({
        timestamp: req.timestamp,
        nonceStr: req.nonceStr,
        package: req.package,
        signType: req.signType,
        paySign: req.paySign,
        success,
        cancel,
        fail
      })
    }
  } catch (e) {
    $error(e)
  } finally {
    loading.clear()
  }
}
