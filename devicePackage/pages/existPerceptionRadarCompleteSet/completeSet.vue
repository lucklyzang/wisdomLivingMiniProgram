<template>
	<view class="content-box">
		<!-- 协议隐私弹框 -->
		<view class="wifi-list-box">
			<u-popup v-model="wifiListBoxShow" mode="bottom" :mask-close-able="false" height="150px" border-radius="30" :safe-area-inset-bottom="true">
					<view class="top-title">
						<view class="top-title-one">
								<text>存在感知雷达</text>
						</view>
						<view class="top-title-two">
								<text>阅读并同意</text>
								<text>用户政策</text>
								<text>和</text>
								<text>隐私政策</text>
						</view>
					</view>
					<view class="bottom-btn">
						<text @click="refuseEvent">拒绝</text>
						<text @click="agreeEvent">同意</text>
					</view>
			</u-popup>
		</view>
		<!-- 报警接受方式弹框 -->
		<view class="accept-alarm-method-box">
			<u-popup v-model="cceptAlarmMethodBoxShow" mode="bottom" border-radius="30" :safe-area-inset-bottom="true">
					<view class="top-title-name-area">
						<text>请选择接收有/无人告警方式</text>
					</view>
					<view class="accept-alarm-method-list-wrapper">
						<view class="accept-alarm-method-list" v-for="(item,index) in acceptAlarmMethodList" @click="alarmMethodEvent(item,index)" :key="index">
							<text :class="{'textMethodStyle':currentIndex === index}">{{ item }}</text>
						</view>
					</view>
					<view class="cancel-btn">
						<text @click="cancelChooseEvent">取消</text>
					</view>
			</u-popup>
		</view>
		<u-toast ref="uToast" />
		<y-toast ref="ytoast"></y-toast>
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" @backClick="backTo">
				<slot name="default">
					<image :src="logIconPng" @click="logEvent"></image>
					<image :src="moreIconPng" @click="moreEvent"></image>
				</slot>
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="content-top-area">
				<view class="top-title">
					<image :src="existPerceptionRadarPng"></image>
					<view class="title-text">
						<text>{{ beforeAddExistPerceptionRadarCompleteSet.customDeviceName }}</text>
						<text>{{ beforeAddExistPerceptionRadarCompleteSet.roomName }}</text>
					</view>
				</view>
			</view>
			<view class="center-content-area">
				<view class="alarm-type alarm-range">
					<view class="alarm-type-left">
						<text>报警范围设置</text>
					</view>
					<view class="alarm-type-right" @click="alarmRangeEvent">
						<text>{{ alarmRangeValue }}</text>
						<u-icon name="arrow-right" size="40" color="#0E2442"></u-icon>
					</view>
				</view>	
				<view class="alarm-type">
					<view class="alarm-type-left">
						<text>接收报警方式</text>
					</view>
					<view class="alarm-type-right" @click="acceptAlarmMethodEvent">
						<text>{{ acceptAlarmMethod }}</text>
						<u-icon name="arrow-right" size="40" color="#0E2442"></u-icon>
					</view>
				</view>
			</view>
			<view class="bottom-btn-area">
				<text :class="{'btnStyle' : alarmRangeValue && acceptAlarmMethod}" @click="updateRadarSet">保存</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import yToast from "@/components/y-toast/y-toast.vue"
	import navBar from "@/components/zhouWei-navBar"
	import { getExistAlarmSettings, updateExistAlarmSettings } from '@/api/device.js'
	export default {
		components: {
			navBar,
			yToast
		},
		data() {
			return {
				infoText: '',
				currentIndex: null,
				showLoadingHint: false,
				alarmRangeValue: '',
				acceptAlarmMethod: '',
				// acceptAlarmMethodList: ['不通知','仅短信通知','仅电话通知','电话+短信'],
				acceptAlarmMethodList: ['不通知','短信通知'],
				wifiListBoxShow: false,
				cceptAlarmMethodBoxShow: false,
				alarmRangeValueList: [],
				enter: false,
				leave: false,
				stop: false,
				nobody: false,
				stopTime: '',
				nobodyTime: '',
				deviceNumber: '',
				deviceSetBasicMessage: {},
				existPerceptionRadarPng: 'https://blink-radar.oss-cn-chengdu.aliyuncs.com/6df5309bc390298f360f8a87790f1a1bea54c1a8fe651c5aa689776d6d04ee5f.png',
				logIconPng: require("@/static/img/log-icon.png"),
				moreIconPng: require("@/static/img/more-icon.png")
			}
		},
		
		onShow(){
			// 接收uni.navigateBack返回时的参数
			uni.$on('update', (object) => {
				// 获取雷达设置
				this.getRadarSet(this.beforeAddExistPerceptionRadarCompleteSet.deviceId);
				if (!object.hasOwnProperty('transmitData')) { 
					if (this.enterDeviceSetPageSource == '/devicePackage/pages/selectWifi/setDeviceName') {
						this.wifiListBoxShow = true;
						return
					}
				};
				if (object.transmitData == 1) { return };
				if (this.enterDeviceSetPageSource == '/devicePackage/pages/selectWifi/setDeviceName') {
					this.wifiListBoxShow = true
				}
			})
		},
		
		onLoad (object) {
			this.getRadarSet(this.beforeAddExistPerceptionRadarCompleteSet.deviceId);
			if (!object.hasOwnProperty('transmitData')) { 
				if (this.enterDeviceSetPageSource == '/devicePackage/pages/selectWifi/setDeviceName') {
					this.wifiListBoxShow = true;
					return
				}
			};
			if (object.transmitData == 1) { return };
			if (this.enterDeviceSetPageSource == '/devicePackage/pages/selectWifi/setDeviceName') {
				this.wifiListBoxShow = true
			}
		},
		
		computed: {
			...mapGetters([
				'userInfo',
				'enterDeviceSetPageSource',
				'beforeAddExistPerceptionRadarCompleteSet'
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
				'changeBeforeAddExistPerceptionRadarCompleteSet'
			]),
			
			// 设备接收报警方式转换
			alarmTypeTransition (num) {
				switch(num) {
						case '不通知' :
							return 0
							break;
						case '短信通知' :
							return 1
							break;
						case '仅电话通知' :
							return 2
							break;
						case '电话+短信' :
							return 3
							break;
						case '微信通知' :
							return 4
							break;
				}
			},
			
			// 设备接收报警方式转换
			alarmTypeTransitionText (num) {
				let temporaryNum = num.toString();
				switch(temporaryNum) {
						case '0' :
							return '不通知'
							break;
						case '1' :
							return '短信通知'
							break;
						case '2' :
							return '仅电话通知'
							break;
						case '3' :
							return '电话+短信'
							break;
						case '4' :
							return '微信通知'
							break;
				}
			},
			
			// 更新雷达设置
			updateRadarSet () {
				if (!this.alarmRangeValue || !this.acceptAlarmMethod) {
					return
				};
				this.showLoadingHint = true;
				this.infoText = '保存中...';
				updateExistAlarmSettings({
					deviceId: this.beforeAddExistPerceptionRadarCompleteSet.deviceId,
					notice: this.alarmTypeTransition(this.acceptAlarmMethod),
					enter: this.enter,
					leave: this.leave,
					stop: this.stop,
					nobody: this.nobody,
					stopTime: this.stop ? this.stopTime : '',
					nobodyTime: this.nobody ? this.nobodyTime : ''
				}).then((res) => {
					if ( res && res.data.code == 0) {
						this.$refs['ytoast'].show({ message: '保存成功!', type: 'success' });
						let temporaryMessage = this.beforeAddExistPerceptionRadarCompleteSet;
						temporaryMessage['isSaveAlarmRanageInfo'] = false;
						this.changeBeforeAddExistPerceptionRadarCompleteSet(temporaryMessage);
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
			
			// 获得雷达设置
			getRadarSet (deviceId) {
				this.showLoadingHint = true;
				this.infoText = '加载中...';
				this.alarmRangeValueList = [];
				getExistAlarmSettings({deviceId}).then((res) => {
					if ( res && res.data.code == 0) {
						this.deviceNumber = res.data.data.sn;
						this.acceptAlarmMethod = this.alarmTypeTransitionText(res.data.data.notice);
						if (res.data.data.enter) {
							this.enter = true;
							this.alarmRangeValueList.push('人员进入报警')
						} else {
							this.enter = false
						};
						if (res.data.data.leave) {
							this.leave = true;
							this.alarmRangeValueList.push('人员离开报警')
						} else {
							this.leave = false
						};
						if (res.data.data.stop) {
							this.stop = true;
							this.stopTime = res.data.data.stopTime
							this.alarmRangeValueList.push('人员滞留报警')
						} else {
							this.stop = false
						};
						// if (res.data.data.nobody) {
						// 	this.nobody = true;
						// 	this.nobodyTime = res.data.data.nobodyTime
						// 	this.alarmRangeValueList.push('无人报警')
						// } else {
						// 	this.nobody = false
						// };
						this.alarmRangeValue = this.alarmRangeValueList.join("、");
						this.deviceSetBasicMessage = res.data.data;
						// 回显保存的报警范围设置信息
						if (this.beforeAddExistPerceptionRadarCompleteSet['isSaveAlarmRanageInfo']) {
							this.echoAlarmRanageMessage()
						};
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
			
			// 回显报警范围设置页面设置的报警范围信息
			echoAlarmRanageMessage () {
				this.alarmRangeValueList = [];
				if (this.beforeAddExistPerceptionRadarCompleteSet.enter) {
					this.enter = true;
					this.alarmRangeValueList.push('人员进入报警')
				} else {
					this.enter = false
				};
				if (this.beforeAddExistPerceptionRadarCompleteSet.leave) {
					this.leave = true;
					this.alarmRangeValueList.push('人员离开报警')
				} else {
					this.leave = false
				};
				if (this.beforeAddExistPerceptionRadarCompleteSet.stop) {
					this.stop = true;
					this.stopTime = this.beforeAddExistPerceptionRadarCompleteSet.stopTime
					this.alarmRangeValueList.push('人员滞留报警')
				} else {
					this.stop = false
				};
				// if (this.beforeAddExistPerceptionRadarCompleteSet.nobody) {
				// 	this.nobody = true;
				// 	this.nobodyTime = this.beforeAddExistPerceptionRadarCompleteSet.nobodyTime
				// 	this.alarmRangeValueList.push('无人报警')
				// } else {
				// 	this.nobody = false
				// };
				this.alarmRangeValue = this.alarmRangeValueList.join("、");
				this.deviceSetBasicMessage = this.beforeAddExistPerceptionRadarCompleteSet
			},
			
			
			// 拒绝事件
			refuseEvent () {
				this.backTo()
			},
			
			// 同意事件
			agreeEvent () {
				this.wifiListBoxShow = false
			},
			
			// 日志点击事件
			logEvent () {
				uni.navigateTo({
					url: '/devicePackage/pages/existPerceptionRadarCompleteSet/logRecord'
				})
			},
			
			// 更多点击事件
			moreEvent () {
				let temporaryMessage = this.beforeAddExistPerceptionRadarCompleteSet;
				temporaryMessage['deviceNumber'] = this.deviceNumber;
				this.changeBeforeAddExistPerceptionRadarCompleteSet(temporaryMessage);
				uni.navigateTo({
					url: '/devicePackage/pages/existPerceptionRadarCompleteSet/editDevice'
				})
			},
			
			
			// 报警范围点击事件
			alarmRangeEvent () {
				let temporaryMessage = this.beforeAddExistPerceptionRadarCompleteSet;
				temporaryMessage['isSaveAlarmRanageInfo'] = false;
				this.changeBeforeAddExistPerceptionRadarCompleteSet(temporaryMessage);
				// 传递报警范围信息
				let mynavData = JSON.stringify(this.deviceSetBasicMessage);
				uni.navigateTo({
					url: '/devicePackage/pages/existPerceptionRadarCompleteSet/alarmRangeSet?transmitData='+mynavData
				})
			},
			
			// 接收报警方式点击事件
			acceptAlarmMethodEvent () {
				this.cceptAlarmMethodBoxShow = true
			},
			
			// 报警方式点击事件
			alarmMethodEvent (item,index) {
				this.currentIndex = index;
				this.acceptAlarmMethod = item;
				this.cceptAlarmMethodBoxShow = false
			},
			
			// 取消选择接收报警方式事件
			cancelChooseEvent () {
				this.cceptAlarmMethodBoxShow = false
			},
			
			backTo () {
				if (this.enterDeviceSetPageSource == '/pages/device/device') {
					uni.switchTab({
						url: `${this.enterDeviceSetPageSource}`
					})
				} else {
					uni.navigateTo({url: `${this.enterDeviceSetPageSource}`})
				}
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
		// 隐私协议弹框
		.wifi-list-box {
			::v-deep .u-drawer {
				.u-drawer-content {
					padding: 20px 40px;
					box-sizing: border-box;
					// .uni-scroll-view-content {
					// 	display: flex;
					// 	flex-direction: column;
						.top-title {
							flex: 1;
							display: flex;
							flex-direction: column;
							align-items: center;
							margin-bottom: 10px;
							.top-title-one {
								>text {
									font-size: 18px;
									color: rgba(16, 16, 16, 1);
								}
							};
							.top-title-two {
								margin-top: 10px;
								>text {
									font-size: 14px;
									color: rgba(14, 36, 66, 0.56);
									&:nth-child(even) {
										color: blue
									}
								}
							}
						};
						.bottom-btn {
							display: flex;
							justify-content: space-between;
							align-items: center;
							>text {
								display: inline-block;
								width: 40%;
								height: 40px;
								text-align: center;
								line-height: 40px;
								border-radius: 20px;
								&:first-child {
									background: rgba(136, 136, 136, 0.63);
									color: #101010
								};
								&:last-child {
									background: rgba(17, 209, 131, 1);
									color: #fff
								}
							}
						}
					// }
				}
			}		
		};
		// 报警接受方式弹框
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
		.nav {
			width: 100%;
			background: #fff;
			::v-deep .header_title_center {
				left: 240px !important;
				transform: translateX(-55%) !important;
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
			width: 100%;
			flex: 1;
			display: flex;
			flex-direction: column;
			.content-top-area {
				width: 100%;
				display: flex;
				padding: 16px;
				box-sizing: border-box;
				flex-direction: column;
				.top-title {
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					>image {
						width: 210px;
						height: 137px;
						margin-bottom: 5px
					};
					.title-text {
						width: 100%;
						text-align: center;
						@include no-wrap;
						>text {
							font-size: 20px;
							color: #101010;
							&:first-child {
							};
							&:last-child {
								width: 100px;
								margin-left: 6px;
								font-size: 14px;
								margin-top: 6px;
							}
						}
					}
				}
			};
			.center-content-area {
				background: #f5f5f5;
				width: 100%;
				flex: 1;
				padding: 16px;
				box-sizing: border-box;
				margin-top: 10px;
				overflow: auto;
				.alarm-range {
					margin-bottom: 10px;
					width: 100%;
				};
				.alarm-type {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 46px;
					background: #fff;
					padding: 0 6px;
					box-sizing: border-box;
					.alarm-type-left {
						width: 100px;
							>text {
								font-size: 16px;
								color: #101010
							}
					};
					.alarm-type-right {
						display: flex;
						justify-content: flex-end;
						align-items: center;
						flex: 1;
						width: 0;
						>text {
							flex: 1;
							margin-right: 2px;
							padding-left: 6px;
							text-align: right;
							box-sizing: border-box;
							@include no-wrap;
							font-size: 16px;
							color: #888888
						};
						::v-deep .u-icon {
							margin-top: 2px;
							width: 20px;
						}
					}
				}
			};
			.bottom-btn-area {
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
					background: #BBBBBB;
					color: #fff
				};
				.btnStyle {
					background: #11D183 !important;
				}
			}
		}
	}
</style>






