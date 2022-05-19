<template>
  <div>
    <my-nav-bar navType="allCustom">
      <template v-slot:btn>
        <div class="nav-img-wrapper">
          <image
            class="nav__img"
            src="http://lydaojia.oss-cn-beijing.aliyuncs.com/mall/cart/catr%402.png"
            mode="aspectFit"
          ></image>
        </div>
      </template>
      <template v-slot:title>
        <div class="nav__content tab-box">
          <view
            class="tab-item"
            :class="{ 'tab-item-active': item.actionType == TabCur }"
            :data-id="item.actionType"
            v-for="(item, index) in cartTab"
            :key="index"
            @click="tabSelect(item.actionType)"
          >
            <view>{{ item.title }}</view>
            <view
              :class="{ 'tab-bottom-line': item.actionType == TabCur }"
              style="margin-top: 17rpx"
            ></view>
          </view>
        </div>
      </template>
    </my-nav-bar>

    <button @click="request">发请求</button>

    <div>
      <image
        v-for="(item, index) in 6"
        :key="index"
        src="https://test.static.lyqz365.com/1012139630/page/627b23938951750921.jpg"
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
import api from '../../utils/api'

import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['curTabIndex', 'tabbarList']),
  },
  data() {
    return {
      TabCur: 1,
      cartTab: [
        {
          title: '配送',
          icon: 'https://test.static.lyqz365.com/mall/cart/mall_delivery.png',
          actionType: 1,
        },
        {
          title: '商城',
          icon: 'https://test.static.lyqz365.com/mall/cart/mall_mall.png',
          actionType: 3,
        },
      ],
    }
  },
  methods: {
    tabSelect(actionType) {
      this.TabCur = actionType
    },
    async request() {
      try {
        let res = await api.channelTest()
        if (res.data.switch === 'mall') {
          let tabbarList = [
            {
              pagePath: 'pages/shop/index',
              text: '商城',
              iconPath: 'static/images/icon__shop.png',
              selectedIconPath: 'static/images/icon__shop--active.png',
            },
            {
              pagePath: 'pages/community/index',
              text: '社区',
              iconPath: 'static/images/icon__community.png',
              selectedIconPath: 'static/images/icon__community--active.png',
            },
            {
              pagePath: 'pages/cart/index',
              text: '购物车',
              iconPath: 'static/images/icon__cart.png',
              selectedIconPath: 'static/images/icon__cart--active.png',
            },
            {
              pagePath: 'pages/mine/index',
              text: '我的',
              iconPath: 'static/images/icon__mine.png',
              selectedIconPath: 'static/images/icon__mine--active.png',
            },
          ]
          this.$store.commit('setTabbarList', tabbarList)
        }
      } catch (error) {}
    },
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
.nav-img-wrapper {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}
.nav__img {
  width: 133rpx;
  height: 48rpx;
}

.nav__content {
  font-size: 38rpx;
  font-family: PingFangSC-Semibold, PingFangTC-Semibold, PingFangHK-Semibold,
    sans-serif;
  font-weight: 700;
  text-align: center;
}

.tab-box {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.tab-item {
  width: 80rpx;
  height: 70rpx;

  font-size: 32rpx;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #8e8e99;
  line-height: 36rpx;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.tab-item-active {
  font-size: 40rpx;
  font-family: PingFang SC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 40rpx;
}

.tab-bottom-line {
  width: 46rpx;
  height: 5rpx;

  background-color: #333;
  border-radius: 40px 40px 40px 40px;

  margin-top: 17rpx;
}
</style>