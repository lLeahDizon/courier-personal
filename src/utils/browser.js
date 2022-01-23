export const getBrowserType = function () {
  const u = navigator.userAgent
  const browser = {
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
    iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') === -1 // 是否web应该程序，没有头部与底部
  }
  if (browser.mobile) {
    // 微信内置浏览器
    browser.weChat = /MicroMessenger/i.test(u) && !/miniProgram/i.test(u)
    browser.Weibo = /WeiBo/i.test(u)
    browser.QQ = /QQ/i.test(u)
    // 微信小程序内置webview
    browser.weApp = /MicroMessenger/i.test(u) && /miniProgram/i.test(u)
  }
  return browser
}
