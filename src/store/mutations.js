export default {
  setCurTabIndex(state, curTabIndex) {
    state.curTabIndex = curTabIndex
  },
  setTabbarList(state, tabbarList) {
    state.tabbarList = tabbarList
    state.curTabIndex = 0
    uni.switchTab({
      url: '/' + tabbarList[0].pagePath,
    })
  },
}
