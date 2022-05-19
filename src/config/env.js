/**
 * 用于环境配置
 */
/* ========= 线上线下 ========= */
const PROD = 1
const DEV = 0

// const ENV = DEV
const ENV = PROD

// 项目
const PROJ_HOST = ENV === PROD ? 'https://testapi.lyqz365.com' : 'https://testapi.lyqz365.com'

/* ========= 版本 ========= */
const MINA_VERSION__DEV = '开发版'
const MINA_VERSION__TRIAL = '体验版'
const MINA_VERSION__RELEASE = '正式版'

// const RUNTIME = MINA_VERSION__DEV
// const RUNTIME = MINA_VERSION__TRIAL
const RUNTIME = MINA_VERSION__RELEASE

// 渠道号
const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {}

console.group('环境')
console.info(ENV === DEV ? '线下' : '线上', RUNTIME)
console.groupEnd('环境')

export default {
  prod: ENV === PROD,
  baseUrl: PROJ_HOST + '/v1',
  extConfig: extConfig,
  runtime: {
    name: RUNTIME,
    develop: RUNTIME === MINA_VERSION__DEV,
    trial: RUNTIME === MINA_VERSION__TRIAL,
    release: RUNTIME === MINA_VERSION__RELEASE
  }
}

