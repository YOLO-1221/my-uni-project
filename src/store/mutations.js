export default {
  iniTabbarInfo(state, tabbarList) {
    state.tabbarInfo.tabbarList = tabbarList
    state.tabbarInfo.curTab = tabbarList[0].pagePath
    uni.switchTab({
      url: '/' + tabbarList[0].pagePath,
    })
  },
  setTabbar(state, pagePath) {
    state.tabbarInfo.curTab = pagePath
    uni.switchTab({
      url: '/' + pagePath,
    })
  },
}
