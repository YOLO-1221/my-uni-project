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

    <my-main-tabbar></my-main-tabbar>
  </view>
</template>

<script>
export default {
  computed: {},
  methods: {},
}
</script>

<style lang="scss">
</style>
