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
