
<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="房间详情" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="room-name">
				<text>{{ this.roomName }}</text>
			</view>
			<view class="content-bottom">
				<view class="devices-list" @click="enterDeviceEvent(item)" v-for="(item,index) in deviceList" :key="index">
					<view class="list-top">
						<view class="list-top-left">
							<image :src="deviceIconPng"></image>
						</view>
						<view class="list-top-right">
							<text :class="{'onLineStyle' : item.onLine }">{{ item.onLine ? '在线' : '离线' }}</text>
						</view>
					</view>
					<view class="list-bottom">
						<text>{{ roomName }}</text>
						<text>{{ item.customName }}</text>
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
				roomName: '',
				roomId: '',
				deviceIconPng: 'https://blink-radar.oss-cn-chengdu.aliyuncs.com/7cfa8d18868aae3fd6cdc63b13418ff702db65cad6a4ac1cb8e53ac66b7f5c98.png',
				showLoadingHint: false,
				deviceList: []
			}
		},
		onLoad() {
			this.roomName = this.roomDetails['name'];
			this.roomId = this.roomDetails['roomId'];
			this.deviceList = this.roomDetails['deviceRespVOList'];
			console.log('房间信息',this.roomDetails)
		},
		computed: {
			...mapGetters([
				'userInfo',
				'roomDetails',
				'beforeAddDeviceMessage',
				'beforeAddBodyDetectionDeviceMessage',
				'beforeAddExistPerceptionRadarCompleteSet',
				'beforeAddSignMonitorRadarCompleteSet'
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
				'changeEnterDeviceSetPageSource',
				'changeBeforeAddDeviceMessage',
				'changeBeforeAddBodyDetectionDeviceMessage',
				'changeBeforeAddExistPerceptionRadarCompleteSet',
				'changeBeforeAddSignMonitorRadarCompleteSet'
			]),
			
			// 进入设备事件
			// 1-体征雷达，2-存在感知雷达，3-跌倒雷达，4-人体检测雷达
			enterDeviceEvent (item) {
				console.log('房间详情',item);
				if (item.type == 3) {
					uni.redirectTo({
						url: '/devicePackage/pages/tumbleRadarCompleteSet/completeSet'
					});
					// 保存进入设备设置界面的设备部分相关信息
					let temporaryMessage = this.beforeAddDeviceMessage;
					temporaryMessage['roomId'] = this.roomId;
					temporaryMessage['roomName'] = this.roomName;
					temporaryMessage['deviceId'] = item.deviceId;
					temporaryMessage['id'] = item.id;
					temporaryMessage['customDeviceName'] = item.customName;
					temporaryMessage['deviceName'] = item.name;
					temporaryMessage['onLine'] = item.onLine;
					this.changeBeforeAddDeviceMessage(temporaryMessage);
				} else if (item.type == 2) {
					uni.redirectTo({
						url: '/devicePackage/pages/existPerceptionRadarCompleteSet/completeSet'
					});
					// 保存进入设备设置界面的设备部分相关信息
					let temporaryMessage = this.beforeAddExistPerceptionRadarCompleteSet;
					temporaryMessage['roomId'] = this.roomId;
					temporaryMessage['roomName'] = this.roomName;
					temporaryMessage['deviceId'] = item.id;
					temporaryMessage['customDeviceName'] = item.customName;
					temporaryMessage['deviceName'] = item.name;
					temporaryMessage['onLine'] = item.onLine;
					this.changeBeforeAddExistPerceptionRadarCompleteSet(temporaryMessage);
				} else if (item.type == 1) {
					// 保存进入设备设置界面的设备部分相关信息
					let temporaryMessage = this.beforeAddSignMonitorRadarCompleteSet;
					temporaryMessage['roomId'] = item.roomId;
					temporaryMessage['roomName'] = this.roomName;
					temporaryMessage['deviceId'] = item.deviceId;
					temporaryMessage['customDeviceName'] = item.customName;
					temporaryMessage['deviceName'] = item.name;
					temporaryMessage['onLine'] = item.onLine;
					this.changeBeforeAddSignMonitorRadarCompleteSet(temporaryMessage);
					uni.redirectTo({
						url: '/devicePackage/pages/signMonitorRadarCompleteSet/completeSet'
					})
				} else if (item.type == 4) {
					uni.redirectTo({
						url: '/devicePackage/pages/bodyDetectionRadarCompleteSet/completeSet'
					});
					// 保存进入设备设置界面的设备部分相关信息
					let temporaryMessage = this.beforeAddBodyDetectionDeviceMessage;
					temporaryMessage['roomId'] = item.roomId;
					temporaryMessage['roomName'] = this.roomName;
					temporaryMessage['deviceId'] = item.deviceId;
					temporaryMessage['customDeviceName'] = item.customName;
					temporaryMessage['deviceName'] = item.name;
					temporaryMessage['onLine'] = item.onLine;
					this.changeBeforeAddBodyDetectionDeviceMessage(temporaryMessage);
				};
				this.changeEnterDeviceSetPageSource('/devicePackage/pages/roomDetails/roomDetails')
			},
			
			backTo () {
				uni.switchTab({
					url: '/pages/device/device'
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
			width: 100%;
			flex: 1;
			padding: 0 10px 10px 10px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			.room-name {
				padding-left: 6px;
				box-sizing: border-box;
				height: 40px;
				display: flex;
				align-items: center;
				font-size: 20px;
				color: #101010;
			};
			.content-bottom {
				flex: 1;
				overflow: auto;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				align-content: flex-start;
				.devices-list {
					width: 48%;
					border-radius: 10px;
					box-shadow: 0px 1px 6px 0 rgba(0, 0, 0, 0.1);
					padding: 6px 16px;
					box-sizing: border-box;
					margin: 10px 0;
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
								color: #BBBBBB
							};
							.onLineStyle {
								coloe: #0079FF !important
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
								font-size: 12px;
								margin-bottom: 4px
							};
							&:last-child {
								font-size: 14px
							};
						}
					}
				}
			}
		}
	}
</style>