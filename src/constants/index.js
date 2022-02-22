export const ACCOUNT_CODE = 'wxf7c9fd6eeba408f4'

export const TOKEN_KEY = 'Login_Token'

// 用户信息Key
export const USER_INFO_KEY = 'User_Info'

export const ORDER_INFO_KEY = 'Order_Info'

export const VERIFY_KEY = 'Verify_Key'

export const EXIST_ADDRESS_KEY = 'Exist_Address_Key'

// 表示当前页面已导向了其他页面（location.href或location.replace）
export const HREF_TO_OTHER_PAGE = 'HREF_TO_OTHER_PAGE'

// 免登录路由白名单
export const WHITE_LIST = [
  'login',
  'agreement',
  'useGuide',
  'ticket',
  'platformLogin'
]

// 这些页面含有唤起微信支付的功能，需要做对ios系统的hack处理（重置location.href）
export const PAY_ROUTER_LIST = [
  'orderConfirm'
]
