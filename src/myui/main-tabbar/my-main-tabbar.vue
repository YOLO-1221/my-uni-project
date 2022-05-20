<template>
  <u-tabbar
    :value="tabbarInfo.curTabIndex"
    @change="switchTab"
    :fixed="true"
    activeColor="#333333"
    inactiveColor="#8e8e99"
    :placeholder="true"
    :safeAreaInsetBottom="true"
  >
    <u-tabbar-item
      v-for="(item, index) in tabbarInfo.tabbarList"
      :key="index"
      :text="item.text"
      :name="index"
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
  width: 50rpx;
  height: 50rpx;
}
</style>