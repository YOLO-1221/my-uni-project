<template>
  <view>
    <my-nav-bar title="商城"> </my-nav-bar>

    <div>
      <image
        v-for="(item, index) in 6"
        :key="index"
        src="https://test.static.lyqz365.com/1012139630/page/627b300f9ff0d63269.jpg"
      ></image>
    </div>

    <u-tabbar
      :value="curTabIndex"
      @change="switchTab"
      :fixed="true"
      :placeholder="true"
      :safeAreaInsetBottom="true"
    >
      <u-tabbar-item
        v-for="(item, index) in tabbarList"
        :key="index"
        :text="item.text"
        :name="index"
      ></u-tabbar-item>
    </u-tabbar>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['curTabIndex', 'tabbarList']),
  },
  methods: {
    switchTab(e) {
      console.log(e, this.tabbarList[e].pagePath)
      this.$store.commit('setCurTabIndex', e)
      uni.switchTab({
        url: '/' + this.tabbarList[e].pagePath,
      })
    },
  },
}
</script>

<style lang="scss">
</style>
