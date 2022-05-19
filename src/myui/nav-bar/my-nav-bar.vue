<template>
  <div @touchmove.stop="noop">
    <header
      class="navbar__placeholder"
      :style="[navStyle, { paddingTop: statusBarHeight }]"
    ></header>
    <div class="nav-bar__parent">
      <div class="status-bar" :style="[statusBarStyle]"></div>
      <div class="navbar" :style="[navStyle]">
        <template v-if="navType === 'allCustom'">
          <div :style="[navContentBtnWrapperStyle]">
            <slot name="btn"></slot>
          </div>
          <div :style="[navContentTitleStyle]">
            <slot name="title"></slot>
          </div>
        </template>

        <template v-else-if="navType === 'allCustom-half'">
          <div :style="[navContentStyle]">
            <slot></slot>
          </div>
        </template>

        <template v-else-if="navType === 'titleCustom'">
          <div
            class="nav-content-btn-wrapper"
            :style="[navContentBtnWrapperStyle]"
          >
            <div v-if="leftBtns.length > 0" class="btns" :style="[btnStyle]">
              <u-icon
                v-for="btn in leftBtns"
                :key="btn"
                @click="navbarFn(btn)"
                :name="btn === 'back' ? 'arrow-left' : 'home-fill'"
              ></u-icon>
            </div>
          </div>
          <div :style="[navContentTitleStyle]">
            <slot></slot>
          </div>
        </template>

        <template v-else-if="navType === 'btnsCustom'">
          <div :style="[navContentBtnWrapperStyle]">
            <slot></slot>
          </div>
          <div
            :style="[navContentTitleStyle]"
            class="navbar__title line line-1"
          >
            {{ title }}
          </div>
        </template>

        <template v-else>
          <div
            class="nav-content-btn-wrapper"
            :style="[navContentBtnWrapperStyle]"
          >
            <div class="btns" v-if="leftBtns.length > 0" :style="[btnStyle]">
              <u-icon
                v-for="btn in leftBtns"
                :key="btn"
                @click="navbarFn(btn)"
                :name="btn === 'back' ? 'arrow-left' : 'home-fill'"
              ></u-icon>
            </div>
          </div>
          <div
            :style="[navContentTitleStyle]"
            class="navbar__title line line-1"
          >
            {{ title }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-nav-bar',
  data() {
    return {
      leftBtns: [],
    }
  },
  props: {
    navType: {
      type: String,
      default: 'default',
    },
    navColor: {
      type: String,
      default: '#fff',
    },
    title: {
      type: String,
      default: '绿优到家',
    },
    navHeight: {
      type: String,
      default: '88rpx',
    },
  },
  computed: {
    statusBarStyle() {
      return {
        height: this.statusBarHeight,
        backgroundColor: this.navColor,
      }
    },
    navStyle() {
      return {
        height: this.navHeight,
        backgroundColor: this.navColor,
      }
    },
    navContentStyle() {
      return {
        width: this.menuButtonAttr.menuButtonRightNum + 'px',
      }
    },
    navContentBtnWrapperStyle() {
      return {
        width: this.screenWidth - this.menuButtonAttr.menuButtonLeftNum + 'px',
      }
    },
    navContentTitleStyle() {
      return {
        width:
          this.menuButtonAttr.menuButtonLeftNum * 2 - this.screenWidth + 'px',
      }
    },
    btnStyle() {
      return {
        width: this.menuButtonAttr.menuButtonWidth,
        height: this.menuButtonAttr.menuButtonHeight,
        top:
          this.menuButtonAttr.menuButtonTopNum - this.statusBarHeightNum + 'px',
        left: this.screenWidth - this.menuButtonAttr.menuButtonRightNum + 'px',
        border: `1px solid #e3e3e3`,
        borderRadius: (this.statusBarHeightNum | 0) + 'px',
      }
    },
  },
  methods: {
    getLeftBtns() {
      let pages = getCurrentPages()
      let currentPath = pages[pages.length - 1]['route']
      let tabPaths = this.tabPaths.slice(0)
      tabPaths.push('pages/login/index')
      if (tabPaths.indexOf(currentPath) >= 0) {
        return []
      }
      if (pages.length > 1) {
        return ['back', 'index']
      } else {
        this.menuButtonAttr.menuButtonWidth =
          this.menuButtonAttr.menuButtonWidthNum / 2 + 'px'
        return ['index']
      }
    },
    navbarFn(type) {
      switch (type) {
        case 'back':
          return this.navBack()
        case 'index':
          return this.navTo('/pages/shop/index')
      }
    },
  },
  onPageShow() {
    this.leftBtns = this.getLeftBtns()
  },
}
</script>

<style lang="scss">
.nav-bar__parent {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10000;
}

.navbar {
  display: flex;
  align-items: center;

  position: relative;
  width: 100%;
  z-index: 10000;
}

.navbar__title {
  // position: absolute;
  // top: 17rpx;
  // left: 0;
  // right: 0;
  // margin: auto;
  font-size: 38rpx;
  font-family: PingFangSC-Semibold, PingFangTC-Semibold, PingFangHK-Semibold,
    sans-serif;
  font-weight: 700;
  text-align: center;
}

.btns {
  display: flex;
  align-items: center;
  justify-content: space-around;

  box-sizing: border-box;
}

.nav-content-btn-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
