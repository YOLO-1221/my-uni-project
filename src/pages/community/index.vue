<template>
  <div>
    <my-nav-bar title="社区"></my-nav-bar>

    <div>
      <image
        v-for="(item, index) in 6"
        :key="index"
        src="https://test.static.lyqz365.com/1012139630/page/627b5a4f8791780328.jpg"
      ></image>
    </div>

    <my-main-tabbar></my-main-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped>
</style>