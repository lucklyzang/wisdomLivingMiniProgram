<template>
	<view class="content-box">
		<!-- 解绑设备弹框 -->
		<view class="unbind-device-box">
			<u-popup v-model="unbindDeviceShow" mode="center" length="80%" border-radius="10" :closeable="true">
				<view class="info-title">
					<image :src="exclamationPointPng"></image>
					<text>提示</text>
				</view>
				<view class="info-content">
					<text>是否确认解绑该设备</text>
				</view>
				<view class="btn-area">
					<text @click="unbindDeviceCancelEvent">否</text>
					<text @click="unbindDeviceSureEvent">是</text>
				</view>
			</u-popup>
		</view>
		<!-- 设备房间弹框 -->
		<view class="accept-alarm-method-box">
			<u-popup v-model="chooseRoomShow" mode="bottom" border-radius="30" :safe-area-inset-bottom="true">
					<view class="top-title-name-area">
						<text>请选择设备房间</text>
					</view>
					<view class="accept-alarm-method-list-wrapper">
						<view class="accept-alarm-method-list" v-for="(item,index) in roomList" @click="roomNameClickEvent(item,index)" :key="index">
							<text :class="{'textMethodStyle':currentIndex === index}">{{ item.name }}</text>
						</view>
					</view>
					<view class="cancel-btn">
						<text @click="cancelChooseEvent">取消</text>
					</view>
			</u-popup>
		</view>
		<!-- 网络状态弹框 -->
		<view class="accept-alarm-method-box network-box">
			<u-popup v-model="networkShow" mode="bottom" border-radius="30" :safe-area-inset-bottom="true">
					<view class="top-title-name-area">
						<text>网络状态</text>
					</view>
					<view class="accept-alarm-method-list-wrapper">
						<view class="accept-alarm-method-list">
							<text>WLAN名称</text>
							<text>china-Ts</text>
						</view>
						<view class="accept-alarm-method-list">
							<text>WLAN强度</text>
							<text>98%</text>
						</view>
					</view>
					<view class="cancel-btn">
						<text @click="networkBackEvent">返回</text>
					</view>
			</u-popup>
		</view>
		<u-toast ref="uToast" />
		<y-toast ref="ytoast"></y-toast>
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="更多" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="set-list-area">
				<view class="set-list">
					<view class="set-list-left">
						<text>设备编号</text>
					</view>
					<view class="set-list-right">
						<text>{{ deviceNumber }}</text>
					</view>
				</view>
				<view class="set-list">
					<view class="set-list-left">
						<text>设备</text>
					</view>
					<view class="set-list-right">
						<text>{{ deviceName }}</text>
					</view>
				</view>
				<view class="set-list edit-device-name">
					<view class="set-list-left">
						<text>名称</text>
					</view>
					<view class="set-list-right">
						<u-form ref="uForm">
							<u-form-item>
								<u-input v-model="deviceNameValue" height="50" placeholder="请输入设备名称" />
							</u-form-item>
						</u-form>
					</view>
				</view>
				<view class="set-list">
					<view class="set-list-left">
						<text>操作手册</text>
					</view>
					<view class="set-list-right" @click="operationManualClickEvent">
						<u-icon name="arrow-right" size="40" color="#0E2442"></u-icon>
					</view>
				</view>
				<view class="set-list">
					<view class="set-list-left">
						<text>解绑设备</text>
					</view>
					<view class="set-list-right" @click="unbindDeviceClickEvent">
						<u-icon name="arrow-right" size="40" color="#0E2442"></u-icon>
					</view>
				</view>
				<view class="set-list device-room">
					<view class="set-list-left">
						<text>设备房间</text>
					</view>
					<view class="set-list-right" @click="roomClickEvent">
						<text>{{ roomName }}</text>
						<u-icon name="arrow-right" size="40" color="#0E2442"></u-icon>
					</view>
				</view>
				<view class="set-list device-room">
					<view class="set-list-left">
						<text>网络状态</text>
					</view>
					<view class="set-list-right" @click="networkClickEvent">
						<text>{{ onLine ? '在线' : '离线' }}</text>
						<u-icon name="arrow-right" size="40" color="#0E2442"></u-icon>
					</view>
				</view>
			</view>
			<view class="bottom-btn">
				<text @click="saveEvent">保存</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import { deleteFallAlarmSettings} from '@/api/device.js'
	import { updateUserDeviceBind, getUserRoomList, deleteUserDeviceBind } from '@/api/user.js'
	import navBar from "@/components/zhouWei-navBar"
	import yToast from "@/components/y-toast/y-toast.vue"
	export default {
		components: {
			navBar,
			yToast
		},
		data() {
			return {
				infoText: '',
				exclamationPointPng: require("@/static/img/exclamation-point.png"),
				unbindDeviceShow: false,
				chooseRoomShow: false,
				networkShow: false,
				currentIndex: null,
				roomList: [],
				deviceNameValue: '',
				deviceName: '',
				roomId: '',
				roomName: '',
				deviceNumber: '',
				checked: false,
				showLoadingHint: false,
				onLine: ''
			}
		},
		onLoad(options) {
			this.deviceNameValue = this.beforeAddDeviceMessage.customDeviceName;
			this.deviceName = this.beforeAddDeviceMessage.deviceName;
			this.deviceNumber = this.beforeAddDeviceMessage.deviceNumber;
			this.roomId = this.beforeAddDeviceMessage.roomId;
			this.roomName = this.beforeAddDeviceMessage.roomName;
			this.onLine = this.beforeAddDeviceMessage.onLine
		},
		computed: {
			...mapGetters([
				'userInfo',
				'beforeAddDeviceMessage',
				'familyId'
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
				'changeBeforeAddDeviceMessage'
			]),
			
			// 操作设备点击事件
			operationManualClickEvent () {
				uni.navigateTo({
					url: '/devicePackage/pages/tumbleRadarCompleteSet/operationManual'
				})
			},
			
			// 获取用户房间列表列表
			queryUserRoomList (familyId) {
				this.showLoadingHint = true;
				this.infoText = '加载中...';
				this.roomList = [];
				getUserRoomList({familyId}).then((res) => {
					this.chooseRoomShow = true;
					if ( res && res.data.code == 0) {
						this.roomList = res.data.data
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
						title: err,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			// 更新雷达设置
			updateRadarSet () {
				this.showLoadingHint = true;
				this.infoText = '保存中...';
				updateUserDeviceBind({
					deviceId: this.beforeAddDeviceMessage.deviceId,
					userId: this.userInfo.userId,
					familyId: this.familyId,
					roomId: this.roomId,
					customName: this.deviceNameValue,
					id: this.beforeAddDeviceMessage.id
				}).then((res) => {
					if ( res && res.data.code == 0) {
						let temporaryMessage = this.beforeAddDeviceMessage;
						temporaryMessage['roomId'] = this.roomId;
						temporaryMessage['roomName'] = this.roomName;
						temporaryMessage['customDeviceName'] = this.deviceNameValue;
						temporaryMessage['deviceName'] = this.deviceName;
						this.changeBeforeAddDeviceMessage(temporaryMessage);
						this.$refs['ytoast'].show({ message: '保存成功!', type: 'success' });
					} else {
						this.$refs['ytoast'].show({ message: '保存失败!', type: 'error' });
					};	
					this.showLoadingHint = false;
				})
				.catch((err) => {
					this.showLoadingHint = false;
					this.$refs['ytoast'].show({ message: '保存失败!', type: 'error' })
				})
			},
			
			// 解绑设备点击事件
			unbindDeviceClickEvent () {
				this.unbindDeviceShow = true
			},
			
			// 删除事件
			deleteEvent (deviceId ) {
				this.showLoadingHint = true;
				this.infoText = '删除中...';
				deleteUserDeviceBind({deviceId}).then((res) => {
					if ( res && res.data.code == 0 && res.data.data) {
						this.$refs.uToast.show({
							title: '删除成功',
							type: 'success',
							position: 'bottom'
						})
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
			
			// 解绑设备取消事件
			unbindDeviceCancelEvent () {
				this.unbindDeviceShow = false
			},
			
			// 解绑设备确定事件
			unbindDeviceSureEvent () {
				this.unbindDeviceShow = false;
				this.deleteEvent(this.beforeAddDeviceMessage.deviceId)
			},
			
			// 保存事件
			saveEvent () {
				this.updateRadarSet()
			},
			
			// 网络状态点击事件
			networkClickEvent () {
				if (!this.onLine) { return };
				this.networkShow = true
			},
			
			// 网络状态返回事件
			networkBackEvent () {
				this.networkShow = false
			},
			
			// 房间点击事件
			roomClickEvent () {
				this.queryUserRoomList(this.familyId)
			},
			
			// 房间名称点击事件
			roomNameClickEvent (item,index) {
				this.currentIndex = index;
				this.chooseRoomShow = false;
				this.roomId = item.id;
				this.roomName = item.name
			},
			
			// 房间取消选择事件
			cancelChooseEvent () {
				this.chooseRoomShow = false
			},
			
			backTo () {
				uni.$emit('update', { transmitData: 1 });
				uni.$off('update');
				uni.navigateBack()
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
		};
		// 解绑设备弹框
		.unbind-device-box {
				::v-deep .u-drawer {
					.u-drawer-content {
						.u-mode-center-box {
							padding-bottom: 20px;
							box-sizing: border-box;
							.u-icon__icon {
								color: #101010 !important
							};
							.info-title {
								height: 30px;
								display: flex;
								justify-content: center;
								text-align: center;
								padding-top: 24px;
								box-sizing: border-box;
								>image {
									vertical-align: middle;
									width: 24px;
									height: 24px;
									margin-right: 10px
								};
								>text {
									font-size: 16px;
									color: #101010;
									vertical-align: middle;
									margin-top: 2px;
								}
							};
							.info-content {
								height: 80px;
								font-size: 14px;
								display: flex;
								justify-content: center;
								align-items: center;
								color: #101010;
								padding-top: 20px;
								box-sizing: border-box;
								>text {
									height: 20px;
								}
							};
							.btn-area {
								width: 80%;
								height: 50px;
								display: flex;
								margin: 0 auto;
								justify-content: space-between;
								align-items: center;
								>text {
									font-size: 14px;
									display: inline-block;
									height: 34px;
									width: 42%;
									text-align: center;
									line-height: 34px;
									border-radius: 7px;
									&:first-child {
										color: #11D183;
										border: 1px solid #11D183;
									};
									&:last-child {
										color: #fff;
										background: #11D183
									}
								}
							}
						}
					}
				}	
		};
		// 房间选择方式弹框
		.accept-alarm-method-box {
			::v-deep .u-drawer {
				.u-drawer-content {
					padding-bottom: 40px;
					box-sizing: border-box;
					.top-title-name-area {
						height: 60px;
						width: 100%;
						font-size: 18px;
						color: #A7A7A3;
						display: flex;
						align-items: center;
						justify-content: center;
						@include bottom-border-1px(#BBBBBB)
					};
					.accept-alarm-method-list-wrapper {
						padding-top: 10px;
						box-sizing: border-box;
						.accept-alarm-method-list {
							text-align: center;
							margin-bottom: 16px;
							>text {
								font-size: 20px;
								color: #101010
							};
							.textMethodStyle {
								color: #11D183 !important
							}
						}
					};
					.cancel-btn {
						width: 100%;
						display: flex;
						height: 80px;
						align-items: center;
						justify-content: center;
						>text {
							width: 80%;
							display: inline-block;
							height: 48px;
							font-size: 18px;
							color: #11D183;
							line-height: 48px;
							text-align: center;
							border-radius: 26px;
							box-shadow: 0px 2px 6px 0px rgba(43, 150, 139, 0.67);
						}
					}
				}
			}		
		};
		// 网络状态弹框
		.network-box {
			::v-deep .u-drawer {
				.u-drawer-content {
					padding-bottom: 40px;
					box-sizing: border-box;
					.accept-alarm-method-list-wrapper {
						padding: 0 0 30px 0;
						box-sizing: border-box;
						.accept-alarm-method-list {
							margin-bottom: 0;
							display: flex;
							height: 60px;
							padding: 0 10px;
							box-sizing: border-box;
							align-items: center;
							justify-content: space-between;
							border-bottom: 1px dashed #BBBBBB;
							>text {
								&:last-child {
									flex: 1;
									font-size: 20px;
									color: #898C8C;
									text-align: right;
									padding-left: 10px;
									@include no-wrap
								}
							}
						}
					}
				}
			}			
		};
		.nav {
			width: 100%;
			background: #fff;
		};
		.content-area {
			width: 100%;
			flex: 1;
			background: #F5F5F5;
			padding: 10px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			.set-list-area {
				flex: 1;
				overflow: auto;
				.set-list {
					padding: 0 6px 0 10px;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 40px;
					background: #fff;
					margin-bottom: 10px;
					.set-list-left {
						font-size: 14px;
						color: #101010;
						>text {
							&:nth-child(2) {
								font-size: 12px;
								color: #888888;
								margin-left: 4px;
								vertical-align: bottom
							}
						}
					};
					.set-list-right {
						flex: 1;
						padding-left: 10px;
						box-sizing: border-box;
						text-align: right;
						@include no-wrap
					}
				};
				.edit-device-name {
					.set-list-right {
						flex: none !important;
						width: 70% !important;
						::v-deep .u-form {
							.u-form-item {
								line-height: 30px !important;
								height: 30px;
								border: 1px solid #BBBBBB;
								border-radius: 4px;
								padding: 2px 8px !important
							}
						}
					}
				};
				.device-room {
					.set-list-right {
						display: flex;
						justify-content: flex-end;
						align-items: center;
						>text {
							margin-right: 2px
						}
					}
				}
			};
			.bottom-btn {
				height: 80px;
				background: #f5f5f5;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				>text {
					font-size: 14px;
					display: inline-block;
					border-radius: 26px;
					width: 60%;
					height: 48px;
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






