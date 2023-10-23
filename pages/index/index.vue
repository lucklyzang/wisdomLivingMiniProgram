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
				<view class="sleep-area-data" v-if="item.type == 0 && item.hasOwnProperty('devices')">
					<view class="sleep-data-title">
						<text>{{ item.mold == 0 ? item.name : `${item.name}-${item.subtitle}` }}</text>
						<text>{{ getNowFormatDateText(new Date()) }}</text>
						<text class="room-name">{{ extractRooName(item.devices) }}</text>
						<text v-if="sceneDataList[item.id]['heart']['isShow']">{{ `睡眠${totalSleepTime}、睡眠状态良好` }}</text>
					</view>
					<view class="heart-rate-box">
						<view class="heart-rate-title">
							<view class="heart-rate-title-left">
								<image :src="heartRateIconPng"></image>
								<text v-if="sceneDataList[item.id]['heart']['isShow']">{{ `心率 ${sceneDataList[item.id]['heart']['average']}次/分` }}</text>
								<text v-if="sceneDataList[item.id]['heart']['isShow']">心率正常</text>
							</view>
							<view class="heart-rate-title-right" @click="enterDetailsEvent('心率',item)">
								详情
							</view>
						</view>
						<view class="heart-rate-chart">
							<u-empty text="暂无数据" v-if="sceneDataList[item.id]['heart']['isShowNoData']"></u-empty>
							<qiun-data-charts v-if="!sceneDataList[item.id]['heart']['isShowNoData']" tooltipFormat="tooltipDemo1" type="area" :canvas2d="true" :canvasId="`abcdef${item.id}`" :opts="heartOpts" :ontouch="true" :chartData="sceneDataList[item.id]['heart']['data']" />
						</view>
					</view>
					<view class="heart-rate-box breathe-box">
						<view class="heart-rate-title">
							<view class="heart-rate-title-left">
								<image :src="breatheIconPng"></image>
								<text v-if="sceneDataList[item.id]['breath']['isShow']">{{ `呼吸 ${sceneDataList[item.id]['breath']['average']}次/分` }}</text>
								<text v-if="sceneDataList[item.id]['breath']['isShow']">呼吸正常</text>
							</view>
							<view class="heart-rate-title-right" @click="enterDetailsEvent('呼吸',item)">
								详情
							</view>
						</view>
						<view class="breathe-chart">
							<u-empty text="暂无数据" v-if="sceneDataList[item.id]['breath']['isShowNoData']"></u-empty>
							<qiun-data-charts v-if="!sceneDataList[item.id]['breath']['isShowNoData']" type="line" :canvas2d="true" :canvasId="`abc1245def${item.id}`" :ontouch="true" :opts="breatheOpts" :chartData="sceneDataList[item.id]['breath']['data']" />
						</view>
					</view>
					<view class="heart-rate-box sleep-box">
						<view class="heart-rate-title">
							<view class="heart-rate-title-left">
								<image :src="sleepSmallIconPng"></image>
								<text v-if="sceneDataList[item.id]['sleep']['isShow']">{{ `睡眠 ${sceneDataList[item.id]['sleep']['sleepTime']}` }}</text>
								<text></text>
							</view>
							<view class="heart-rate-title-right" @click="enterDetailsEvent('睡眠',item)">
								详情
							</view>
						</view>
						<view class="sleep-chart">
							<qiun-data-charts v-if="!sceneDataList[item.id]['sleep']['isShowNoData']" type="bar" :canvas2d="true" :canvasId="`abc1fdsd3245def${item.id}`" :ontouch="true" :opts="sleepOpts" :chartData="sceneDataList[item.id]['sleep']['data']" />
						</view>
						<u-empty text="暂无数据" v-if="sceneDataList[item.id]['sleep']['isShowNoData']"></u-empty>
						<view class="sleep-range" v-if="sceneDataList[item.id]['sleep']['isShow']">
							<view class="sleep-range-left">
								<text>{{ sceneDataList[item.id]['sleep']['sleepStartDate'] }}</text>
								<text>{{ `入睡${sceneDataList[item.id]['sleep']['sleepStartTime']}` }}</text>
							</view>
							<view class="sleep-range-right">
								<text>{{ sceneDataList[item.id]['sleep']['sleepEndDate'] }}</text>
								<text>{{ `醒来${sceneDataList[item.id]['sleep']['sleepEndTime']}` }}</text>
							</view>
						</view>
						<view class="icon-bar" v-if="sceneDataList[item.id]['sleep']['isShow']">
							<view>
								<text></text>
								<text>睡眠</text>
							</view>
							<view>
								<text></text>
								<text>清醒</text>
							</view>
							<view>
								<text></text>
								<text>未检测到人体</text>
							</view>
						</view>
					</view>
				</view>
				<view class="sleep-area-data toilet-area-data" v-if="item.type == 1 && item.hasOwnProperty('devices')">
					<view class="sleep-data-title">
						<text>{{ item.mold == 0 ? item.name : `${item.name}-${item.subtitle}` }}</text>
						<text>{{ getNowFormatDateText(new Date()) }}</text>
						<text class="room-name">{{ extractRooName(item.devices) }}</text>
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
							<u-empty text="暂无数据"></u-empty>
							<!-- <qiun-data-charts type="column" :canvas2d="true" :canvasId="`abcdef${item.id}`" :opts="heartOpts" :ontouch="true" :chartData="chartData" /> -->
						</view>
					</view>
				</view>
				<view class="sleep-area-data tumble-area-data" v-if="item.type == 2 && item.hasOwnProperty('devices')">
					<view class="sleep-data-title">
						<text>{{ item.mold == 0 ? item.name : `${item.name}-${item.subtitle}` }}</text>
						<text>{{ getNowFormatDateText(new Date()) }}</text>
						<text class="room-name">{{ extractRooName(item.devices) }}</text>
						<!-- <text>跌倒一次</text> -->
					</view>
					<view class="heart-rate-box">
						<view class="heart-rate-title">
							<view class="heart-rate-title-left">
								<image :src="tumbleIconPng"></image>
								<!-- <text>跌倒1次</text>
								<text>已自行站起</text> -->
							</view>
							<view class="heart-rate-title-right" @click="enterDetailsEvent('跌倒',item)">
								详情
							</view>
						</view>
						<view class="tumble-chart">
							<u-empty text="暂无数据"></u-empty>
							<!-- <qiun-data-charts type="bar" :canvas2d="true" :canvasId="`abcdef${item.id}`" :opts="tumbOpts" :ontouch="true" :chartData="chartData" /> -->
						</view>
					</view>
				</view>
				<view class="sleep-area-data leave-home-area-data" v-if="item.type == 3 && item.hasOwnProperty('devices')">
					<view class="sleep-data-title">
						<text>{{ item.mold == 0 ? item.name : `${item.name}-${item.subtitle}` }}</text>
						<text>{{ getNowFormatDateText(new Date()) }}</text>
						<text class="room-name">{{ extractRooName(item.devices) }}</text>
					</view>
					<view class="heart-rate-box">
						<view class="heart-rate-title">
							<view class="heart-rate-title-left">
								<image :src="leaveHomeIconPng"></image>
								<text v-if="sceneDataList[item.id]['isShow']">最近离家时间</text>
								<text v-if="sceneDataList[item.id]['isShow']">{{ getNowFormatDate(sceneDataList[item.id]['lastGoOut'],3) }}</text>
							</view>
							<view class="heart-rate-title-right" @click="enterDetailsEvent('离家和回家',item)">
								详情
							</view>
						</view>
						<view class="leave-home-chart">	
							<u-empty text="暂无数据" v-if="sceneDataList[item.id]['isShowNoData']"></u-empty>
							<qiun-data-charts v-if="!sceneDataList[item.id]['isShowNoData']" tooltipFormat="tooltipDemo1" type="column" :canvas2d="true" :canvasId="`abcdef${item.id}`" :opts="leaveHomeOpts" :ontouch="true" :chartData="sceneDataList[item.id]['data']" />
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
	import { getUserBannerList,createVisitPageData, exitPageData } from '@/api/user.js'
	import { sleepStatisticsDetails, enterLeaveHomeDetails } from '@/api/device.js'
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
				sleepBackground: require("@/static/img/sleep-background.png"),
				toiletBackground: require("@/static/img/toilet-background.png"),
				heartRateIconPng: require("@/static/img/heart-rate-icon.png"),
				breatheIconPng: require("@/static/img/breathe-icon.png"),
				toiletIconPng: require("@/static/img/toilet-icon.png"),
				tumbleIconPng: require("@/static/img/tumble-icon.png"),
				leaveHomeIconPng: require("@/static/img/leave-home-icon.png"),
				sleepSmallIconPng: require("@/static/img/sleep-small-icon.png"),
				familyMemberList: [],
				deviceList: [],
				sceneDataList: {},
				heartChartData: {},
				lineChartData: {},
				totalSleepTime: '',
				sleepOpts: {
					padding: [10,4,10,4],
					dataLabel: false,
					legend: { show: false },
					xAxis: {
						disabled: true,
						disableGrid: true
					},
					yAxis: {
						disabled: true,
						disableGrid: true
					},
					extra: {
						bar: {
							type: 'stack'
						}
					}
				},
				breatheOpts: {
					color: ["#1890FF"],
					dataPointShapeType: 'hollow',
					padding: [20,10,10,0],
					enableScroll: true,
					legend: { show: false },
					xAxis: {
						disableGrid: true,
						scrollShow: true,
						itemCount: 8
					},
					yAxis: {
						disabled: true,
						disableGrid: true
					},
					extra: {
						tooltip: {
							showBox: false
						}
					}
				},
				leaveHomeOpts: {
					color: ["#F2A15F","#289E8E"],
					dataLabel: false,
					padding: [20,10,10,15],
					enableScroll: true,
					xAxis: {
						boundaryGap: "justify",
						scrollShow: true,
						disableGrid: true,
						itemCount: 8
					},
					yAxis: {
						disabled: true,
						disableGrid: true
					},
					extra: {
						column: {
							width: 6,
							categoryGap: 2
						}
					}
				},
				tumbOpts: {
					color: ["#F2A15F","#289E8E"],
					dataLabel: false,
					padding: [15,10,0,15],
					enableScroll: true,
					 xAxis: {
						boundaryGap: "justify",
						min: 0,
						axisLine: false,
						max: 70
					},
					yAxis: {
						disableGrid: true,
						disabled: true
					},
					extra: {
						bar: {
							type: "stack",
							width: 30,
							meterBorde: 1,
							meterFillColor: "#FFFFFF",
							activeBgColor: "#000000",
							activeBgOpacity: 0.08,
							categoryGap: 2
						}
					}
				},
				heartOpts: {
					dataPointShape: false,
					color: ["#ee4f74"],
					padding: [20,15,10,20],
					enableScroll: true,
					legend: { show: false },
					xAxis: {
						boundaryGap: "justify",
						scrollShow: true,
						itemCount: 9,
						disableGrid: true
					},
					yAxis: {
						disabled: true,
						disableGrid: true,
						gridType: "dash",
						dashLength: 2,
						 data: [{
							 min: 40
						 }]
					},
					extra: {
						tooltip: {
							showBox: false
						},
						area: {
							type: "straight",
							opacity: 1,
							addLine: true,
							width: 2,
							gradient: true,
							activeType: "hollow"
						}
					}
				},
				visitPageId: ''
			}
		},
		onShow() {
			this.queryHomePageList(this.familyId);
			this.queryUserBannerList();
			this.initFamilyInfo();
			this.createVisitPage()
		},
		onHide () {
			if (!this.visitPageId && this.visitPageId !== 0) {
				return
			};
			this.exitPage()
		},
		destroyed () {
			if (!this.visitPageId && this.visitPageId !== 0) {
				return
			};
			this.exitPage()
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
			
			// 创建页面访问数据
			createVisitPage () {
				createVisitPageData({
					pageName: "健康-数据显示",
					pageKey: "index"
				}).then((res) => {
					if (res && res.data.code == 0) {
						this.visitPageId = res.data.data
					}
				})
				.catch((err) => {
				})
			},
			
			// 退出页面数据
			exitPage () {
				exitPageData(this.visitPageId).then((res) => {
					if (res && res.data.code == 0) {
					}
				})
				.catch((err) => {
				})
			},
			
			// 提取卧室
			extractRooName (roomList) {
				let temporaryArr = [];
				if (roomList.length > 0) {
					roomList.forEach((item) => {
						if (item.hasOwnProperty('roomName') && item.roomName) {
							temporaryArr.push(item.roomName)
						}
					});
					return temporaryArr.join('、')
				} else {
					return ''
				}
			},
			
			// 毫秒转换成分钟
			msToMinutes(ms) {
				if (!ms) { return };
				let minutes = ms / 60000;
				return minutes
			},
			
			// 分钟转换成小时
			minutesTransitionHour(min) {
				if (min <= 0 || !min) {
					return '0分钟'
				};
				let minTime = "";
				let formatOne = '小时';
				let formatTwo = '分钟';
				let h = Math.floor(min / 60);
				min -= h * 60;
				if (min == 0) {
					minTime = h ? "0" + h + ":00" : "";
				} else {
					if (min < 10) {
						min = "0" + min;
					};
					minTime = (h ? h + formatOne : "") + (min ? min + formatTwo : "");
				};
				return minTime
			},
			
			// 家庭选择下拉框下拉选择确定事件
			familyMemberChange (val) {
				this.tabCutActiveIndex = 0;
				this.initValue = val.orignItem.value;
				this.changeFamilyId(val.orignItem.id);
				this.queryHomePageList(this.familyId)
			},
			
			// 格式化时间
			getNowFormatDate(currentDate,type) {
				// type 1-显示年月日  2-显示年月日小时分钟 3-显示小时分钟
				let currentdate;
				let strDate = currentDate.getDate();
				let seperator1 = "-";
				let seperator2 = ":";
				let seperator3 = " ";
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
				if (type == 1) {
					currentdate = currentDate.getFullYear() + seperator1 + month + seperator1 + strDate
				};
				if (type == 2) {
					currentdate = currentDate.getFullYear() + seperator1 + month + seperator1 + strDate + seperator3 + hour + seperator2 + minutes
				};
				if (type == 3) {
					currentdate = hour + seperator2 + minutes
				};
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
			querySleepDayDataList (data,cardId) {
				sleepStatisticsDetails(data).then((res) => {
					if ( res && res.data.code == 0) {
						let questData = res.data.data;
						// 呼吸
						if ( JSON.stringify(res.data.data) == '{}' || questData.breath.timeList.length == 0) {
							this.$set(this.sceneDataList[cardId]['breath'],'isShowNoData',true)
						} else {
							let temporaryData = {
								categories: [],
								series: [
									{
										data: []
									}
								]
							};
							questData.breath.timeList.forEach((item,index) => {
								temporaryData['categories'].push(this.getNowFormatDate(new Date(item.time),3));
								temporaryData['series'][0]['data'].push(Math.floor(item.value))
							});
							let temporaryContent = JSON.parse(JSON.stringify(temporaryData));
							this.$set(this.sceneDataList[cardId]['breath'],'data',temporaryContent);
							this.$set(this.sceneDataList[cardId]['breath'],'isShow',true);
							this.$set(this.sceneDataList[cardId]['breath'],'average',Math.floor(questData.breath.average));
						};
						// 心率
						if ( JSON.stringify(res.data.data) == '{}' || questData.heart.timeList.length == 0) {
							this.$set(this.sceneDataList[cardId]['heart'],'isShowNoData',true)
						} else {
							let temporaryData = {
								categories: [],
								series: [
									{
										data: []
									}
								]
							};
							questData.heart.timeList.forEach((item,index) => {
								temporaryData['categories'].push(this.getNowFormatDate(new Date(item.time),3));
								temporaryData['series'][0]['data'].push(Math.floor(item.value))
							});
							let temporaryContent = JSON.parse(JSON.stringify(temporaryData));
							this.$set(this.sceneDataList[cardId]['heart'],'data',temporaryContent);
							this.$set(this.sceneDataList[cardId]['heart'],'isShow',true);
							this.$set(this.sceneDataList[cardId]['heart'],'average',Math.floor(questData.heart.average));
						};
						// 睡眠
						if ( JSON.stringify(res.data.data) == '{}' || JSON.stringify(res.data.data.sleepVO) == '{}' || questData.sleepVO.sleepOrWeekVOS.length == 0) {
							this.$set(this.sceneDataList[cardId]['sleep'],'isShowNoData',true)
						} else {
							let nightSleepDuration = 	Math.ceil(this.msToMinutes(questData.sleepVO['end'] - questData.sleepVO['start']));
							let temporaryDataArr = questData.sleepVO.sleepOrWeekVOS.filter((item) => { return item.type == 0});
							if (temporaryDataArr.length == 0) {
								this.totalSleepTime = this.minutesTransitionHour(questData.sleepVO['totalTime']);
								this.$set(this.sceneDataList[cardId]['sleep'],'isShowNoData',true);
								return
							};
							// status: 0-无人，1-醒着，2-睡眠，type: 0-夜间，1-日间
							let temporaryData = {
								categories: ["7-9"],
								series: []
							};
							questData.sleepVO.sleepOrWeekVOS.forEach((item,index) => {
								if (item.type == 0 && item.status == 0) {
									let currentDurationPercentage = (item.end - item.start)/nightSleepDuration;
									let currentDuration = Math.ceil(currentDurationPercentage*100);
									temporaryData['series'].push(
										{
										  name: "未检测到人体",
										  color: "#F0F0F0",
										  data: [currentDuration]
										}
									)
								} else if (item.type == 0 && item.status == 1) {
									let currentDurationPercentage = (item.end - item.start)/nightSleepDuration;
									let currentDuration = Math.ceil(currentDurationPercentage*100);
									temporaryData['series'].push(
										{
										  name: "清醒",
										  color: "#F2A15F",
										  data: [currentDuration]
										}
									)
								} else if (item.type == 0 && item.status == 2) {
									let currentDurationPercentage = (item.end - item.start)/nightSleepDuration;
									let currentDuration = Math.ceil(currentDurationPercentage*100);
									temporaryData['series'].push(
										{
										  name: "睡眠",
										  color: "#57B6EE",
										  data: [currentDuration]
										}
									)
								}
							});
							let temporaryContent = JSON.parse(JSON.stringify(temporaryData));
							this.totalSleepTime = this.minutesTransitionHour(questData.sleepVO['totalTime']);
							this.$set(this.sceneDataList[cardId]['sleep'],'data',temporaryContent);
							this.$set(this.sceneDataList[cardId]['sleep'],'isShow',true);
							this.$set(this.sceneDataList[cardId]['sleep'],'sleepStartTime',this.getNowFormatDate(new Date(questData.sleepVO['start']),3));
							this.$set(this.sceneDataList[cardId]['sleep'],'sleepEndTime',this.getNowFormatDate(new Date(questData.sleepVO['end']),3));
							this.$set(this.sceneDataList[cardId]['sleep'],'sleepStartDate',this.getNowFormatDateText(new Date(questData.sleepVO['start'])));
							this.$set(this.sceneDataList[cardId]['sleep'],'sleepEndDate',this.getNowFormatDateText(new Date(questData.sleepVO['end'])));
							this.$set(this.sceneDataList[cardId]['sleep'],'sleepTime',this.minutesTransitionHour(questData.sleepVO['totalTime']-questData.sleepVO['dayTime']))
						}
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
						title: err.message,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			// 获取离、回家数据
			queryLeaveHomeDetails (data,cardId) {
				enterLeaveHomeDetails(data).then((res) => {
					if ( res && res.data.code == 0) {
						if (res.data.data.length == 0) {
							this.$set(this.sceneDataList[cardId],'isShowNoData',true);
							return
						};
						let questData = res.data.data[0]['ruleDataVO'];
						if (questData.length == 0) {
							this.$set(this.sceneDataList[cardId],'isShowNoData',true);
							return
						};
						let temporaryData = {
							categories: [],
							series: [
								{
									name: "离家",
									data: []
								},
								{
									name: "回家",
									data: []
								}
							]
						};
						questData.details.forEach((item,index) => {
							temporaryData['categories'].push(this.getNowFormatDate(new Date(item.createTime),3));
							if (item.goOut) {
								temporaryData['series'][0]['data'].push(30)
							} else {
								temporaryData['series'][0]['data'].push('')
							};
							if (item.enter) {
								temporaryData['series'][1]['data'].push(30)
							} else {
								temporaryData['series'][1]['data'].push('')
							}
						});
						let temporaryContent = JSON.parse(JSON.stringify(temporaryData));
						this.$set(this.sceneDataList[cardId],'data',temporaryContent);
						this.$set(this.sceneDataList[cardId],'isShow',true);
						this.$set(this.sceneDataList[cardId],'lastGoOut',new Date(questData['lastGoOut']));
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
						title: err.message,
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
						title: err.message,
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
						title: err.message,
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
						let temporaryDevices = [];
						for (let el of item.devices) {
							temporaryDevices.push(el.device)
						};
						if (item.type == 0) {
							this.$set(this.sceneDataList,item.id,{});
							// 呼吸数据
							this.$set(this.sceneDataList[item.id],'breath',{});
							this.$set(this.sceneDataList[item.id]['breath'],'data',{});
							this.$set(this.sceneDataList[item.id]['breath'],'average','');
							this.$set(this.sceneDataList[item.id]['breath'],'isShow',false);
							this.$set(this.sceneDataList[item.id]['breath'],'isShowNoData',false);
							// 心率数据
							this.$set(this.sceneDataList[item.id],'heart',{});
							this.$set(this.sceneDataList[item.id]['heart'],'data',{});
							this.$set(this.sceneDataList[item.id]['heart'],'average','');
							this.$set(this.sceneDataList[item.id]['heart'],'isShow',false);
							this.$set(this.sceneDataList[item.id]['heart'],'isShowNoData',false);
							// 睡眠数据
							this.$set(this.sceneDataList[item.id],'sleep',{});
							this.$set(this.sceneDataList[item.id]['sleep'],'data',{});
							this.$set(this.sceneDataList[item.id]['sleep'],'isShow',false);
							this.$set(this.sceneDataList[item.id]['sleep'],'sleepStartTime','');
							this.$set(this.sceneDataList[item.id]['sleep'],'sleepEndTime','');
							this.$set(this.sceneDataList[item.id]['sleep'],'sleepStartDate','');
							this.$set(this.sceneDataList[item.id]['sleep'],'sleepEndDate','');
							this.$set(this.sceneDataList[item.id]['sleep'],'sleepTime','');
							this.requestSleepDeviceStatisticsData(temporaryDevices[0],item.id)
						} else if (item.type == 3) {
							this.$set(this.sceneDataList,item.id,{});
							this.$set(this.sceneDataList[item.id],'data',{});
							this.$set(this.sceneDataList[item.id],'lastGoOut','');
							this.$set(this.sceneDataList[item.id],'isShow',false);
							this.$set(this.sceneDataList[item.id],'isShowNoData',false);
							this.requestEnterLeaveHomeDetails(temporaryDevices[0],item.id)
						}
					}
				})
			},
			
			// 为绑定设备的场景请求设备统计日数据(睡眠场景)
			requestSleepDeviceStatisticsData (deviceIdList,cardId) {
				this.querySleepDayDataList({
					deviceId: deviceIdList,
					startDate: this.getNowFormatDate(new Date(),1)
				},cardId)
			},
			
			// 为绑定设备的场景请求设备统计日数据(离、回家场景)
			requestEnterLeaveHomeDetails (deviceIdList,cardId) {
				this.queryLeaveHomeDetails({
					deviceId: deviceIdList,
					startDate: this.getNowFormatDate(new Date(),1),
					endDate: this.getNowFormatDate(new Date(),1)
				},cardId)
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
				this.changeDeviceDataMessage(item);
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
							.item.active {
								color: #11D183 !important
							}
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
			// .toilet-background-box {
			// 	position: absolute;
			// 	width: 100%;
			// 	height: 159px;
			// 	left: 0;
			// 	top: 510px;
			// 	>image {
			// 		width: 100%;
			// 		height: 100%
			// 	}
			// };
			.bind-sleep-device-area {
				margin-top: 2px;
				padding: 4px 10px;
				box-sizing: border-box;
				background: #fff;
				height: 275px;
				border-radius: 10px;
				display: flex;
				flex-direction: column;
				background: #fff url("@/static/img/sleep-background.png") no-repeat;
				background-size: 100% 100%;
				background-origin: padding-box;
				background-clip: border-box;
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
				background: #fff url("@/static/img/toilet-background.png") no-repeat;
				background-size: 100% 100%;
				background-origin: padding-box;
				background-clip: border-box;
			};
			.tumble-toileting-device-area {
				height: 132px !important;
				margin-top: 4px;
				background: #fff url("@/static/img/tumble-background.png") no-repeat;
				background-size: 100% 100%;
				background-origin: padding-box;
				background-clip: border-box;
			};
			.leave-home-device-area {
				height: 159px !important;
				margin-top: 4px;
				margin-bottom: 4px;
				background: #fff url("@/static/img/leave-home-background.png") no-repeat;
				background-size: 100% 100%;
				background-origin: padding-box;
				background-clip: border-box;
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
							margin-top: 0 !important;
							@include no-wrap();
							max-width: 200px;
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
						position: relative;
						::v-deep .u-empty {
						 	position: absolute;
						 	top: 50%;
						 	left: 50%;
						 	transform: translate(-50%,-50%)
						}
					}
				};
				.breathe-box {
					height: 130px;
					.breathe-chart {
						height: 94px;
						position: relative;
						::v-deep .u-empty {
						 	position: absolute;
						 	top: 50%;
						 	left: 50%;
						 	transform: translate(-50%,-50%)
						}
					}
				};
				.sleep-box {
					height: 170px;
					position: relative;
					.sleep-chart {
						height: 44px;
						::v-deep .u-empty {
						 	position: absolute;
						 	top: 50%;
						 	left: 50%;
						 	transform: translate(-50%,-50%)
						}
					};
					.sleep-range {
						width: 100%;
						display: flex;
						justify-content: space-between;
						.sleep-range-left {
							display: flex;
							flex-direction: column;
							align-items: center;
							>text {
								font-size: 12px;
								color: #898C8C
							}
						};
						.sleep-range-right {
							margin-bottom: 10px;
							display: flex;
							align-items: center;
							flex-direction: column;
							>text {
								font-size: 12px;
								color: #898C8C
							}
						}
					};
					.icon-bar {
						height: 40px;
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top: 4px;
						>view {
							flex: 1;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							&:first-child {
								margin-right: 10px;
								>text {
									display: inline-block;
									&:first-child {
										width: 21px;
										height: 12px;
										background: #57B6EE
									};
									&:last-child {
										font-size: 14px;
										margin-top: 4px;
										color: #101010
									}
								} 
							};
							&:nth-child(2) {
								margin-right: 10px;
								>text {
									display: inline-block;
									&:first-child {
										width: 21px;
										height: 12px;
										background: #F2A15F
									};
									&:last-child {
										font-size: 14px;
										margin-top: 4px;
										color: #101010
									}
								} 
							};
							&:last-child {
								>text {
									display: inline-block;
									&:first-child {
										width: 21px;
										height: 12px;
										background: #F0F0F0
									};
									&:last-child {
										font-size: 14px;
										margin-top: 4px;
										color: #101010
									}
								} 
							}
						}
					}
				}
			};
			.toilet-area-data {
				height: 184px;
				margin-top: 8px;
				.heart-rate-box {
					height: 0;
					flex: 1 !important;
					display: flex;
					flex-direction: column;
					.toilet-chart {
						height: 94px;
						position: relative;
						::v-deep .u-empty {
						 	position: absolute;
						 	top: 50%;
						 	left: 50%;
						 	transform: translate(-50%,-50%)
						}
					}
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
						height: 84px;
						position: relative;
						::v-deep .u-empty {
						 	position: absolute;
						 	top: 50%;
						 	left: 50%;
						 	transform: translate(-50%,-50%)
						}
					}
				}
			};
			.leave-home-area-data {
				height: 184px;
				margin-top: 8px;
				margin-bottom: 8px;
				.sleep-data-title {
					.room-name::after {
						display: none
					}
				};
				.heart-rate-box {
					height: 0;
					flex: 1 !important;
					display: flex;
					flex-direction: column;
					.leave-home-chart {
						height: 94px;
						position: relative;
						::v-deep .u-empty {
						 	position: absolute;
						 	top: 50%;
						 	left: 50%;
						 	transform: translate(-50%,-50%)
						}
					}
				}
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



