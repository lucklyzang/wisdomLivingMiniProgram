<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area" v-if="false">
			<view class="content-top">
				<text>已为您检测到2个睡眠相关雷达</text>
				<text>请选择其中一个进行绑定</text>
			</view>
			<view class="content-bottom">
				<view class="devices-list" @click="bindDeviceEvent">
					<view class="list-top">
						<view class="list-top-left">
							<image :src="deviceIconPng"></image>
						</view>
						<view class="list-top-right">
							<text>在线</text>
						</view>
					</view>
					<view class="list-bottom">
						<text>主卧</text>
						<text>体征监测雷达1</text>
					</view>
				</view>
				<view class="devices-list">
					<view class="list-top">
						<view class="list-top-left">
							<image :src="deviceIconPng"></image>
						</view>
						<view class="list-top-right">
							<text>在线</text>
						</view>
					</view>
					<view class="list-bottom">
						<text>主卧</text>
						<text>体征监测雷达1</text>
					</view>
				</view>
			</view>
		</view>
		<view class="content-no-query-device-area">
			<view class="content-top">
				<view class="no-query-device">
					<image :src="noQueryDevice"></image>
				</view>
				<view class="no-query-device-info">
					<text>未查询到相关雷达!</text>
					<text>您可以安装相关雷达来进行检测</text>
					<text>如有需要请联系我们：15066255815</text>
				</view>
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
	import navBar from "@/components/zhouWei-navBar"
	export default {
		components: {
			navBar
		},
		data() {
			return {
				infoText: '',
				showLoadingHint: false,
				deviceIconPng: require("@/static/img/room-icon.png"),
				noQueryDevice: require("@/static/img/no-query-device.png")
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
			
			// 绑定设备事件
			bindDeviceEvent () {
				uni.redirectTo({
					url: '/devicePackage/pages/bingDevicesHint/bingDevicesHint'
				})
			},
			
			backTo () {
				uni.switchTab({
					url: '/pages/index/index'
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
		};
		.content-area {
			flex: 1;
			padding: 16px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			.content-top {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top: 90px;
				>text {
					font-size: 16px;
					font-weight: bold;
					color: #101010;
					&:first-child {
						margin-bottom: 10px
					}
				}
			};
			.content-bottom {
				flex: 1;
				overflow: auto;
				margin-top: 40px;
				.devices-list {
					width: 175px;
					height: 102px;
					border-radius: 10px;
					box-shadow: 0px 1px 6px 0 rgba(0, 0, 0, 0.1);
					padding: 6px 16px;
					box-sizing: border-box;
					margin-bottom: 16px;
					.list-top {
						display: flex;
						justify-content: space-between;
						.list-top-left {
							>image {
								width: 38px;
								height: 39px
							}
						};
						.list-top-right {
							>text {
								font-size: 14px;
								color: #0079FF
							}
						}
					};
					.list-bottom {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						>text {
							color: #101010;
							&:first-child {
								font-size: 18px;
								margin-bottom: 4px
							};
							&:last-child {
								font-size: 16px
							};
						}
					}
				}
			}
		};
		.content-no-query-device-area {
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
				.no-query-device {
					>image {
						width: 94px;
						height: 94px
					}
				};
				.no-query-device-info {
					margin-top: 40px;
					display: flex;
					flex-direction: column;
					align-items: center;
					>text {
						font-size: 18px;
						color: #101010;
						&:nth-child(2) {
							margin: 8px 0
						};
						&:nth-child(3) {
							font-size: 14px;
						}
					}
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



