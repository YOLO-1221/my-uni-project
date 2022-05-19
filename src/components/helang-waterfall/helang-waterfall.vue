<template>
	<view class="waterfall-item" @tap="onTap">
		<image :src="params.url" mode="widthFix" @load="emitHeight" @error="emitHeight"></image>
		<view class="content">
			<view class="title">{{params.title}}</view>
			<view class="money">{{params.money}}元</view>
			<view style="margin: 0 0 8rpx 0;">
				<text class="label">{{params.label}}</text>
			</view>
			<view class="shop-name">{{params.shop}}</view>
			<view class="flex justify-between align-center bg-grey padding-tb-xs padding-lr-xs radius-3">
				<view class="store flex justify-start align-center">
					<image src="../../static/0.jpg" mode="aspectFill" class="waterfall-box-img"></image>
					<view class="padding-left-xs">
						<view class="waterfall-box-title text-cut">
							{{params.store}}
						</view>
						<view class="text-xs text-cut waterfall-box-titles">
							sss
						</view>
					</view>
				</view>
				<view class="">
					<u-icon name="arrow-right" color="#8E8E99" size="12"></u-icon>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		name: "helang-waterfall",
		props: {
			params: {
				type: Object,
				default () {
					return {}
				}
			},
			tag: {
				type: String | Number,
				default: ''
			},
			index: {
				type: Number,
				default: -1
			}
		},
		data() {
			return {

			};
		},
		methods: {
			// 发出组件高度信息，在此处可以区分正确和错误的加载，给予错误的提示图片
			emitHeight(e) {
				const query = uni.createSelectorQuery().in(this);
				query.select('.waterfall-item').boundingClientRect(data => {
					let height = Math.floor(data.height);
					this.$emit("height", height, this.$props.tag);
				}).exec();
			},
			onTap() {
				this.$emit("click", this.$props.index, this.$props.tag);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.waterfall-item {
		padding: 16rpx;
		background-color: #fff;
		border-radius: 4px;
		font-size: 28rpx;
		color: #666;
		margin-bottom: 20rpx;

		image {
			display: block;
			width: 100%;
			// 默认设置一个图片的大约值
			height: 350rpx;
		}

		.waterfall-box-img {
			width: 70rpx;
			height: 70rpx;
		}

		.waterfall-box-title {
			width: 26vw;
		}

		.waterfall-box-titles {
			width: 26vw;
		}

		.content {
			margin-top: 16rpx;

			.money {
				color: #fa3534;
				margin-top: 8rpx;
			}

			.label {
				border: 1rpx solid #fa3534;
				color: #fa3534;
				font-size: 20rpx;
				padding: 0 10rpx;
				border-radius: 3rpx;
			}

			.shop-name {
				font-size: 20rpx;
				color: #999;
			}
		}
	}
</style>
