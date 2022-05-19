<template>
  <div>
    <my-nav-bar title="我的"></my-nav-bar>

    <div>
      <image
        v-for="(item, index) in 6"
        :key="index"
        src="https://test.static.lyqz365.com/1012139630/page/627b3009af70713963.jpg"
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['curTabIndex', 'tabbarList']),
  },
  data() {
    return {}
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

<style scoped>
</style>