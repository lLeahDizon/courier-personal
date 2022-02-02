import {ImagePreview, Toast} from 'vant'
import Vue from 'vue'
import {getBrowserType} from '@/utils/browser'

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
