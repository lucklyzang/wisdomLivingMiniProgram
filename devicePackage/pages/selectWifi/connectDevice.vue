<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="content-top-title">
				<text>连接设备</text>
			</view>
			<view class="content-center">
				<image :src="deviceIconPng"></image>
				<view>
					<text>15%</text>
				</view>
				<view>
					<u-loading mode="flower" size="45"></u-loading>
					<text>网络连接中</text>
				</view>
				<view>
					<text @click="testTo">
						请将设备尽量靠近路由器
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import navBar from "@/components/zhouWei-navBar"
	export default {
		components: {
			navBar
		},
		data() {
			return {
				infoText: '',
				showLoadingHint: false,
				deviceIconPng: 'https://blink-radar.oss-cn-chengdu.aliyuncs.com/ac6c559f47eb9cb4a36146fa85b73ab897227911f333d9aa83449650dfdca5df.png'
			}
		},
		onLoad (object) {
			
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
		methods: {
			...mapMutations([
				'changeOverDueWay'
			]),
			
			
			testTo () {
				uni.redirectTo({
					url: '/devicePackage/pages/selectWifi/setRoomDeviceName'
				})
			},
			
			backTo () {
				uni.redirectTo({
					url: '/devicePackage/pages/selectWifi/selectWifi'
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
			padding: 0 16px 16px 16px;
			box-sizing: border-box;
			flex: 1;
			display: flex;
			flex-direction: column;
			.content-top-title {
				height: 44px;
				display: flex;
				align-items: center;
				font-size: 22px;
				color: #101010
			};
			.content-center {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				>image {
					width: 88px;
					height: 107px
				};
				>view {
					&:nth-of-type(1) {
						font-size: 18px;
						color: #101010;
						margin: 10px 0;
					};
					&:nth-of-type(2) {
						display: flex;
						align-items: center;
						>text {
							font-size: 18px;
							color: #101010;
							margin-left: 6px
						}
					};
					&:nth-of-type(3) {
						margin-top: 10px;
						font-size: 14px;
						color: #656565
					}				
				}
			}
		}
	}
</style>


