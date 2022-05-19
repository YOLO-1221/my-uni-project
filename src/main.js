import Vue from 'vue'
import App from './App'

import GlobalMixin from './mixins/global'
import store from './store/index'

//  引入并使用uView
import uView from "uview-ui"
Vue.use(uView);
/**
 * 在uView1.x中，组件参数如果为数值的话，默认为rpx单位，但是rpx在平板上会导致尺寸超大，为了更高的可用性，所以uView2.x将单位默认改为px，如果您出于 某些需求，需要将单位改为rpx，可以在main.js中进行如下配置即可
 * 调用setConfig方法，方法内部会进行对象属性深度合并，可以放心嵌套配置
 * 我们可以通过setCofig方法配置uView内部的各项内置配置，目前可配置的有config、props、zIndex、color属性，目前只建议修改config、props属性， 除非您清楚知道自己的修改所带来的影响。
 * 需要在Vue.use(uView)之后执行
 * 
 */
uni.$u.setConfig({
  // 修改$u.config对象的属性
  config: {
    // 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
    // unit: 'rpx'
  },
  // 修改$u.props对象的属性
  props: {
    // 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
    // radio: {
    //   size: 15
    // }
    // 其他组件属性配置
    // ......
  }
})

// 引入mixin
Vue.mixin(GlobalMixin)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
