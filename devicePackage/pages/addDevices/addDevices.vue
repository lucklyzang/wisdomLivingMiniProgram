<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="" @backClick="backTo">
				<slot name="default">
					<image :src="scanIconPng" @click="scanCodeEvent"></image>
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
					<image src="https://blink-radar.oss-cn-chengdu.aliyuncs.com/3131a72d2618fe9c61c413fb5e357fb45a9e80e16df605585da4773fd5ddf4c1.gif"></image>
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
					<view class="device-list" v-for="(item,index) in scanCodeDeviceList" :key="index" @click="chooseWifiEvent(item)">
						<image src="https://blink-radar.oss-cn-chengdu.aliyuncs.com/7cfa8d18868aae3fd6cdc63b13418ff702db65cad6a4ac1cb8e53ac66b7f5c98.png"></image>
						<text>{{ item.name }}</text>
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
	import { checkDeviceIsExist } from '@/api/device.js'
	import navBar from "@/components/zhouWei-navBar"
	export default {
		components: {
			navBar
		},
		data() {
			return {
				infoText: '',
				showLoadingHint: false,
				scanCodeDeviceList: [],
				scanIconPng: require("@/static/img/scan-icon.png"),
				questionCircleIconPng: require("@/static/img/question-circle-icon.png")
			}
		},
		onLoad (object) {
		},
		computed: {
			...mapGetters([
				'userInfo',
				'familyId',
				'beforeAddDeviceMessage',
				'beforeAddExistPerceptionRadarCompleteSet',
				'beforeAddSignMonitorRadarCompleteSet',
				'beforeAddBodyDetectionDeviceMessage'
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
				'changeOverDueWay',
				'changeBeforeAddDeviceMessage',
				'changeBeforeAddExistPerceptionRadarCompleteSet',
				'changeBeforeAddSignMonitorRadarCompleteSet',
				'changeBeforeAddBodyDetectionDeviceMessage',
				'changeCurrentDeviceType'
			]),
			
			backTo () {
				uni.switchTab({
					url: '/pages/device/device'
				})
			},
			
			// 选择wifi事件
			chooseWifiEvent (item) {
				this.changeCurrentDeviceType(item.type);
				// 1-体征雷达，2-存在感知雷达，3-跌倒雷达，4-人体检测雷达
				if (item.type == 3) {
					// 保存进入设备设置界面的设备部分相关信息
					let temporaryMessage = this.beforeAddDeviceMessage;
					temporaryMessage['deviceId'] = item.id;
					temporaryMessage['deviceCode'] = item.sn;
					temporaryMessage['deviceName'] = item.name;
					temporaryMessage['onLine'] = item.onLine;
					this.changeBeforeAddDeviceMessage({});
					this.changeBeforeAddDeviceMessage(temporaryMessage);
				} else if (item.type == 2) {
					// 保存进入设备设置界面的设备部分相关信息
					let temporaryMessage = this.beforeAddExistPerceptionRadarCompleteSet;
					temporaryMessage['deviceId'] = item.id;
					temporaryMessage['deviceCode'] = item.sn;
					temporaryMessage['deviceName'] = item.name;
					temporaryMessage['onLine'] = item.onLine;
					this.changeBeforeAddExistPerceptionRadarCompleteSet({});
					this.changeBeforeAddExistPerceptionRadarCompleteSet(temporaryMessage);
				} else if (item.type == 1) {
					// 保存进入设备设置界面的设备部分相关信息
					let temporaryMessage = this.beforeAddSignMonitorRadarCompleteSet;
					temporaryMessage['deviceId'] = item.id;
					temporaryMessage['deviceCode'] = item.sn;
					temporaryMessage['deviceName'] = item.name;
					temporaryMessage['onLine'] = item.onLine;
					this.changeBeforeAddSignMonitorRadarCompleteSet({});
					this.changeBeforeAddSignMonitorRadarCompleteSet(temporaryMessage);
				} else if (item.type == 4) {
					//保存进入设备设置界面的设备部分相关信息
					let temporaryMessage = this.beforeAddBodyDetectionDeviceMessage;
					temporaryMessage['deviceId'] = item.id;
					temporaryMessage['deviceCode'] = item.sn;
					temporaryMessage['deviceName'] = item.name;
					temporaryMessage['onLine'] = item.onLine;
					this.changeBeforeAddBodyDetectionDeviceMessage({});
					this.changeBeforeAddBodyDetectionDeviceMessage(temporaryMessage);
				};
				// 现阶段暂时不能选择wifi,直接进入设置设备名称环节
				// uni.redirectTo({
				// 	url: '/devicePackage/pages/selectWifi/selectWifi'
				// });
				uni.redirectTo({
					url: '/devicePackage/pages/selectWifi/setRoomDeviceName'
				})
			},
			
			// 进入提示页事件
			enterInfoEvent () {
				uni.redirectTo({
					url: '/devicePackage/pages/addDevicesInfo/addDevicesInfo'
				})
			},
			
			// 扫码事件
			scanCodeEvent () {
				let that = this;
				uni.scanCode({
					success: function (res) {
						that.checkDeviceEvent({deviceSn: res.result})
					}
				})
			},
			
			// 校验设备合法性
			checkDeviceEvent (data) {
				this.showLoadingHint = true;
				this.infoText = '校验中...';
				checkDeviceIsExist(data).then((res) => {
					if ( res && res.data.code == 0) {
						if (JSON.stringify(res.data.data) == '{}') {
							this.$refs.uToast.show({
								title: '返回结果为空',
								type: 'error',
								position: 'bottom'
							});
							return
						};
						this.scanCodeDeviceList.push(res.data.data)
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error',
							position: 'bottom'
						})
					};
					this.showLoadingHint = false;
				})
				.catch((err) => {
					this.showLoadingHint = false;
					this.$refs.uToast.show({
						title: err.message,
						type: 'error',
						position: 'bottom'
					})
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
				transform: translateX(-55%) !important;
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



