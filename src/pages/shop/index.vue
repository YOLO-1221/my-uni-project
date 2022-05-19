<template>
  <view class="navBar padding">
    <!-- header -->
    <!-- <view class="navBar-fixed">
      <view :style="{ height: statusBarHeight + 'px' }"></view>
      <view
        class="navBar-content padding-left"
        :style="{ width: navBarWidth + 'px', height: navBarHeight + 'px' }"
      >
        <slot>
          <view>
            <view class="text-lg"> 绿优商城 </view>
            <view class="text-sm">万品精选 一站购齐</view>
          </view>
        </slot>
      </view>
    </view>
    <view :style="{ height: navBarHeight + statusBarHeight + 'px' }"></view> -->

    <my-nav-bar navType="allCustom">
      <div class="nav-img-wrapper">
        <view class="text-lg"> 绿优商城 </view>
        <view class="text-sm">万品精选 一站购齐</view>
      </div>
    </my-nav-bar>

    <!-- 搜索search -->
    <view @tap="handLeDemo">
      <u--input
        placeholder="请输入搜索关键字"
        clearable
        prefixIcon="search"
        prefixIconStyle="font-size: 22px;color: #909399"
      >
      </u--input>
    </view>
    <!-- banner -->
    <view class="padding-top-sm">
      <u-swiper :list="list1" @change="change" @click="click"></u-swiper>
    </view>
    <!-- list -->
    <view class="bg-white margin-tb-sm padding-bottom-sm radius">
      <u-grid :border="false" col="5">
        <u-grid-item v-for="(listItem, listIndex) in list" :key="listIndex">
          <u-icon
            :customStyle="{ paddingTop: 20 + 'rpx' }"
            :name="listItem.name"
            :size="50"
          ></u-icon>
          <text class="text-sm padding-top-xs">{{ listItem.title }}</text>
        </u-grid-item>
      </u-grid>
      <u-toast ref="uToast" />
    </view>
    <!-- 瀑布流 -->
    <view>
      <view class="waterfall-box h-flex-x h-flex-2">
        <view>
          <helang-waterfall
            v-for="(item, index) in leftList"
            :key="index"
            :params="item"
            tag="left"
            :index="index"
            @height="onHeight"
            @click="onClick"
          ></helang-waterfall>
        </view>
        <view>
          <helang-waterfall
            v-for="(item, index) in rightList"
            :key="index"
            :params="item"
            @height="onHeight"
            @click="onClick"
            tag="right"
            :index="index"
          ></helang-waterfall>
        </view>
      </view>
      <view class="load-txt">{{ ajax.loadTxt }}</view>
    </view>
  </view>
</template>

<script>
import helangWaterfall from "../../components/helang-waterfall/helang-waterfall.vue";
import myNavBar from "../../myui/nav-bar/my-nav-bar.vue";
export default {
  components: {
    helangWaterfall,
    myNavBar,
  },
  // name: "navBar",
  data() {
    return {
      statusBarHeight: 20, //状态栏的高度
      navBarHeight: 44, //导航栏的高度
      navBarWidth: 375, //导航栏的宽度
      // 轮博图片
      list1: [
        "https://cdn.uviewui.com/uview/swiper/swiper1.png",
        "https://cdn.uviewui.com/uview/swiper/swiper2.png",
        "https://cdn.uviewui.com/uview/swiper/swiper3.png",
      ],
      list: [
        {
          name: "https://test.static.lyqz365.com/mall/20220414_24.png",
          title: "商超零售",
        },
        {
          name: "https://test.static.lyqz365.com/mall/20220414_23.png",
          title: "美食饮品",
        },
        {
          name: "https://test.static.lyqz365.com/mall/20220414_20.png",
          title: "服饰箱包",
        },
        {
          name: "https://test.static.lyqz365.com/mall/20220414_21.png",
          title: "家纺家居",
        },
        {
          name: "https://test.static.lyqz365.com/mall/20220414_26.png",
          title: "鲜花绿植",
        },
        {
          name: "https://test.static.lyqz365.com/mall/20220414_22.png",
          title: "美容美妆",
        },
        {
          name: "https://test.static.lyqz365.com/mall/20220414_25.png",
          title: "数码家电",
        },
        {
          name: "https://test.static.lyqz365.com/mall/20220414_27.png",
          title: "医疗健康",
        },
        {
          name: "https://test.static.lyqz365.com/mall/20220414_19.png",
          title: "本地生活",
        },
        {
          name: "https://static.lyqz365.com/mall/20220414_18.png",
          title: "全部分类",
        },
      ],
      // 瀑布流
      comList: [
        {
          img: "http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg",
          name: "1商品的名称，可以很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长",
          id: 100,
        },
        {
          img: "https://test.static.lyqz365.com/1012139630/page/627b313405df972209.jpeg",
          name: "2商品名称会在超出N行时候不折叠",
          id: 100,
        },
        {
          img: "https://test.static.lyqz365.com/1012139630/page/627b539cc2e9455047.jpg",
          name: "3只有二行标题时高度为39",
          id: 100,
        },
        {
          img: "https://test.static.lyqz365.com/1012139630/page/627b31263742b19200.jpeg",
          name: "4具体样式您可以自定义",
          id: 100,
        },
        {
          img: "https://test.static.lyqz365.com/1012139630/page/627b313405df972209.jpeg",
          name: "5vue的H5页面也是如此使用",
          id: 100,
        },
      ],

      // 瀑布流方法
      leftHeight: 0,
      rightHeight: 0,
      leftList: [],
      rightList: [],
      ajax: {
        // 是否可以加载
        load: true,
        // 加载中提示文字
        loadTxt: "",
        // 每页的请求条件
        rows: 10,
        // 页码
        page: 1,
      },
    };
  },
  onReady() {
    this.getList();
  },
  // 触底触发
  onReachBottom() {
    this.getList();
  },
  // 下拉刷新
  onPullDownRefresh() {
    // 正常情况下接口返回应该很会很快。故意延迟调用，让用户有在刷新的体验感
    setTimeout(() => {
      this.ajax.page = 1;
      this.leftHeight = 0;
      this.rightHeight = 0;
      this.ajax.load = true;
      this.getList();
    }, 800);
  },
  created() {
    //获取手机系统信息
    const systemInfo = uni.getSystemInfoSync();
    console.log("[systemInfo]", systemInfo);
    //获取状态栏信息-h5没有状态栏
    this.statusBarHeight = systemInfo.statusBarHeight;
    //屏幕的宽度
    this.navBarWidth = systemInfo.windowWidth;
    //获取胶囊信息:uni.getMenuButtonBoundingClientRect-->App | H5 | 支付宝小程序不支持
    // #ifndef H5 || APP-PLUS || MP-ALIPAY
    const menuButtonBoundingInfo = uni.getMenuButtonBoundingClientRect();
    console.log("[胶囊信息]", menuButtonBoundingInfo);
    // (胶囊底部高度-状态栏的高度)+(胶囊顶部高度-状态栏的高度)*2=导航栏的高度
    this.navBarHeight =
      (menuButtonBoundingInfo.top - systemInfo.statusBarHeight) * 2 +
      (menuButtonBoundingInfo.bottom - systemInfo.statusBarHeight);
    // #endif
  },
  // 方法
  methods: {
    // 点击列表
    listClick(id) {
      uni.navigateTo({
        url: "/pages/clientDitch/marketingDetails?id=" + id,
      });
    },
    // 返回上一夜
    handLeToBack() {
      uni.navigateBack();
    },
    //返回首页
    handLeDemo() {
      uni.navigateTo({
        url: "/pages/demo/demo",
      });
    },
    change() {},

    // ---
    // 监听高度变化
    onHeight(height, tag) {
      if (tag == "left") {
        this.leftHeight += height;
      } else {
        this.rightHeight += height;
      }
    },
    // 组件点击事件
    onClick(index, tag) {
      console.log(index, tag);
      // 对应的数据
      if (tag == "left") {
        console.log(this.leftList[index]);
      } else {
        console.log(this.rightList[index]);
      }
      let direction = {
        left: "左",
        right: "右",
      };
      uni.showToast({
        title: `${direction[tag]}侧列表第${index + 1}个被点击`,
        icon: "none",
      });
    },
    // 获取数据
    getList() {
      /* 
					无真实数据，当前由 setTimeout 模拟异步请求、
					自行替换 请求方法将数据 传入 addList() 方法中
					自行解决数据格式，自行修改组件内布局和内容绑定
				*/
      if (!this.ajax.load) {
        return;
      }
      this.ajax.load = false;
      this.ajax.loadTxt = "加载中";

      setTimeout(() => {
        // 生成随机数方法
        let random = (min = 0, max) => {
          return Math.floor(Math.random() * max) + min;
        };
        // 待选的图片数据
        let imgs = [];
        // 待选的标题数据
        let titles = [
          "桃花坞里桃花庵，桃花庵里桃花仙；",
          "桃花仙人种桃树，又摘桃花卖酒钱。",
          "酒醒只在花前坐，酒醉还来花下眠；半醒半醉日复日，花落花开年复年。",
          "但愿老死花酒间，不愿鞠躬车马前；",
          "车尘马足富者趣，酒盏花枝贫者缘。若将富贵比贫贱，",
          "一在平地一在天；若将贫贱比车马，他得驱驰我得闲。",
          "别人笑我太疯癫，我笑他人看不穿；不见五陵豪杰墓，无花无酒锄作田。",
        ];

        let res = [];
        for (let i = 0; i < 10; i++) {
          res.push({
            url: `/static/${random(0, 3)}.jpg`,
            title: titles[random(0, titles.length)],
            money: random(9, 9999),
            label: "官方自营",
            shop: "唐诗三百首旗舰店",
            store: "店铺名字",
          });
        }
        this.addList(res);
      }, 1000);
    },
    addList(res) {
      // 获取到的数据，请注意数据结构
      console.log(res);

      if (!res || res.length < 1) {
        this.ajax.loadTxt = "没有更多了";
        return;
      }

      // 左右列表高度的差
      let differ = this.leftHeight - this.rightHeight;
      // 计算差值，用于确定优先插入那一边
      let differVal = 0;

      // 初始化左右列表的数据
      let i = differ > 0 ? 1 : 0;

      let [left, right] = [[], []];

      // 获取插入的方向
      let getDirection = (index) => {
        /* 左侧高度大于右侧超过 600px 时，则前3条数据都插入到右边 */
        if (differ >= 600 && index < 3) {
          differVal = 1;
          return "right";
        }

        /* 右侧高度大于左侧超过 600px 时，则前3条数据都插入到左边 */
        if (differ <= -600 && index < 3) {
          differVal = -1;
          return "left";
        }

        /* 左侧高度大于右侧超过 350px 时，则前2条数据都插入到右边 */
        if (differ >= 350 && index < 2) {
          return "right";
        }
        /* 右侧高度大于左侧超过 350px 时，则前2条数据都插入到左边 */
        if (differ <= -350 && index < 2) {
          differVal = -1;
          return "left";
        }

        /* 当前数据序号为偶数时，则插入到左边 */
        if ((i + differVal) % 2 == 0) {
          return "left";
        } else {
          /* 当前数据序号为奇数时，则插入到右边 */
          return "right";
        }
      };

      // 将数据源分为左右两个列表，容错差值请自行根据项目中的数据情况调节
      res.forEach((item, index) => {
        if (getDirection(index) == "left") {
          //console.log(`差值：${differ},方向：left，序号${index}`)
          left.push(item);
        } else {
          //console.log(`差值：${differ},方向：right，序号${index}`)
          right.push(item);
        }
        i++;
      });

      // 将左右列表的数据插入，第一页时则覆盖
      if (this.ajax.page == 1) {
        this.leftList = left;
        this.rightList = right;
        uni.stopPullDownRefresh();
      } else {
        this.leftList = [...this.leftList, ...left];
        this.rightList = [...this.rightList, ...right];
      }

      this.ajax.load = true;
      this.ajax.loadTxt = "上拉加载更多";
      this.ajax.page++;
    },
  },
};
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}

.navBar {
  .navBar-fixed {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    box-sizing: border-box;
    background-color: #0a0e1d;

    .navBar-content {
      color: #fefefe;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
}

//瀑布流
.pubuItem {
  column-count: 2;
  column-gap: 20rpx;
}

.item-masonry {
  box-sizing: border-box;
  border-radius: 15rpx;
  overflow: hidden;
  background-color: #fff;
  break-inside: avoid;
  /*避免在元素内部插入分页符*/
  box-sizing: border-box;
}

// .item-masonry image {
// 	width: 335rpx;
// }
.av-item {
  width: 374rpx;
}

.listtitle {
  font-size: 24rpx;

  .listtitle1 {
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 54rpx;
  }

  .listtitle2 {
    color: #ff0000;
    font-size: 32rpx;
    font-weight: bold;
  }

  .listtitle3 {
    border: 1rpx solid #fb2a44;
    height: 30rpx;
    line-height: 30rpx;
    display: inline-block;
  }
}

.item .name {
  display: flex;
  padding: 10rpx 10rpx 10rpx 5rpx;
  align-items: center;
  font-family: "PingFang SC-Medium";
  background: #f6f7fb;
}

.name image {
  flex: 0 0 auto;
}

.item-title-box {
  display: flex;
  position: relative;
}

.name-title {
  flex: 1;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.name text:last-child {
  color: #c4c4c4;
  line-height: 10rpx;
}

.item-ava {
  width: 70rpx !important;
  height: 70rpx;
}

.Index {
  width: 100%;
  height: 100%;
}

.flex {
  display: flex;
}

.waterfall-box {
  box-sizing: border-box;

  > view {
    padding: 0 10rpx;
  }
}

.h-flex-x {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;

  &.h-flex-2 {
    > view {
      width: 50%;
    }
  }
}

.load-txt {
  padding: 0 0 20rpx 0;
  text-align: center;
  color: #999;
  font-size: 24rpx;
}

.title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.label {
  display: inline;
}
.nav__img {
  width: 133rpx;
  height: 48rpx;
}
</style>
