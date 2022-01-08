/**
 * 请求数据类型
 * @type {{form: string, json: string}}
 * @example
 *
 * json
 * {a: 1, y: 2}
 *
 * form
 * a=1&y=2
 */
export const requestTypes = {
  json: 'application/json',
  form: 'application/x-www-form-urlencoded'
}

// 请求超时时间，默认15秒
export const TIME_OUT = 15000

// 相同请求请求的最小时间间隔毫秒数，默认300毫秒
export const MIN_LIMIT_MILLISECOND = 300
