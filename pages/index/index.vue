<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="top-area">
			<view>	
				<text>健康</text>
			</view>
			<view class="dropdown-area">
				<xfl-select
					:list="familyMemberList"
					:clearable="false"
					:showItemNum="8"
					 @change="familyMemberChange"
					placeholder = "请选择家庭"
					:selectHideType="'hideAll'"
					:initValue="initValue"
				>
				</xfl-select>
			</view>
		</view>
		<view class="banner-area-box">
			<u-swiper :list="bannerList"></u-swiper>
		</view>
		<view class="center-area">
			<u-empty text="暂无数据" v-if="isShowHomeNoData"></u-empty>
			<view class="device-list" v-for="(item,index) in deviceList" :key="index"> 
				<view class="bind-sleep-device-area" v-if="item.type == 0 && !item.hasOwnProperty('devices')">
					<view>
						<text>{{ item.mold == 0 ? item.name : `${item.name}-${item.subtitle}` }}</text>
					</view>
					<view>
						<view>
							<text>{{ `暂无${item.mold == 0 ? item.name : `${item.name}-${item.subtitle}`}数据` }}</text>
						</view>
						<view>
							<text>立即</text>
							<text @click="bindDeviceEvent(1,item)">绑定设备</text>
							<text>获取检测数据</text>
						</view>
					</view>
				</view>
				<view class="bind-sleep-device-area bind-toileting-device-area" v-if="item.type == 1 && !item.hasOwnProperty('devices')">
					<view>
						<text>{{ item.mold == 0 ? item.name : `${item.name}-${item.subtitle}` }}</text>
					</view>
					<view>
						<view>
							<text>{{ `暂无${item.mold == 0 ? item.name : `${item.name}-${item.subtitle}`}数据` }}</text>
						</view>
						<view>
							<text>立即</text>
							<text @click="bindDeviceEvent(2,item)">绑定设备</text>
							<text>获取检测数据</text>
						</view>
					</view>
				</view>
				<view class="bind-sleep-device-area tumble-toileting-device-area" v-if="item.type == 2 && !item.hasOwnProperty('devices')">
					<view>
						<text>{{ item.mold == 0 ? item.name : `${item.name}-${item.subtitle}` }}</text>
					</view>
					<view>
						<view>
							<text>{{ `暂无${item.mold == 0 ? item.name : `${item.name}-${item.subtitle}`}数据` }}</text>
						</view>
						<view>
							<text>立即</text>
							<text @click="bindDeviceEvent(3,item)">绑定设备</text>
							<text>获取检测数据</text>
						</view>
					</view>
				</view>
				<view class="bind-sleep-device-area leave-home-device-area" v-if="item.type == 3 && !item.hasOwnProperty('devices')">
					<view>
						<text>{{ item.mold == 0 ? item.name : `${item.name}-${item.subtitle}` }}</text>
					</view>
					<view>
						<view>
							<text>{{ `暂无${item.mold == 0 ? item.name : `${item.name}-${item.subtitle}`}数据` }}</text>
						</view>
						<view>
							<text>立即</text>
							<text @click="bindDeviceEvent(4,item)">绑定设备</text>
							<text>获取检测数据</text>
						</view>
					</view>
				</view>
				<!-- && item.hasOwnProperty('devices') -->
				<view class="sleep-area-data" v-if="item.type == 0">
					<view class="sleep-data-title">
						<text>{{ item.mold == 0 ? item.name : `${item.name}-${item.subtitle}` }}</text>
						<text>7月8日</text>
						<text class="room-name">主卧</text>
						<text>睡眠8小时、睡眠状态良好</text>
					</view>
					<view class="heart-rate-box">
						<view class="heart-rate-title">
							<view class="heart-rate-title-left">
								<image :src="heartRateIconPng"></image>
								<text>心率 70次/分</text>
								<text>心率正常</text>
							</view>
							<view class="heart-rate-title-right" @click="enterDetailsEvent('心率',item)">
								详情
							</view>
						</view>
						<view class="heart-rate-chart">
							<qiun-data-charts type="column" :chartData="chartData" />
						</view>
					</view>
					<view class="heart-rate-box breathe-box">
						<view class="heart-rate-title">
							<view class="heart-rate-title-left">
								<image :src="breatheIconPng"></image>
								<text>呼吸 16次/分</text>
								<text>呼吸正常</text>
							</view>
							<view class="heart-rate-title-right" @click="enterDetailsEvent('呼吸',item)">
								详情
							</view>
						</view>
						<view class="breathe-chart">
							
						</view>
					</view>
					<view class="heart-rate-box sleep-box">
						<view class="heart-rate-title">
							<view class="heart-rate-title-left">
								<image :src="sleepSmallIconPng"></image>
								<text>睡眠 7小时45分钟</text>
								<text></text>
							</view>
							<view class="heart-rate-title-right" @click="enterDetailsEvent('睡眠',item)">
								详情
							</view>
						</view>
						<view class="sleep-chart">
							
						</view>
					</view>
				</view>
				<!-- && item.hasOwnProperty('devices') -->
				<view class="sleep-area-data toilet-area-data" v-if="item.type == 1">
					<view class="sleep-data-title">
						<text>{{ item.mold == 0 ? item.name : `${item.name}-${item.subtitle}` }}</text>
						<text>7月8日</text>
						<text class="room-name">卫生间</text>
						<text>入厕两次</text>
					</view>
					<view class="heart-rate-box">
						<view class="heart-rate-title">
							<view class="heart-rate-title-left">
								<image :src="toiletIconPng"></image>
								<text>平均入厕时间 15分钟</text>
								<text>入厕时间正常</text>
							</view>
							<view class="heart-rate-title-right" @click="enterDetailsEvent('入厕',item)">
								详情
							</view>
						</view>
						<view class="toilet-chart">
							<qiun-data-charts type="column" :chartData="chartData" />
						</view>
					</view>
				</view>
				<!-- && item.hasOwnProperty('devices') -->
				<view class="sleep-area-data tumble-area-data" v-if="item.type == 2">
					<view class="sleep-data-title">
						<text>{{ item.mold == 0 ? item.name : `${item.name}-${item.subtitle}` }}</text>
						<text>7月8日</text>
						<text class="room-name">主卧、客厅</text>
						<text>跌倒一次</text>
					</view>
					<view class="heart-rate-box">
						<view class="heart-rate-title">
							<view class="heart-rate-title-left">
								<image :src="tumbleIconPng"></image>
								<text>跌倒1次</text>
								<text>已自行站起</text>
							</view>
							<view class="heart-rate-title-right" @click="enterDetailsEvent('跌倒',item)">
								详情
							</view>
						</view>
						<view class="tumble-chart">
							<qiun-data-charts type="column" :chartData="chartData" />
						</view>
					</view>
				</view>
				<!-- && item.hasOwnProperty('devices') -->
				<view class="sleep-area-data leave-home-area-data" v-if="item.type == 3">
					<view class="sleep-data-title">
						<text>{{ item.mold == 0 ? item.name : `${item.name}-${item.subtitle}` }}</text>
						<text>7月8日</text>
						<text class="room-name">主卧、客厅</text>
					</view>
					<view class="heart-rate-box">
						<view class="heart-rate-title">
							<view class="heart-rate-title-left">
								<image :src="leaveHomeIconPng"></image>
								<text>最近离家时间</text>
								<text>22：37</text>
							</view>
							<view class="heart-rate-title-right" @click="enterDetailsEvent('离家和回家',item)">
								详情
							</view>
						</view>
						<view class="leave-home-chart">	
							<qiun-data-charts type="column" :chartData="chartData" />
						</view>
					</view>
				</view>
			</view>	
		</view>	
		<view class="bottom-area">
			<text @click="editDataCardEvent">编辑数据卡片</text>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import xflSelect from '@/components/xfl-select/xfl-select.vue'
	import { getHomePageList } from '@/api/home.js' 
	import { getUserBannerList } from '@/api/user.js'
	import { sleepStatisticsHome } from '@/api/device.js'
	import _ from 'lodash'
	export default {
		components: {
			xflSelect
		},
		data() {
			return {
				infoText: '',
				initValue: null,
				bannerList: [],
				showLoadingHint: false,
				isShowHomeNoData: false,
				heartRateIconPng: require("@/static/img/heart-rate-icon.png"),
				breatheIconPng: require("@/static/img/breathe-icon.png"),
				toiletIconPng: require("@/static/img/toilet-icon.png"),
				tumbleIconPng: require("@/static/img/tumble-icon.png"),
				leaveHomeIconPng: require("@/static/img/leave-home-icon.png"),
				sleepSmallIconPng: require("@/static/img/sleep-small-icon.png"),
				familyMemberList: [],
				deviceList: [],
				sceneDataList: [],
				chartData: {}
			}
		},
		onUnload() {
		},
		 onReady() {
		    this.getServerData();
		  },
		onLoad() {
			this.queryHomePageList(this.familyId);
			this.queryUserBannerList();
			this.initFamilyInfo()
		},
		computed: {
			...mapGetters([
				'userInfo',
				'familyId',
				'familyMessage',
				'currentNeedBindDevicesMessage'
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
				'changeFamilyId',
				'changeCurrentNeedBindDevicesMessage',
				'changeDeviceDataMessage'
			]),
			
			 getServerData() {
			      //模拟从服务器获取数据时的延时
			      setTimeout(() => {
			        let res = {
			            categories: ["2016","2017","2018","2019","2020","2021"],
			            series: [
			              {
			                name: "目标值",
			                data: [35,36,31,33,13,34]
			              },
			              {
			                name: "完成量",
			                data: [18,27,21,24,6,28]
			              }
			            ]
			          };
			        this.chartData = JSON.parse(JSON.stringify(res));
			      }, 500);
			    },
			
			// 家庭选择下拉框下拉选择确定事件
			familyMemberChange (val) {
				this.tabCutActiveIndex = 0;
				this.initValue = val.orignItem.value;
				this.changeFamilyId(val.orignItem.id)
			},
			
			// 格式化时间
			getNowFormatDate(currentDate) {
				let currentdate;
				let strDate = currentDate.getDate();
				let seperator1 = "-";
				let seperator2 = ":";
				let month = currentDate.getMonth() + 1;
				let hour = currentDate.getHours();
				let minutes = currentDate.getMinutes();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				};
				if (hour >= 0 && hour <= 9) {
					hour = "0" + hour;
				};
				if (minutes >= 0 && minutes <= 9) {
					minutes = "0" + minutes;
				};
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				};
				currentdate = currentDate.getFullYear() + seperator1 + month + seperator1 + strDate
				return currentdate
			},
			
			// 格式化时间(带中文)
			getNowFormatDateText(currentDate) {
				let currentdate;
				let strDate = currentDate.getDate();
				let seperator1 = "月";
				let seperator2 = "日";
				let month = currentDate.getMonth() + 1;
				let hour = currentDate.getHours();
				currentdate = month + seperator1 + strDate + seperator2
				return currentdate
			},
			
			// 获取睡眠日数据
			querySleepDayDataList (data,deviceId) {
				sleepStatisticsHome(data).then((res) => {
					if ( res && res.data.code == 0) {
						let temporaryData = {
							deviceId,
							content: res.data.data
						};
						this.sceneDataList.push(temporaryData)
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error',
							position: 'bottom'
						})
					}
				})
				.catch((err) => {
					this.$refs.uToast.show({
						title: err,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			// 获取首页banner列表
			queryUserBannerList () {
				this.showLoadingHint = true;
				this.infoText = '加载中...';
				this.bannerList = [];
				getUserBannerList().then((res) => {
					if ( res && res.data.code == 0) {
						if (res.data.data.length > 0) {
							for (let item of res.data.data) {
								this.bannerList.push({
									image: item.picUrl,
									title: item.title
								})
							}
						}
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
			
			// 获取首页配置列表
			queryHomePageList (familyId) {
				this.showLoadingHint = true;
				this.infoText = '加载中...';
				this.deviceList = [];
				getHomePageList({familyId}).then((res) => {
					if ( res && res.data.code == 0) {
						this.deviceList = res.data.data.filter((item) => { return item.status == 0 });
						console.log('设备数据',this.deviceList);
						if (this.deviceList.length == 0) {
							this.isShowHomeNoData = true
						} else {
							this.questSceneDataQueue(this.deviceList);
							this.isShowHomeNoData = false
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
						title: err,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			// 请求场景数据队列
			questSceneDataQueue (data) {
				data.forEach((item,index,array) => {
					// 有设备的场景进行请求数据
					if (item.hasOwnProperty('devices')) {
						// 0-睡眠,1-如厕,2-跌倒,3-离/回家
						if (item.type == 0) {
							this.requestSleepDeviceStatisticsData(item.id)
						}
					}
				})
			},
			
			// 为绑定设备的场景请求设备统计日数据(睡眠场景)
			requestSleepDeviceStatisticsData (deviceId) {
				this.querySleepDayDataList({
					deviceId,
					startDate: this.getNowFormatDate(new Date()),
					endDate: this.getNowFormatDate(new Date())
				},deviceId)
			},
			
			// 初始家庭信息
			initFamilyInfo () {
				this.familyMemberList = [];
				this.familyMemberList = _.cloneDeep(this.familyMessage.familyMemberList);
				if (this.familyId) {
					this.initValue = this.familyMessage.familyMemberList.filter((el) => { return el.id == this.familyId })[0]['value'];
				} else {
					this.initValue = this.familyMemberList[0]['value']
				}
			},
			
			// 绑定设备事件
			bindDeviceEvent (type,item) {
				// 睡眠:1-体征雷达,入厕:2-存在感知雷达,跌倒:3-跌倒监测雷达,离回家:4-人体检测雷达
				let temporaryMessage = this.currentNeedBindDevicesMessage;
				temporaryMessage['type'] = type;
				temporaryMessage['content'] = item;
				this.changeCurrentNeedBindDevicesMessage(temporaryMessage);
				uni.redirectTo({
					url: '/devicePackage/pages/bingDevices/bingDevices'
				})
			},
			
			// 进入数据详情事件
			enterDetailsEvent (text,item) {
				if (text == '心率') {
					uni.redirectTo({
						url: '/healthMonitoringPackage/pages/heartRate/heartRate'
					})
				} else if (text == '呼吸') {
					uni.redirectTo({
						url: '/healthMonitoringPackage/pages/breathe/breathe'
					})
				} else if (text == '睡眠') {
					uni.redirectTo({
						url: '/healthMonitoringPackage/pages/sleep/sleep'
					})
				} else if (text == '入厕') {
					uni.redirectTo({
						url: '/healthMonitoringPackage/pages/toilet/toilet'
					})
				} else if (text == '跌倒') {
					uni.redirectTo({
						url: '/healthMonitoringPackage/pages/tumble/tumble'
					})
				} else if (text == '离家和回家') {
					uni.redirectTo({
						url: '/healthMonitoringPackage/pages/leaveHome/leaveHome'
					})
				};
				this.changeDeviceDataMessage(item)
			},
			
			// 编辑数据卡片事件
			editDataCardEvent () {
				uni.redirectTo({
					url: '/healthMonitoringPackage/pages/healthMonitoring/index/index'
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
		};
		.uni-ec-canvas {
			width: 100%;
			height: 100px; 
			display: block;
		};
		.top-area {
			height: 50px;
			display: flex;
			align-items: center;
			padding: 10px;
			box-sizing: border-box;
			width: 100%;
			background: #fff;
			margin-top: 44px;
			>view {
				&:nth-child(1) {
					font-size: 20px;
					color: #11D183
				};
				&:nth-child(2) {
					width: 140px;
					height: 40px;
					margin-top: 2px;
					::v-deep .show-box {
						border: none !important;
						font-size: 16px;
						height: 40px;
						color: #0E2442 !important;
						background: transparent !important;
						.input {
							@include no-wrap;
							display: inline-block;
							line-height: 40px;
							height: 40px;
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
							color: #0E2442 !important
						};
						.right-arrow {
							color: #0E2442 !important
						}
					}
				}
			}
		};
		.banner-area-box {
			padding: 0 10px 10px 10px;
			min-height: 135px;
			box-sizing: border-box;
			background: #fff
		};
		.center-area {
			flex: 1;
			overflow: auto;
			background: #f5f5f5;
			position: relative;
			::v-deep .u-empty {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%)
			};
			.bind-sleep-device-area {
				margin-top: 2px;
				padding: 4px 10px;
				box-sizing: border-box;
				background: #fff;
				height: 275px;
				border-radius: 10px;
				display: flex;
				flex-direction: column;
				>view {
					&:nth-child(1) {
						font-size: 14px;
						color: #101010;
						@include no-wrap
					};
					&:nth-child(2) {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						>view {
							width: 100%;
							&:nth-child(1) {
								@include no-wrap;
								display: flex;
								align-items: center;
								justify-content: center;
								font-size: 14px;
								color: #101010;
								margin-bottom: 20px;
								>text {
									text-align: center;
									display: inline-block;
									width: 100%;
									@include no-wrap
								}
							};
							&:nth-child(2) {
								justify-content: center;
								font-size: 14px;
								display: flex;
								align-items: center;
								>text {
									color: #101010;
									&:nth-child(2) {
										display: inline-block;
										width: 89px;
										height: 26px;
										display: flex;
										align-items: center;
										justify-content: center;
										background: #11D183;
										border-radius: 4px;
										color: #fff !important;
										margin: 0 6px
									}
								}
							}
						}
					}
				}
			};
			.bind-toileting-device-area {
				height: 159px !important;
				margin-top: 4px;
			};
			.tumble-toileting-device-area {
				height: 132px !important;
				margin-top: 4px;
			};
			.leave-home-device-area {
				height: 159px !important;
				margin-top: 4px;
				margin-bottom: 4px;
			};
			.sleep-area-data {
				background: #fff;
				border-radius: 10px;
				display: flex;
				flex-direction: column;
				margin-top: 6px;
				padding: 4px 10px;
				box-sizing: border-box;
				.sleep-data-title {
					height: 32px;
					display: flex;
					align-items: center;
					margin-bottom: 6px;
					>text {
						margin-right: 10px;
						margin-top: 2px;
						font-size: 12px;
						color: #BBBBBB;
						&:first-child {
							font-size: 14px;
							color: #101010;
							margin-top: 0 !important
						}
					};
					.room-name {
						position: relative;
					};
					.room-name::after {
						content: "";
						position: absolute;
						top: 1px;
						right: -6px;
						width: 1px;
						height: 14px;
						background: #BBBBBB
					}
				};
				.heart-rate-box {
					padding: 6px;
					box-sizing: border-box;
					border: 1px dashed #BBBBBB;
					border-radius: 10px;
					box-shadow: 0px 2px 6px 0 rgba(0, 0, 9, 0.1);
					height: 140px;
					display: flex;
					flex-direction: column;
					margin-bottom: 8px;
					.heart-rate-title {
						display: flex;
						justify-content: space-between;
						.heart-rate-title-left {
							>image {
								width: 19px;
								height: 19px;
								vertical-align: middle;
								margin-right: 6px;
							};
							>text {
								font-size: 14px;
								color: #101010;
								vertical-align: middle;
								margin-right: 6px;
								&:last-child {
									font-size: 12px;
								}
							}
						};
						.heart-rate-title-right {
							font-size: 12px;
							color: #007AFF;
						}
					};
					.heart-rate-chart {
						height: 104px;
					}
				};
				.breathe-box {
					height: 130px;
					.breathe-chart {
						height: 94px
					}
				};
				.sleep-box {
					height: 130px;
					.sleep-chart {
						height: 94px
					}
				}
			};
			.toilet-area-data {
				height: 184px;
				.heart-rate-box {
					height: 0;
					flex: 1 !important;
					display: flex;
					flex-direction: column;
					.toilet-chart {
						height: 94px
					}
				};
				.sleep-data-title {};
				margin-top: 8px;
				.toilet-chart {
					flex: 1
				}
			};
			.tumble-area-data {
				height: 174px;
				margin-top: 8px;
				.heart-rate-box {
					height: 0;
					flex: 1 !important;
					display: flex;
					flex-direction: column;
					.tumble-chart {
						height: 84px
					}
				}
			};
			.leave-home-area-data {
				height: 184px;
				margin-top: 8px;
				margin-bottom: 8px;
				.heart-rate-box {
					height: 0;
					flex: 1 !important;
					display: flex;
					flex-direction: column;
					.leave-home-chart {
						height: 94px
					}
				};
			}
		};
		.bottom-area {
			margin: 0 auto;
			width: 353px;
			border-radius: 5px;
			height: 38px;
			text-align: center;
			line-height: 38px;
			border: 1px solid #11D183;
			color: #11D183;
			font-size: 14px;
		}
	}
</style>



