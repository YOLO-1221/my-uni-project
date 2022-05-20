<template>
  <u-tabbar
    :value="tabbarInfo.curTab"
    @change="switchTab"
    :fixed="true"
    activeColor="#333333"
    inactiveColor="#8e8e99"
    :placeholder="true"
    :safeAreaInsetBottom="true"
  >
    <u-tabbar-item
      v-for="item in tabbarInfo.tabbarList"
      :key="item.pagePath"
      :text="item.text"
      :name="item.pagePath"
    >
      <image
        class="u-page__item__slot-icon"
        slot="active-icon"
        :src="item.selectedIconPath"
      ></image>
      <image
        class="u-page__item__slot-icon"
        slot="inactive-icon"
        :src="item.iconPath"
      ></image>
    </u-tabbar-item>
  </u-tabbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['tabbarInfo']),
  },
  methods: {
    switchTab(e) {
      this.$store.commit('setTabbar', e)
    },
  },
}
</script>

<style scoped>
.u-page__item__slot-icon {
  width: 38rpx;
  height: 37rpx;
}
</style>