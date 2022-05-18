<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-ui/index.scss';

page {
  font-family: PingFangSC-Semibold, PingFangTC-Semibold, PingFangHK-Semibold,
    sans-serif;
}

.line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}

@for $i from 1 through 6 {
  .line-#{$i} {
    -webkit-line-clamp: $i;
  }
}
</style>