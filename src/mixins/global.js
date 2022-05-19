import { mapGetters } from 'vuex'

// 屏幕边界
let sysInfo = wx.getSystemInfoSync()
/**
 * statusBarHeight 状态栏高度
 * safeArea 安全区域（整屏除去状态栏、底部安全距离）
 * screenWidth 屏幕宽度
 * screenHeight 整屏高度
 */
let { statusBarHeight, safeArea, screenWidth, screenHeight } = sysInfo
// 底部安全距离
let safeBottom = safeArea ? screenHeight - safeArea.bottom : 0
// 导航栏高度
let navBarHeight = (88 * screenWidth) / 750
// 主内容高度（整屏除去状态栏高度和导航栏高度
let mainHeight = `${(screenHeight - navBarHeight - statusBarHeight) | 0}px`
// 主内容距离顶部高度
let mainTop = 0
if (safeArea) {
  mainTop = `${(statusBarHeight + navBarHeight) | 0}px`
} else {
  mainTop = '88rpx'
}
let statusBarHeightNum = statusBarHeight
statusBarHeight += 'px'
let safeBottomNum = safeBottom
safeBottom += 'px'

// 获取胶囊信息
let menuButtonInfo = wx.getMenuButtonBoundingClientRect || wx.getMenuButtonBoundingClientRect() || {}
let menuButtonAttr = {}
menuButtonAttr.menuButtonWidth = menuButtonInfo.width + 'px' || '87px'
menuButtonAttr.menuButtonWidthNum = menuButtonInfo.width || 87
menuButtonAttr.menuButtonHeight = menuButtonInfo.height + 'px' || '32px'
menuButtonAttr.menuButtonHeightNum = menuButtonInfo.height || 32
menuButtonAttr.menuButtonTop = menuButtonInfo.top + 'px' || statusBarHeight || '8px'
menuButtonAttr.menuButtonTopNum = menuButtonInfo.top || statusBarHeightNum || 8
menuButtonAttr.menuButtonRight = menuButtonInfo.right + 'px' || '368px'
menuButtonAttr.menuButtonRightNum = menuButtonInfo.right || 368
menuButtonAttr.menuButtonLeft = menuButtonInfo.left + 'px' || '281px'
menuButtonAttr.menuButtonLeftNum = menuButtonInfo.left || 281

const px2rpx = (px, direct = false, useUnit = true) => {
  let r = direct ? parseFloat(px) : (750 * parseFloat(px)) / screenWidth
  return useUnit ? r + 'rpx' : r
}
const rpx2px = (rpx, direct = false, useUnit = true) => {
  let r = direct ? parseFloat(rpx) : (parseFloat(rpx) * screenWidth) / 750
  return useUnit ? r + 'px' : r
}

export const TAB_PATHS = ['pages/shop/index', 'pages/community/index', 'pages/cart/index', 'pages/mine/index']

export default {
  data() {
    return {
      sys: sysInfo,
      safeArea,
      statusBarHeight,
      mainTop,
      mainHeight,
      safeBottom,
      statusBarHeightNum,
      safeBottomNum,
      screenWidth,
      screenHeight,

      menuButtonInfo,
      menuButtonAttr,

      tabPaths: TAB_PATHS
    }
  },
  computed: {
    _isTab() {
      return this.tabPaths.indexOf(this.$root.__route__) >= 0
    }
  },
  methods: {
    noop() { },
    // 跳转相关
    back() {
      this.navBack()
    },
    navBack(delta = 1) {
      let pages = getCurrentPages()
      if (pages.length === 1) return
      wx.navigateBack({ delta })
    },
    navTo(path, type) {
      this.nav(path, type)
    },
    nav(path, type) {
      if (!path) return
      let p = path.slice(1)
      p = p.split('?')[0]
      if (this.tabPaths.indexOf(p) >= 0) {
        return uni.switchTab({ url: path })
      }
      if (typeof type === 'string' && type === 'redirect') {
        return uni.redirectTo({
          url: path
        })
      }
      let pages = getCurrentPages()
      if (pages.length >= 10) {
        return uni.redirectTo({
          url: path
        })
      }
      uni.navigateTo({ url: path })
    },
    scrollToSelector(selector, top, opt = {}) {
      let duration = opt.duration || 100
      let isComponent = opt.isComponent || true
      let ifNeed = opt.ifNeed || false
      const query = wx.createSelectorQuery()
      if (isComponent) {
        query.select(`.page >>> ${selector}`).boundingClientRect()
      } else {
        query.select(`.page ${selector}`).boundingClientRect()
      }
      query.selectViewport().scrollOffset()
      query.exec(res => {
        if (!res || !res.length || !res[0]) return
        if (res[0].top > 0 && ifNeed) return
        wx.pageScrollTo({
          scrollTop: res[1].scrollTop + (res[0].top || 0) - top,
          duration
        })
      })
    },
    // 单位转换
    px2rpx,
    rpx2px,
  }
}
