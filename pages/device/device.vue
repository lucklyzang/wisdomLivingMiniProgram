<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="top-area-box">
			<image :src="loginBackgroundPng"></image>
			<view class="operation-area">
				<view class="operation-top-area">
					<view class="image-area">
						<image :src="messageIconPng" @click="enterMessagePageDetails"></image>
						<image :src="addDeviceIconPng" @click="addDeviceEvent"></image>
					</view>
					<view class="dropdown-area">
						<xfl-select
							:list="familyMemberList"
							:clearable="false"
							:showItemNum="8"
							 @change="familyMemberChange"
							placeholder = "请选择家庭"
							:selectHideType="'hideAll'"
							:initValue="familyMemberList[0]['value']"
						>
						</xfl-select>
					</view>
				</view>
			</view>
			<view class="cut-title-area">
				<text v-for="(item,index) in tabCutList" :class="{'activeTabStyle' : tabCutActiveIndex == index }" @click="tabCutEvent(item,index)" :key="index">{{ item }}</text>
			</view>
		</view>
		<view class="center-content-area" v-if="tabCutActiveIndex == 0">
			<u-empty text="暂无数据" v-if="isShowNoDeviceData"></u-empty>
			<view class="device-content-area">
				<view class="device-list" v-for="(item,index) in deviceList" :key="index" @click="enterDeviceDetails(item)">
					<view class="device-top">
						<view class="device-top-left">
							<image :src="imageUrl"></image>
							<text>{{ item.roomName }}</text>
						</view>
						<view class="device-top-right">
							<text>{{ item.onLine ? '在线' : '离线' }}</text>
						</view>
					</view>
					<view class="device-bottom">
						<text>
							{{ item.deviceName }}
						</text>
					</view>
				</view>
			</view>
		</view>
		<view class="center-content-area center-content-area-one" v-if="tabCutActiveIndex == 1">
			<view class="room-content-area">
				<view class="room-list-wrapper">
					<u-empty text="暂无数据" v-if="isShowNoRoomData"></u-empty>
					<view class="room-list" v-for="(item,index) in roomList" :key="index" @click="enterRoomDetails(item)">
						<view class="room-left">
							<view class="room-left-top">
								<text>{{ item.name }}</text>
								<text>{{ `${item.deviceRespVOList.length}个设备` }}</text>
							</view>
							<view class="room-left-bottom">
								<image :src="imageUrl"></image>
								<image :src="imageUrl"></image>
							</view>
						</view>
						<view class="room-right">
							<u-icon name="arrow-right" color="#737373" size="30"></u-icon>
						</view>
					</view>
				</view>
				<view class="room-management" @click="roomManagementEvent">
					<text>房间管理</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import xflSelect from '@/components/xfl-select/xfl-select.vue';
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import { getUserDeviceMessage, getUserRoomDevices, getUserFamilyList } from '@/api/user.js'
	import {
		setCache,
		removeAllLocalStorage
	} from '@/common/js/utils'
	export default {
		components: {
			xflSelect
		},
		data() {
			return {
				infoText: '',
				showLoadingHint: false,
				initValue: null,
				isShowNoDeviceData: false,
				isShowNoRoomData: false,
				familyMemberList: [],
				tabCutList: ['设备','房间'],
				deviceList: [],
				imageUrl: require("@/static/img/room-icon.png"),
				roomList: [],
				tabCutActiveIndex: 0,
				loginBackgroundPng: require("@/static/img/login-background.png"),
				messageIconPng: require("@/static/img/message-icon.png"),
				addDeviceIconPng: require("@/static/img/add-device-icon.png")
			}
		},
		onLoad() {
			this.queryUserFamilyList()
		},
		computed: {
			...mapGetters([
				'userInfo',
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
		methods: {
			...mapMutations([
				'changeOverDueWay',
				'changeEnterDeviceSetPageSource',
				'changeEnterFamilyManagementPageSource',
				'changeFamilyId',
				'changeBeforeAddDeviceMessage',
				'changeBeforeAddBodyDetectionDeviceMessage',
				'changeBeforeAddExistPerceptionRadarCompleteSet',
				'changeBeforeAddSignMonitorRadarCompleteSet',
				'changeRoomDetails'
			]),
			
			// 家庭选择下拉框下拉选择确定事件
			familyMemberChange (val) {
				this.tabCutActiveIndex = 0;
				if (val.orignItem.isClickNoEffect) {
					uni.redirectTo({
						url: '/generalSetPackage/pages/familyManagement/familyManagement'
					});
					this.changeEnterFamilyManagementPageSource('/pages/device/device')
				} else {
					this.initValue = val.orignItem.id;
					this.getUserDevice(this.initValue)
				}
			},
			
			// 家庭下拉框下拉确定事件
			chooseFamilyMemberEvent () {
			},
			
			// tab切换点击事件
			tabCutEvent (item,index) {
				this.tabCutActiveIndex = index;
				if (index == 0) {
					this.getUserDevice(this.initValue)
				} else if (index == 1) {
					this.getUserRoom(this.initValue)
				}
			},
			
			// 获取用户设备信息
			getUserDevice (familyId) {
				this.deviceList = [];
				this.showLoadingHint = true;
				this.isShowNoDeviceData = false;
				this.infoText = '加载中...';
				getUserDeviceMessage({familyId}).then((res) => {
					if ( res && res.data.code == 0) {
						if ( res.data.data.length > 0) {
							this.deviceList = res.data.data
						} else {
							this.isShowNoDeviceData = true
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
						title: err,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			// 获取用户房间信息
			getUserRoom (familyId) {
				this.showLoadingHint = true;
				this.infoText = '加载中...';
				this.isShowNoRoomData = false;
				getUserRoomDevices({familyId}).then((res) => {
					if ( res && res.data.code == 0) {
						if ( res.data.data.length > 0) {
							this.roomList = res.data.data
						} else {
							this.isShowNoRoomData = true
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
						title: err,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			// 获取用户家庭列表
			queryUserFamilyList () {
				this.familyMemberList = [];
				getUserFamilyList().then((res) => {
					if ( res && res.data.code == 0) {
						for (let item of res.data.data) {
							this.familyMemberList.push({
								id: item.id,
								value: item.name
							})
						};
						this.initValue = this.familyMemberList[0]['id'];
						this.getUserDevice(this.initValue)
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error',
							position: 'bottom'
						})
					};
					this.familyMemberList.push({
						iconPath: require("@/static/img/family-management-icon.png"),
						value: '家庭管理',
						isClickNoEffect: true
					})
				})
				.catch((err) => {
					this.$refs.uToast.show({
						title: err,
						type: 'error',
						position: 'bottom'
					});
					this.familyMemberList.push({
						iconPath: require("@/static/img/family-management-icon.png"),
						value: '家庭管理',
						isClickNoEffect: true
					})
				})
			},
			
			// 房间管理事件
			roomManagementEvent () {
				uni.redirectTo({
					url: '/devicePackage/pages/roomManagement/roomManagement'
				});
				this.changeFamilyId(this.initValue)
			},
			
			// 进入消息详情页
			enterMessagePageDetails () {
				uni.redirectTo({
					url: '/devicePackage/pages/device/index/index'
				})
			},
			
			// 进入设备详情事件
			// 1-体征雷达，2-存在感知雷达，3-跌倒雷达，4-人体检测雷达
			enterDeviceDetails (item) {
				if (item.type == 3) {
					uni.redirectTo({
						url: '/devicePackage/pages/tumbleRadarCompleteSet/completeSet'
					});
					// 保存进入设备设置界面的设备部分相关信息
					let temporaryMessage = this.beforeAddDeviceMessage;
					temporaryMessage['roomId'] = item.roomId;
					temporaryMessage['roomName'] = item.roomName;
					temporaryMessage['deviceId'] = item.deviceId;
					temporaryMessage['customDeviceName'] = item.customName;
					temporaryMessage['deviceName'] = item.deviceName;
					temporaryMessage['onLine'] = item.onLine;
					this.changeBeforeAddDeviceMessage(temporaryMessage);
				} else if (item.type == 2) {
					uni.redirectTo({
						url: '/devicePackage/pages/existPerceptionRadarCompleteSet/completeSet'
					});
					// 保存进入设备设置界面的设备部分相关信息
					let temporaryMessage = this.beforeAddExistPerceptionRadarCompleteSet;
					temporaryMessage['roomId'] = item.roomId;
					temporaryMessage['roomName'] = item.roomName;
					temporaryMessage['deviceId'] = item.deviceId;
					temporaryMessage['customDeviceName'] = item.customName;
					temporaryMessage['deviceName'] = item.deviceName;
					temporaryMessage['onLine'] = item.onLine;
					this.changeBeforeAddExistPerceptionRadarCompleteSet(temporaryMessage);
				} else if (item.type == 1) {
					// 保存进入设备设置界面的设备部分相关信息
					let temporaryMessage = this.beforeAddSignMonitorRadarCompleteSet;
					temporaryMessage['roomId'] = item.roomId;
					temporaryMessage['roomName'] = item.roomName;
					temporaryMessage['deviceId'] = item.deviceId;
					temporaryMessage['customDeviceName'] = item.customName;
					temporaryMessage['deviceName'] = item.deviceName;
					temporaryMessage['onLine'] = item.onLine;
					this.changeBeforeAddSignMonitorRadarCompleteSet(temporaryMessage);
					uni.redirectTo({
						url: '/devicePackage/pages/signMonitorRadarCompleteSet/completeSet'
					})
				} else if (item.type == 4) {
					uni.redirectTo({
						url: '/devicePackage/pages/bodyDetectionRadarCompleteSet/completeSet'
					});
					//保存进入设备设置界面的设备部分相关信息
					let temporaryMessage = this.beforeAddBodyDetectionDeviceMessage;
					temporaryMessage['roomId'] = item.roomId;
					temporaryMessage['roomName'] = item.roomName;
					temporaryMessage['deviceId'] = item.deviceId;
					temporaryMessage['customDeviceName'] = item.customName;
					temporaryMessage['deviceName'] = item.deviceName;
					temporaryMessage['onLine'] = item.onLine;
					this.changeBeforeAddBodyDetectionDeviceMessage(temporaryMessage);
				};
				this.changeEnterDeviceSetPageSource('/pages/device/device')
			},
			
			// 进入房间详情事件
			enterRoomDetails (item) {
				this.changeRoomDetails(item);
				uni.redirectTo({
					url: '/devicePackage/pages/roomDetails/roomDetails'
				})
			},
			
			// 添加设备事件
			addDeviceEvent () {
				// 清除以前保存的设置房间和自定义设备名称信息
				this.changeBeforeAddDeviceMessage({});
				this.changeBeforeAddBodyDetectionDeviceMessage({});
				this.changeBeforeAddExistPerceptionRadarCompleteSet({});
				this.changeBeforeAddSignMonitorRadarCompleteSet({});
				uni.redirectTo({
					url: '/devicePackage/pages/addDevices/addDevices'
				});
				this.changeFamilyId(this.initValue)
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
		@include content-wrapper
		.top-area-box {
			position: relative;
			width: 100%;
			height: 230px;
			> image {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 230px
			};
			.operation-area {
				width: 90%;
				margin: 0 auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				z-index: 1;
				margin-top: 44px;
				position: relative;
				.operation-top-area {
					width: 100%;
					display: flex;
					align-items: center;
					.image-area {
						image {
							width: 29px;
							height: 29px;
							&:first-child {
								margin-right: 20px
							}
						}
					};
					.dropdown-area {
						width: 100px;
						transform: translateX(50%);
						::v-deep .show-box {
							border: none !important;
							color: #fff !important;
							background: transparent !important;
							.input {
								@include no-wrap;
								display: inline-block;
								line-height: 42px;
								padding-right: 4px;
								box-sizing: border-box;
								text-align: center !important;
							};
							.list {
								color: #101010;
							};
							.list-container {
								width: 150px !important;
								top: -10px;
								.popper__arrow {
									display: none !important;
								}
							};
							.placeholder {
								color: #fff !important
							};
							.right-arrow {
								color: #fff !important
							}
						}
					}
				}
			};
			.cut-title-area {
				width: 30%;
				margin: 0 auto;
				font-size: 14px;
				color: #898C8C;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 40px;
				.activeTabStyle {
					font-size: 16px !important;
					color: #fff !important
				}
			}
		};
		.center-content-area {
			width: 98%;
			margin: 0 auto;
			flex: 1;
			overflow: auto;
			position: relative;
			::v-deep .u-empty {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%)
			};
			.device-content-area {
				width: 98%;
				padding: 10px;
				overflow: auto;
				box-sizing: border-box;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.device-list {
					width: 47%;
					height: 102px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-bottom: 10px;
					border-radius: 10px;;
					box-shadow: 0px 2px 6px 0 rgba(0, 0, 9, 0.1);
					padding: 6px 10px;
					box-sizing: border-box;
					.device-top {
						display: flex;
						justify-content: space-between;
						.device-top-left {
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							>image {
								width: 34px;
								height: 42px;
							};
							>text {
								font-size: 12px;
								color: #BBBBBB
							}
						};
						.device-top-right {
							>text {
								font-size: 14px;
								color: #BBBBBB
							};
							.onLineStyle {
								coloe: #0079FF !important
							}
						}
					};
					.device-bottom {
						@include no-wrap;
						text {
							font-size: 14px;
							color: #101010
						}
					}
				}
			};
			.room-content-area {
				width: 98%;
				height: 100%;
				padding: 10px;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				position: relative;
				z-index: 1000;
				flex-grow: 0;
				.room-list-wrapper {
					flex: 1;
					overflow: auto;
					.room-list {
						display: flex;
						height: 110px;
						justify-content: space-between;
						margin-bottom: 10px;
						border-radius: 10px;;
						box-shadow: 0px 2px 6px 0 rgba(0, 0, 9, 0.1);
						padding: 10px;
						box-sizing: border-box;
						background: #fff;
						.room-left {
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							.room-left-top {
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								>text {
									&:first-child {
										font-size: 14px;
										color: #101010;
										margin-bottom: 4px;
									};
									&:last-child {
										font-size: 12px;
										color: #BBBBBB
									}
								}
							};
							.room-left-bottom {
								>image {
									width: 34px;
									height: 42px;
									margin-right: 4px
								}
							}
						};
						.room-right {
							display: flex;
							align-items: center;
						}
					}
				};
				.room-management {
					margin: 0 auto;
					width: 98%;
					height: 55px;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 10px;
					box-shadow: 0px 1px 6px 0 rgba(0, 0, 9, 0.1);
					font-size: 14px;
					color: #101010
				}	
			}
		};
		.center-content-area-one {
			margin-top: -40px !important
		}
	}
</style>

