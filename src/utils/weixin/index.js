import { ACCOUNT_CODE } from 'src/constants'
import { getBrowserType } from 'src/utils'
import { getWXConfigApi } from './fetch'

export function weChatAuthorizationUserInfo (redirectUri, state = 'state') {
  const appId = ACCOUNT_CODE
  location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&state=${state}&scope=snsapi_userinfo#wechat_redirect`)
}

export async function initWeChatEnv (url = location.href) {
  if (!getBrowserType().weChat) {
    return
  }
  // 微信环境初始化
  try {
    const json = await getWXConfigApi({ accountCode: ACCOUNT_CODE, url })
    wx.config({
      ...json,
      debug: process.env.NODE_ENV === 'development',
      jsApiList: [
        // 拍照或从手机相册中选图接口
        'chooseImage',
        // 预览图片接口
        'previewImage',
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
