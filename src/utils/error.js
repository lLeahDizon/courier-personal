import { Toast } from 'vant'
import RequestError from 'src/utils/request'

/**
 * 错误提示
 * @param error 错误信息
 * @param stopBubble 是否阻止冒泡，默认不阻止
 */
export function $error (error, stopBubble = false) {
  let message = '未知错误'
  if (typeof error === 'string') {
    // 接口返回的response的返回体的message信息
    message = error || '系统错误，请稍后再试！'
  } else if (typeof error === 'object') {
    // 网络请求错误 | 代码错误
    message = error.message || '系统错误，请稍后再试！'
  } else if (typeof error === 'boolean') {
    message = '表单校验未通过，请检查输入项！'
  }
  if (error && error.code !== 10006) {
    Toast.fail({
      message,
      forbidClick: true
    })
    // 如果不阻止错误冒泡，且不是网络错误，则向上抛出错误
    if (!stopBubble && !(error instanceof RequestError)) {
      throw error
    }
  }
}
