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
				<text>设置名称</text>
			</view>
			<view class="content-center">
				<view class="content-center-top">
					<image :src="deviceIconPng"></image>
					<view class="input-area">
						<u-form ref="uForm">
							<u-form-item>
								<u-input v-model="deviceNameValue" height="80" placeholder="请输入设备名称"/>
							</u-form-item>
						</u-form>
					</view>
					<view class="page-area">
						<text>{{ currentPage }}</text>
						<text>/</text>
						<text>{{ totalPage }}</text>
					</view>
				</view>
			</view>
			<view class="bottom-btn">
				<text @click="startExperienceEvent">开始体验</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import { createUserDeviceBind } from '@/api/user.js'
	import navBar from "@/components/zhouWei-navBar"
	export default {
		components: {
			navBar
		},
		data() {
			return {
				infoText: '',
				currentPage: 2,
				deviceNameValue: '',
				totalPage: 2,
				showLoadingHint: false,
				deviceIconPng: require("@/static/img/tumble-radar.png")
			}
		},
		onLoad() {
			// 回显自定义过的设备名称
			// 1-体征雷达，2-存在感知雷达，3-跌倒雷达，4-人体检测雷达
			if (this.currentDeviceType == 3) {
				// 跌倒监测雷达
				if (JSON.stringify(this.beforeAddDeviceMessage) != '{}') {
					let temporaryMessage = this.beforeAddDeviceMessage;
					this.deviceNameValue = this.beforeAddDeviceMessage.customDeviceName
				};
			};
			if (this.currentDeviceType == 4) {
				// 人体检测雷达
				if (JSON.stringify(this.beforeAddBodyDetectionDeviceMessage) != '{}') {
					let temporaryMessage = this.beforeAddBodyDetectionDeviceMessage;
					this.deviceNameValue = this.beforeAddBodyDetectionDeviceMessage.customDeviceName
				};
			};
			if (this.currentDeviceType == 2) {
				// 人员存在感知雷达
				if (JSON.stringify(this.beforeAddExistPerceptionRadarCompleteSet) != '{}') {
					let temporaryMessage = this.beforeAddExistPerceptionRadarCompleteSet;
					this.deviceNameValue = this.beforeAddExistPerceptionRadarCompleteSet.customDeviceName
				};
			};
			if (this.currentDeviceType == 1) {
				// 体征监测雷达
				if (JSON.stringify(this.beforeAddSignMonitorRadarCompleteSet) != '{}') {
					let temporaryMessage = this.beforeAddSignMonitorRadarCompleteSet;
					this.deviceNameValue = this.beforeAddSignMonitorRadarCompleteSet.customDeviceName
				}
			}
		},
		computed: {
			...mapGetters([
				'userInfo',
				'familyId',
				'beforeAddDeviceMessage',
				'beforeAddBodyDetectionDeviceMessage',
				'beforeAddExistPerceptionRadarCompleteSet',
				'beforeAddSignMonitorRadarCompleteSet',
				'currentDeviceType'
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
				'changeOverDueWay',
				'changeEnterDeviceSetPageSource',
				'changeBeforeAddDeviceMessage',
				'changeBeforeAddBodyDetectionDeviceMessage',
				'changeBeforeAddExistPerceptionRadarCompleteSet',
				'changeBeforeAddSignMonitorRadarCompleteSet'
			]),
			
			// 开始体验事件
			// 1-体征雷达，2-存在感知雷达，3-跌倒雷达，4-人体检测雷达
			startExperienceEvent () {
				if (!this.deviceNameValue) {
					this.$refs.uToast.show({
						title: '请输入设备名称',
						type: 'warning',
						position: 'bottom'
					});
					return
				};
				if (this.currentDeviceType == 3) {
					// 绑定跌倒监测雷达
					let temporaryMessage = this.beforeAddDeviceMessage;
					temporaryMessage['customDeviceName'] = this.deviceNameValue;
					this.changeBeforeAddDeviceMessage(temporaryMessage);
					this.bindUser(this.beforeAddDeviceMessage.deviceId,this.beforeAddDeviceMessage.roomId,this.beforeAddDeviceMessage.customDeviceName,this.beforeAddDeviceMessage.deviceCode);
				};
				if (this.currentDeviceType == 4) {
					// 绑定人体检测雷达
					let temporaryMessage = this.beforeAddBodyDetectionDeviceMessage;
					temporaryMessage['customDeviceName'] = this.deviceNameValue;
					this.changeBeforeAddBodyDetectionDeviceMessage(temporaryMessage);
					this.bindUser(this.beforeAddBodyDetectionDeviceMessage.deviceId,this.beforeAddBodyDetectionDeviceMessage.roomId,this.beforeAddBodyDetectionDeviceMessage.customDeviceName,this.beforeAddBodyDetectionDeviceMessage.deviceCode);
				};
				if (this.currentDeviceType == 2) {
					// 绑定人员存在感知雷达
					let temporaryMessage = this.beforeAddExistPerceptionRadarCompleteSet;
					temporaryMessage['customDeviceName'] = this.deviceNameValue;
					this.changeBeforeAddExistPerceptionRadarCompleteSet(temporaryMessage);
					this.bindUser(this.beforeAddExistPerceptionRadarCompleteSet.deviceId,this.beforeAddExistPerceptionRadarCompleteSet.roomId,this.beforeAddExistPerceptionRadarCompleteSet.customDeviceName,this.beforeAddExistPerceptionRadarCompleteSet.deviceCode);
				};
				if (this.currentDeviceType == 1) {
					// 绑定体征监测雷达
					let temporaryMessage = this.beforeAddSignMonitorRadarCompleteSet;
					temporaryMessage['customDeviceName'] = this.deviceNameValue;
					this.changeBeforeAddSignMonitorRadarCompleteSet(temporaryMessage);
					this.bindUser(this.beforeAddSignMonitorRadarCompleteSet.deviceId,this.beforeAddSignMonitorRadarCompleteSet.roomId,this.beforeAddSignMonitorRadarCompleteSet.customDeviceName,this.beforeAddSignMonitorRadarCompleteSet.deviceCode);
				};
				this.changeEnterDeviceSetPageSource('/devicePackage/pages/selectWifi/setDeviceName');
			},
			
			// 设备绑定用户
			bindUser (deviceId,roomId,customName,deviceCode) {
				this.showLoadingHint = true;
				this.infoText = '绑定中...';
				createUserDeviceBind({
					userId: this.userInfo.userId,
					deviceId: deviceId,
					familyId: this.familyId,
					roomId: roomId,
					customName: customName, //用户自定义的设备名称
					deviceCode: deviceCode
				}).then((res) => {
					if ( res && res.data.code == 0) {
						if (this.currentDeviceType == 3) {
							let temporaryMessage = this.beforeAddDeviceMessage;
							temporaryMessage['id'] = res.data.data;
							this.changeBeforeAddDeviceMessage(temporaryMessage);
							uni.redirectTo({
								url: '/devicePackage/pages/tumbleRadarCompleteSet/completeSet'
							})
						};
						if (this.currentDeviceType == 4) {
							let temporaryMessage = this.beforeAddBodyDetectionDeviceMessage;
							temporaryMessage['id'] = res.data.data;
							this.changeBeforeAddBodyDetectionDeviceMessage(temporaryMessage);
							uni.redirectTo({
								url: '/devicePackage/pages/bodyDetectionRadarCompleteSet/completeSet'
							})
						};
						if (this.currentDeviceType == 2) {
							let temporaryMessage = this.beforeAddExistPerceptionRadarCompleteSet;
							temporaryMessage['id'] = res.data.data;
							this.changeBeforeAddExistPerceptionRadarCompleteSet(temporaryMessage);
							uni.redirectTo({
								url: '/devicePackage/pages/existPerceptionRadarCompleteSet/completeSet'
							})
						};
						if (this.currentDeviceType == 1) {
							let temporaryMessage = this.beforeAddSignMonitorRadarCompleteSet;
							temporaryMessage['id'] = res.data.data;
							this.changeBeforeAddSignMonitorRadarCompleteSet(temporaryMessage);
							uni.redirectTo({
								url: '/devicePackage/pages/signMonitorRadarCompleteSet/completeSet'
							})
						}
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error',
							position: 'bottom'
						})
					}	
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
			
			backTo () {
				uni.redirectTo({
					url: '/devicePackage/pages/selectWifi/setRoomDeviceName'
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
				.content-center-top {
					flex: 1;
					display: flex;
					flex-direction: column;
					>image {
						width: 83px;
						height: 100px;
						margin-bottom: 10px;
						margin-top: 4px;
					};
					.input-area {
						flex: 1;
						::v-deep .u-form {
							.u-form-item {
								background: rgba(229, 229, 229, 0.41);
								border-radius: 13px;
								padding: 2px 8px !important
							}
						}
					};
					.page-area {
						display: flex;
						justify-content: center;
						align-items: center;
						>text {
							font-size: 14px;
							color: rgba(14, 36, 66, 0.56)
						}
					}
				}
			};
			.bottom-btn {
				height: 70px;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				>text {
					font-size: 14px;
					display: inline-block;
					border-radius: 26px;
					width: 60%;
					height: 40px;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #11D183;
					color: #fff
				}
			}
		}
	}
</style>




