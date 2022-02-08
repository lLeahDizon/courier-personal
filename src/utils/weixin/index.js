import {ACCOUNT_CODE, TOKEN_KEY, WHITE_LIST} from 'src/constants'
import {getBrowserType} from 'src/utils'
import {getWXConfigApi} from './fetch'

const {VUE_APP_BASE_NAME, VUE_APP_DOMAIN} = process.env

export function handleLogin() {
  const {pathname} = location
  const path = pathname.replace('/' + process.env.VUE_APP_BASE_NAME, '')
  localStorage.removeItem(TOKEN_KEY)
  // 若非白名单页面
  if (!WHITE_LIST.includes(path)) {
    const redirectUri = encodeURIComponent(`${VUE_APP_DOMAIN}${VUE_APP_BASE_NAME}/platform-login?t=${Date.now()}`)
    weChatAuthorizationUserInfo(redirectUri)
  }
}

export function weChatAuthorizationUserInfo(redirectUri, state = 'state') {
  location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${ACCOUNT_CODE}&redirect_uri=${redirectUri}&response_type=code&state=${state}&scope=snsapi_userinfo#wechat_redirect`)
}

export async function initWeChatEnv(url = location.href) {
  if (!getBrowserType().weChat) {
    return
  }
  // 微信环境初始化
  try {
    const json = await getWXConfigApi({url})
    wx.config({
      ...json,
      debug: process.env.NODE_ENV === 'development',
      jsApiList: [
        // 拍照或从手机相册中选图接口
        'chooseImage',
        // 预览图片接口
        'previewImage',
        // 微信支付
        'chooseWXPay',
        // 上传图片接口
        'uploadImage',
        // 下载图片接口
        'downloadImage',
        // “分享给朋友”及“分享到QQ”
        'updateAppMessageShareData',
        // “分享到朋友圈”及“分享到QQ空间”
        'updateTimelineShareData'
      ],
      openTagList: ['wx-open-launch-weapp']
    })
    wx.error((err) => {
      console.error(err)
    })
  } catch (e) {
    console.error(e)
  }
}
