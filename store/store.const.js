// index
export const INDEX_SET_SUCCESS = 'setNotifySuccess'
export const INDEX_SET_ERROR = 'setNotifyError'
export const INDEX_SET_WARNING = 'setNotifyWarning'
export const INDEX_SET_LOADING = 'setLoading'
export const MASTER_GET_DATA = 'getMasterData'
export const UPLOAD_FILE = 'uploadFile'
export const REGISTER_RECEIVE_EMAIL = 'registerReceiveEmail'
export const SET_LANGUAGE = 'setLanguage'
export const TIME_GET_RATE = 10000
export const LAYOUT_AUTH = 'auth-layout'
export const PUBLIC_LAYOUT = 'default-layout'

// authentication
export const AUTH_SET_ROLES = 'authentication/setRoles'
export const AUTH_SET_PERMISSIONS = 'authentication/setPermissions'
export const LENGTH_CODE_OTP = 6
export const OTP_EXPIRE = 60
export const SET_EMAIL = 'setEmail'
export const SET_IS_OPT_PAGE = 'setIsOtpPage'
export const SET_IS_HAS_REF = 'setIsHasRef'
export const SET_HOME_CLASS = 'setHomeClass'
export const AUTH_SEND_OTP = 'authentication/sendOtp'
export const AUTH_RE_SEND_OTP = 'authentication/reSendOtp'
export const AUTH_VERIFY_LOGIN_OTP = 'authentication/verifyLoginOtp'
export const AUTH_LOGIN = 'authentication/login'
export const AUTH_GET_USER_INFO = 'authentication/getUserInfo'
export const AUTH_LOGOUT = 'authentication/logout'
export const AUTH_VERIFY_REGISTER_OTP = 'authentication/verifyRegisterOtp'
export const AUTH_REGISTER = 'authentication/register'
export const AUTH_FORGOT_PASSWORD = 'authentication/forgotPassword'
export const AUTH_RESET_PASSWORD = 'authentication/resetPassword'
export const AUTH_CHANGE_PASSWORD = 'authentication/changePass'
export const AUTH_RESET_PASSWORD_CHECK_TOKEN = 'authentication/checkTokenResetPass'
export const AUTH_RESEND_OTP = 'authentication/resendOtp'

// user
export const USER_UPDATE_PROFILE = 'user/updateProfile'
export const USER_GET_PROFILE = 'user/getProfile'
export const USER_UPLOAD_AVATAR = 'user/uploadAvatar'
export const USER_CHANGE_PASSWORD = 'user/changePass'
export const USER_GET_BALANCE_USD = 'user/getBalanceUSD'
export const USER_GET_OVERVIEW = 'user/getOverview'
export const USER_GET_PUBLIC_SALE = 'user/getPublicSale'
export const USER_GET_PRIVATE_SALE = 'user/getPrivateSale'
export const USER_GET_OVERVIEW_HOME = 'user/getOverviewHome'
export const USER_GET_OVERVIEW_REF = 'user/getOverviewRef'
export const USER_GET_HISTORY_REF = 'user/getHistoryRef'
export const USER_GET_HISTORY_DEPOSIT = 'user/getHistoryDeposit'
export const USER_GET_HISTORY_WITHDRAW = 'user/getHistoryWithdraw'
export const USER_GET_HISTORY_BUY = 'user/getHistoryBuy'
export const USER_GET_HISTORY_PAID = 'user/getHistoryPaid'
export const USER_GET_OVERVIEW_PACKAGE = 'user/getOverviewPackage'
export const USER_GET_PROFIT_CHART = 'user/getProfitChart'
export const USER_GET_PREPHONE = 'user/getPrePhone'
export const USER_GET_FROM_TOKEN = 'user/getFromToken'
export const USER_GET_RATE = 'user/getRate'
export const USER_BUY = 'user/buy'
export const USER_GET_RATE_STN_USD = 'user/getRateStnUsd'

// plan
export const PLAN_BUY_PACKAGE = 'plan/buyPackage'
export const PLAN_GET_PLAN = 'plan/getPlans'

// node-network
export const SET_SHOW_INVITE = 'node-network/setShowInvite'
export const SET_DATA_SHOW_INVITE = 'node-network/setDataShowInvite'
export const NODE_WALLET_GET_LIST = 'node-network/getList'
export const NODE_WALLET_GET_DETAIL_NODE = 'node-network/getDetailNode'
export const NODE_WALLET_GET_DETAIL_NODE_MORE = 'node-network/getDetailNodeMore'

// wallet
export const WALLET_GET_LIST_DATA = 'wallet/getList'
export const WALLET_GET_INFO = 'wallet/getWalletInfo'
export const WALLET_GET_WITHDRAW_FEE = 'wallet/getWithdrawFee'
export const WALLET_WITHDRAW_NOW = 'wallet/postWithdrawNow'
export const WALLET_DEPOSIT = 'wallet/postDeposit'
export const WALLET_SEND_OTP = 'wallet/sendOtp'
export const WALLET_RESEND_OTP = 'wallet/resendOtp'
