import {Toast} from 'vant'
import Vue from 'vue'

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
  switch (s) {
    case s < 300:
      desc = '1-6'
      break
    case s >= 300 && s < 500:
      desc = '4-8'
      break
    case s >= 500 && s < 700:
      desc = '5-10'
      break
    case s >= 700 && s < 1200:
      desc = '6-15'
      break
    case s >= 1200:
      desc = '7-12'
      break
  }
  return {distance: s, desc}
}
