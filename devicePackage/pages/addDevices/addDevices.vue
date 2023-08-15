<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="" @backClick="backTo">
				<slot name="default">
					<image :src="scanIconPng"></image>
					<image :src="questionCircleIconPng" @click="enterInfoEvent"></image>
				</slot>
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="add-device-area">
				<view>
					<text>添加设备</text>
				</view>
				<view>
					<image :src="searchForIconPng"></image>
					<text>自动搜寻附近设备中…</text>
					<text>部分设备需Wi-Fi扫描，请开启WLAN</text>
				</view>
				<view>
					<text @click="goOpenEvent">去开启</text>
				</view>
			</view>
			<view class="manual-add-device-area">
				<view class="manual-add-device-title">
					<text>手动添加设备</text>
				</view>
				<view class="device-list-area">
					<view class="device-list">
						<image :src="imageUrl" ></image>
						<text>跌倒监测雷达</text>
					</view>
					<view class="device-list">
						<image :src="imageUrl" ></image>
						<text>跌倒监测雷达</text>
					</view>
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
				scanIconPng: require("@/static/img/scan-icon.png"),
				questionCircleIconPng: require("@/static/img/question-circle-icon.png"),
				searchForIconPng: require("@/static/img/search-for-icon.gif"),
				imageUrl: require("@/static/img/room-icon.png")
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
				uni.switchTab({
					url: '/pages/device/device'
				})
			},
			
			// 进入提示页事件
			enterInfoEvent () {
				uni.redirectTo({
					url: '/devicePackage/pages/addDevicesInfo/addDevicesInfo'
				})
			},
			
			// 去开启事件
			goOpenEvent () {
				uni.redirectTo({
					url: '/devicePackage/pages/goOpen/goOpen'
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
		.nav {
			width: 100%;
			background: #fff;
			::v-deep .header_title_center {
				left: 240px !important;
				>image {
					width: 24px;
					height: 24px;
					&:first-child {
						margin-right: 14px
					}
				}
			}
		};
		.content-area {
			padding: 16px;
			flex: 1;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			.add-device-area {
				display: flex;
				flex-direction: column;
				@include bottom-border-1px(#BBBBBB);
				>view {
					&:nth-child(1) {
						color: #101010;
						font-size: 20px
					};
					&:nth-child(2) {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						>image {
							width: 140px;
							height: 140px
						};
						>text {
							&:nth-of-type(1) {
								margin-top: 20px;
								color: #101010;
								font-size: 14px
							};
							&:nth-of-type(2) {
								color: #656565;
								font-size: 14px;
								margin-top: 4px;
							}
						}
					};
					&:nth-child(3) {
						height: 80px;
						display: flex;
						align-items: center;
						justify-content: center;
						text {
							display: inline-block;
							width: 72px;
							height: 26px;
							line-height: 26px;
							text-align: center;
							color: #fff;
							border-radius: 4px;
							font-size: 12px;
							background: #11D183;
						}
					}
				}
			};
			.manual-add-device-area {
				margin-top: 10px;
				display: flex;
				flex: 1;
				flex-direction: column;
				.manual-add-device-title {
					height: 40px;
					line-height: 40px;
					color: #656565;
					font-size: 14px;
				};
				.device-list-area {
					flex: 1;
					overflow: auto;
					display: flex;
					flex-wrap: wrap;
					flex-shrink: 0;
					justify-content: space-between;
					align-content: flex-start;
					.device-list {
						margin-bottom: 10px;
						padding: 4px;
						border-radius: 10px;
						box-shadow: 0px 2px 6px 0 rgba(0, 0, 9, 0.1);
						display: flex;
						align-items: center;
						box-sizing: border-box;
						width: 48%;
						height: 51px;
						>image {
							width: 38px;
							height: 46px;
							margin-right: 10px
						};
						>text {
							color: #101010;
							font-size: 14px;
						}
					}
				}
			}
		}
	}
</style>



