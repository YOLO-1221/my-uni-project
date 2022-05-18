import ENV from 'config/env'

let Fly = require("flyio/dist/npm/wx")
const request = new Fly()

request.config.enableHttp2 = true
request.config.baseURL = ENV.baseUrl
request.config.timeout = 15000

const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {}

request.config.headers['channelNo'] = ENV.extConfig.channelNo || ''
request.config.headers['content-type'] = 'application/x-www-form-urlencoded'
request.config.headers['Accept'] = 'application/prs.Ly.v3+json'
request.config.headers['os'] = 'mini'

// 请求拦截
request.interceptors.request.use(config => {
  wx.showNavigationBarLoading()

  return config
})

// 响应拦截
request.interceptors.response.use(
  (response, promise) => {
    wx.hideNavigationBarLoading()

    return promise.resolve(response.data)
  },
  async (err, promise) => {
    console.log(err)
    wx.hideNavigationBarLoading()

    if (!err) return promise.resolve('')

    if (err.status === 0) {
      let text = ENV.prod ? `网络连接异常` : `网络连接异常，请检查是否打开调试`
      wx.showToast({
        title: text,
        icon: 'none'
      })
    } else if (err.status === 1) {
      wx.showToast({
        title: '网络连接超时',
        icon: 'none'
      })
    }

    if (!err.response) return promise.resolve('')

    if (err.response.data.message) {
      wx.showToast({
        title: err.response.data.message || 'error',
        icon: 'none'
      })
    }
    return promise.resolve('')
  }
)

export default request
