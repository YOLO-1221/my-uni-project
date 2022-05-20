export default {
  iniTabbarInfo(state, tabbarList) {
    state.tabbarInfo.tabbarList = tabbarList
    state.tabbarInfo.curTabIndex = 0
    uni.switchTab({
      url: '/' + tabbarList[0].pagePath,
    })
  },
  setTabbar(state, index) {
    state.tabbarInfo.curTabIndex = index
    uni.switchTab({
      url: '/' + state.tabbarInfo.tabbarList[index].pagePath,
    })
  },
}
