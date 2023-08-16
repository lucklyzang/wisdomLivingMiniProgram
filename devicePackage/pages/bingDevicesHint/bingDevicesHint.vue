<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="content-area">
			<view class="content-top">
				<!-- <view class="device-binding">
					<image :src="deviceBindingGif"></image>
				</view> -->
			<!-- 	<view class="device-success">
					<image :src="deviceBindSuccessPng"></image>
				</view> -->
				<view class="device-fail">
					<image :src="deviceBindFailPng"></image>
				</view>
				<text>绑定中</text>
			</view>
			<view class="content-bottom">
				<text @click="backTo">返回</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		components: {
		},
		data() {
			return {
				infoText: '',
				showLoadingHint: false,
				deviceBindingGif: require("@/static/img/device-binding.gif"),
				deviceBindSuccessPng: require("@/static/img/device-bind-success.png"),
				deviceBindFailPng: require("@/static/img/device-bind-fail.png")
			}
		},
		onReady() {
		},
		computed: {
			...mapGetters([
				'userInfo'
			]),
			userName() {
			},
			proId() {
			},
			proName() {
			},  
			workerId() {
			},
			depName() {
			},
			accountName() {
			}
		},
		mounted() {
		},
		methods: {
			...mapMutations([
				'changeOverDueWay'
			]),
			
			backTo () {
				uni.redirectTo({
					url: '/devicePackage/pages/bingDevices/bingDevices'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "~@/common/stylus/variable.scss";
	page {
		width: 100%;
		height: 100%;
	};
	.content-box {
		@include content-wrapper;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		::-webkit-scrollbar {
			width: 0;
			height: 0;
			background-color: transparent;
		}
		.content-area {
			padding: 16px;
			box-sizing: border-box;
			height: 100%;
			display: flex;
			flex-direction: column;
			.content-top {
				height: 55vh;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: flex-end;
				.device-binding {
					>image {
						width: 175px;
						height: 175px
					}
				};
				.device-success {
					>image {
						width: 94px;
						height: 94px
					}
				};
				.device-fail {
					>image {
						width: 71px;
						height: 71px
					}
				}
				>text {
					margin-top: 40px;
					font-size: 18px;
					color: #101010
				}
			};
			.content-bottom {
				height: 45vh;
				display: flex;
				align-items: center;
				justify-content: center;
				>text {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 319px;
					height: 55px;
					border: 1px solid #11D183;
					border-radius: 28px;
					color: #11D183;
					font-size: 18px;
				}
			}
		}
	}
</style>

