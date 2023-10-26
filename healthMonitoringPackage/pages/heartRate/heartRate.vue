<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="心率" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="content-top-area">
				<view class="content-top-title">
					<u-subsection :list="itemList" :current="currentItem" @change="change"></u-subsection>
				</view>
				<view class="content-top-content">
					<view class="day-data-area" v-if="currentItem == 0">
						<view class="data-top">
							<view>
								<u-icon name="arrow-left" size="40" color="#101010" @click="getCurrentDate('minus')"></u-icon>
								<text>{{ `${getNowFormatDateText(currentDayTime)} ${judgeWeek(currentDayTime)}`}}</text>
								<u-icon name="arrow-right" size="40" :color="isDayPlusCanCilck ? '#101010' : '#c9c9c9'" @click="getCurrentDate('plus')"></u-icon>
							</view>
							<view>
								<text>{{ initDayTime }}</text>
							</view>
							<view>
								<text>{{ `${initDayText}次/分钟` }}</text>
							</view>
						</view>
						<view class="data-bottom">
							<u-empty text="暂无数据" v-if="!dayChartData.isShow"></u-empty>
							<qiun-data-charts @getIndex="getDayIndexEvent" :inScrollView="true" v-if="dayChartData.isShow" type="area" :canvas2d="true" canvasId="abcdef123gh" :opts="heartDayOpts" :ontouch="true" :chartData="dayChartData['data']" />
						</view>
					</view>
					<view class="day-data-area" v-if="currentItem == 1">
						<view class="data-top">
							<view>
								<u-icon name="arrow-left" size="40" color="#101010" @click="getCurrentWeek('minus')"></u-icon>
								<text>{{`${getNowFormatDateText(currentStartWeekDate)}-${getNowFormatDateText(currentEndWeekDate)}`}}</text>
								<u-icon name="arrow-right" size="40" :color="isWeekPlusCanCilck ? '#101010' : '#c9c9c9'" @click="getCurrentWeek('plus')"></u-icon>
							</view>
							<view>
								<text>{{ initWeekDate }}</text>
							</view>
							<view>
								<text>{{ `${initWeekText}次/分钟` }}</text>
							</view>
						</view>
						<view class="data-bottom">
							<u-empty text="暂无数据" v-if="!weekChartData.isShow"></u-empty>
							<qiun-data-charts type="column" :inScrollView="true" :canvas2d="true" v-if="weekChartData.isShow" @getIndex="getWeekIndexEvent" canvasId="abcdsdfdatef123gh" :opts="heartWeekOpts" :ontouch="true" :chartData="weekChartData.data" />
						</view>
					</view>
					<view class="day-data-area" v-if="currentItem == 2">
						<view class="data-top">
							<view>
								<u-icon name="arrow-left" size="40" color="#101010" @click="getCurrentMonth('minus')"></u-icon>
								<text>{{ getNowFormatDateText(currentMonthDate,2) }}</text>
								<u-icon name="arrow-right" size="40" :color="isMonthPlusCanCilck ? '#101010' : '#c9c9c9'" @click="getCurrentMonth('plus')"></u-icon>
							</view>
							<view>
								<text>{{ initMonthDate }}</text>
							</view>
							<view>
								<text>{{ `${initMonthText}次/分钟` }}</text>
							</view>
						</view>
						<view class="data-bottom">
							<u-empty text="暂无数据" v-if="!monthChartData.isShow"></u-empty>
							<qiun-data-charts type="column" :inScrollView="true" v-if="monthChartData.isShow" @getIndex="getMonthIndexEvent" :canvas2d="true" canvasId="ab12casdgdehhjjsatef123gh" :opts="heartMonthOpts" :ontouch="true" :chartData="monthChartData.data" />
						</view>
					</view>
				</view>
			</view>
			<view class="content-bottom-area">
				<view class="data-overview">
					<view class="data-top">
						<image :src="dataOverviewIconPng"></image>
						<text>数据概览</text>
					</view>
					<view class="data-content">
						<view class="data-content-top">
							<view class="content-top-left">
								<text>{{ `${quietness}次/分` }}</text>
								<text>静息心率</text>
							</view>
							<view class="content-top-right">
								<text>{{ `${highest}次/分` }}</text>
								<text>最高心率</text>
							</view>
						</view>
						<view class="data-content-bottom">
							<view class="content-bottom-left">
								<text>{{ `${lowest}次/分` }}</text>
								<text>最低心率</text>
							</view>
							<view class="content-bottom-right">
								<text>{{ `${average}次/分` }}</text>
								<text>平均心率</text>
							</view>
						</view>
					</view>
				</view>
				<view class="daytime-nap">
					<view class="daytime-nap-top">
						<image :src="daytimeNapIconPng"></image>
						<text>日间小憩</text>
					</view>
					<view class="daytime-nap-bottom">
						<text>{{ daySleepTime }}</text>
					</view>
				</view>
				<view class="health-tips">
					<view class="health-tips-top">
						<image :src="daytimeNapIconPng"></image>
						<text>健康小知识</text>
					</view>
					<view class="health-tips-bottom" @click="healthTipsDetailsEvent">
						<text>正常人的心率一般为60～100次/分，一般来说，年龄越小，心率越快，老年人心跳比年轻人慢，女性的心率比同龄男性快，这是正常的生理现象。安静状态下......</text>
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
	import { sleepStatisticsDetails, sleepStatisticsHome } from '@/api/device.js'
	import { createVisitPageData, exitPageData } from '@/api/user.js'
	export default {
		components: {
			navBar
		},
		data() {
			return {
				infoText: '',
				showLoadingHint: false,
				dataOverviewIconPng: require("@/static/img/data-overview-icon.png"),
				daytimeNapIconPng: require("@/static/img/daytime-nap-icon.png"),
				itemList: [{
					name: '日'
				}, {
					name: '周'
				}, {
					name: '月'
				}],
				daySleepTime: '',
				currentWeekXaxisArr: [],
				currentWeekYaxisArr: [],
				currentMonthXaxisArr: [],
				currentMonthYaxisArr: [],
				currentItem: 0,
				dayChartData: {
					isShow: true,
					data: {}
				},
				weekChartData: {
					isShow: true,
					data: {}
				},
				monthChartData: {
					isShow: true,
					data: {}
				},
				chartWeekData: {},
				heartWeekOpts: {
					dataPointShape: false,
					dataLabel: false,
					color: ["#F7A4B6"],
					padding: [10,10,10,10],
					legend: { show: false },
					xAxis: {
						itemCount: 7,
						axisLine: false
					},
					yAxis: {
						splitNumber: 5,
						gridType: "solid",
						dashLength: 2,
						data: []
					},
					extra: {
						tooltip: {
							showBox: false
						},
						column: {
							width: 12,
							type: "stack",
							barBorderCircle: true,
							barBorderRadius: 20
						}
					}
				},
				heartMonthOpts: {
					dataPointShape: false,
					dataLabel: false,
					color: ["#F7A4B6"],
					padding: [10,10,10,10],
					legend: { show: false },
					enableScroll: true,
					xAxis: {
						itemCount: 7,
						scrollShow: true,
						axisLine: false
					},
					yAxis: {
						splitNumber: 5,
						gridType: "solid",
						dashLength: 2,
						data: []
					},
					extra: {
						tooltip: {
							showBox: false
						},
						column: {
							width: 12,
							type: "stack",
							barBorderCircle: true,
							barBorderRadius: 20
						}
					}
				},
				initWeekText: '',
				initMonthText: '',
				lowest: '',
				highest: '',
				average: '',
				quietness: '',
				initDayText: '',
				heartDayOpts: {
					dataPointShape: false,
					color: ["#ee4f74"],
					padding: [20,10,10,10],
					enableScroll: true,
					legend: { show: false },
					xAxis: {
						itemCount: 9,
						scrollShow: true,
						axisLine: false
					},
					yAxis: {
						splitNumber: 5,
						gridType: "solid",
						dashLength: 2,
						 data: [
							 {
								 min: 40
							 }
						 ]
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
				isDayPlusCanCilck: true,
				isMonthPlusCanCilck: true,
				isWeekPlusCanCilck: true,
				currentDayTime: '',
				initDayTime: '',
				currentStartWeekDate: '',
				currentEndWeekDate: '',
				initWeekDate: '',
				currentMonthDate: '',
				currentMonthDays: '',
				initMonthDate: '',
				weekMap: {},
				temporaryDevices: [],
				visitPageId: ''
			}
		},
		onLoad() {
			this.createVisitPage();
			this.initDayTime = this.getNowFormatDate(new Date(),1);
			this.currentDayTime = this.getNowFormatDate(new Date(),2);
			let temporaryDate = this.getNowFormatDate(new Date(),2);
			if (new Date(this.currentDayTime).getTime() >= new Date(temporaryDate).getTime()) { 
				this.isDayPlusCanCilck = false
			};
			// 获取心率数据日
			this.temporaryDevices = [];
			for (let el of this.deviceDataMessage.devices) {
				this.temporaryDevices.push(el.device)
			};
			this.querySleepStatisticsDetails({
				deviceId: this.temporaryDevices[0],
				startDate: this.getNowFormatDate(new Date(),2),
			}) 
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
				'deviceDataMessage'
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
				'changeOverDueWay'
			]),
			
			// 创建页面访问数据
			createVisitPage () {
				createVisitPageData({
					pageName: "健康-心率详情(日周月)",
					pageKey: "heartRate"
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
			
			// 获取日数据当前点击索引
			getDayIndexEvent (e) {
				if (e.currentIndex['index'] == -1) { return };
				this.initDayTime = e['opts']['categories'][e.currentIndex['index']];
				this.initDayText = this.dayChartData['data']['series'][0]['data'][e.currentIndex['index']];
			},
			
			// 获取周数据当前点击索引
			getWeekIndexEvent (e) {
				if (e.currentIndex['index'] == -1) { return };
				this.initWeekDate = this.getNowFormatDateText(this.currentWeekXaxisArr[e.currentIndex['index']]);
				this.initWeekText = `${Math.floor(this.currentWeekYaxisArr[e.currentIndex['index']]['heartMinValue'])}-${Math.floor(this.currentWeekYaxisArr[e.currentIndex['index']]['heartMaxValue'])}`;
				this.lowest = Math.floor(this.currentWeekYaxisArr[e.currentIndex['index']]['heartMinValue']);
				this.highest = Math.floor(this.currentWeekYaxisArr[e.currentIndex['index']]['heartMaxValue']);
				this.average = Math.floor(this.currentWeekYaxisArr[e.currentIndex['index']]['heartAverage']);
				this.quietness = Math.floor(this.currentWeekYaxisArr[e.currentIndex['index']]['heartSilent']);
				this.daySleepTime = this.minutesTransitionHour(this.currentWeekYaxisArr[e.currentIndex['index']]['sleepDayTime'])
			},
			
			// 获取月数据当前点击索引
			getMonthIndexEvent (e) {
				if (e.currentIndex['index'] == -1) { return };
				this.initMonthDate = this.getNowFormatDateText(this.currentMonthXaxisArr[e.currentIndex['index']]);
				this.initMonthText = `${Math.floor(this.currentMonthYaxisArr[e.currentIndex['index']]['heartMinValue'])}-${Math.floor(this.currentMonthYaxisArr[e.currentIndex['index']]['heartMaxValue'])}`;
				this.lowest = Math.floor(this.currentMonthYaxisArr[e.currentIndex['index']]['heartMinValue']);
				this.highest = Math.floor(this.currentMonthYaxisArr[e.currentIndex['index']]['heartMaxValue']);
				this.average = Math.floor(this.currentMonthYaxisArr[e.currentIndex['index']]['heartAverage']);
				this.quietness = Math.floor(this.currentMonthYaxisArr[e.currentIndex['index']]['heartSilent']);
				this.daySleepTime = this.minutesTransitionHour(this.currentMonthYaxisArr[e.currentIndex['index']]['sleepDayTime'])
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
			
			// 获取体征数据详情(日)
			querySleepStatisticsDetails (data) {
				this.lowest = '';
				this.highest = '';
				this.average = '';
				this.quietness = '';
				this.initDayTime = '';
				this.initDayText = '';
				this.daySleepTime = '';
				this.dayChartData = {
					isShow: true,
					data: {}
				};
				sleepStatisticsDetails(data).then((res) => {
					if ( res && res.data.code == 0) {
						let questData = res.data.data;
						this.dayChartData['isShow'] = true;
						// 心率
						if ( JSON.stringify(res.data.data) == '{}' || questData.heart.timeList.length == 0) {
							this.initDayTime = '-';
							this.initDayText = '-';
							this.daySleepTime = '-'
							this.dayChartData = {
								isShow: false,
								data: {}
							}
						} else {
							this.initDayText = Math.floor(questData.heart.timeList[0]['value']);
							this.initDayTime = this.getNowFormatDate(new Date(questData.heart.timeList[0]['time']),1);
							this.daySleepTime = this.minutesTransitionHour(questData.sleepVO['dayTime']);
							this.lowest = Math.floor(questData.heart.lowest);
							this.highest = Math.floor(questData.heart.highest);
							this.average = Math.floor(questData.heart.average);
							this.quietness = Math.floor(questData.heart.heartSilent);
							this.dayChartData['isShow'] = true;
							let temporaryData = {
								categories: [],
								series: [
									{
										data: []
									}
								]
							};
							questData.heart.timeList.forEach((item,index) => {
								temporaryData['categories'].push(this.getNowFormatDate(new Date(item.time),1));
								temporaryData['series'][0]['data'].push(Math.floor(item.value))
							});
							let temporaryContent = JSON.parse(JSON.stringify(temporaryData));
							this.dayChartData['data'] = temporaryContent
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
			
			// 获取体征数据详情(周月)
			querySleepStatisticsDetailsOther (data,type) {
				this.lowest = '';
				this.highest = '';
				this.average = '';
				this.quietness = '';
				this.daySleepTime = '';
				if (type == 'week') {
					this.initWeekText = '';
					this.currentWeekXaxisArr = [];
					this.currentWeekYaxisArr = [];
					this.weekChartData = {
						isShow: true,
						data: {}
					}
				} else if (type == 'month') {
					this.initMonthText = '';
					this.currentMonthXaxisArr = [];
					this.currentMonthYaxisArr = [];
					this.monthChartData = {
						isShow: true,
						data: {}
					}
				};
				sleepStatisticsHome(data).then((res) => {
					if ( res && res.data.code == 0) {
						if (type == 'week') {
							let questData = res.data.data;
							this.weekChartData['isShow'] = true;
							if ( JSON.stringify(res.data.data) == '{}' || questData.respVOList.length == 0) {
								this.initWeekText = '-';
								this.daySleepTime = '-';
								this.weekChartData = {
									isShow: false,
									data: {}
								}
							} else {
								if (questData.respVOList[0]['startTime'] == this.currentStartWeekDate) {
									this.daySleepTime = this.minutesTransitionHour(questData.respVOList[0]['sleepDayTime']);
									this.initWeekText = `${Math.floor(questData.respVOList[0]['heartMinValue'])}-${Math.floor(questData.respVOList[0]['heartMaxValue'])}`;
									this.lowest = Math.floor(questData.respVOList[0]['heartMinValue']);
									this.highest = Math.floor(questData.respVOList[0]['heartMaxValue']);
									this.average = Math.floor(questData.respVOList[0]['heartAverage']);
									this.quietness = Math.floor(questData.respVOList[0]['heartSilent']);
								} else {
									this.initWeekText = '-';
									this.initMonthText = '-';
									this.daySleepTime = '-';
									this.quietness = '-';
									this.lowest = '-';
									this.highest = '-';
								};
								this.weekChartData['isShow'] = true;
								let temporaryData = {
									categories: [],
									series: [
										{
										  data: []
										},
										{
											data: []
										}
									]
								};
								questData.respVOList.forEach((item,index) => {
									this.currentWeekYaxisArr.push(item);
									this.currentWeekXaxisArr.push(item.startTime);
									temporaryData['categories'].push(this.judgeWeek(item.startTime));
									temporaryData['series'][0]['data'].push({
										color: 'transparent',
										value: Math.floor(item.heartMinValue)
									});
									temporaryData['series'][1]['data'].push({
										color: '#F7A4B6',
										value: Math.floor(item.heartMaxValue - item.heartMinValue)
									})
								});
								let temporaryContent = JSON.parse(JSON.stringify(temporaryData));
								this.weekChartData['data'] = temporaryContent
							}	
						} else if (type == 'month') {
							let questData = res.data.data;
							this.monthChartData['isShow'] = true;
							if ( JSON.stringify(res.data.data) == '{}' || questData.respVOList.length == 0) {
								this.initMonthText = '-';
								this.daySleepTime = '-';
								this.monthChartData = {
									isShow: false,
									data: {}
								}
							} else {
								if (questData.respVOList[0]['startTime'] == `${this.currentMonthDate}-01`) {
									this.daySleepTime = this.minutesTransitionHour(questData.respVOList[0]['sleepDayTime']);
									this.initMonthText = `${Math.floor(questData.respVOList[0]['heartMinValue'])}-${Math.floor(questData.respVOList[0]['heartMaxValue'])}`;
									this.lowest = Math.floor(questData.respVOList[0]['heartMinValue']);
									this.highest = Math.floor(questData.respVOList[0]['heartMaxValue']);
									this.average = Math.floor(questData.respVOList[0]['heartAverage']);
									this.quietness = Math.floor(questData.respVOList[0]['heartSilent']);
								} else {
									this.initMonthText = '-';
									this.initMonthText = '-';
									this.lowest = '-';
									this.daySleepTime = '-';
									this.highest = '-';
								};
								this.monthChartData['isShow'] = true;
								let temporaryData = {
									categories: [],
									series: [
										{
										  data: []
										},
										{
											data: []
										}
									]
								};
								questData.respVOList.forEach((item,index) => {
									this.currentMonthYaxisArr.push(item);
									this.currentMonthXaxisArr.push(item.startTime);
									temporaryData['categories'].push(this.getNowFormatDate(new Date(item.startTime),5));
									temporaryData['series'][0]['data'].push({
										color: 'transparent',
										value: Math.floor(item.heartMinValue)
									});
									temporaryData['series'][1]['data'].push({
										color: '#F7A4B6',
										value: Math.floor(item.heartMaxValue - item.heartMinValue)
									})
								});
								let temporaryContent = JSON.parse(JSON.stringify(temporaryData));
								this.monthChartData['data'] = temporaryContent
							}	
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
			
		// 格式化时间
		getNowFormatDate(currentDate,type) {
			// type:1(只显示小时分钟),2(只显示年月日)3(只显示年月)4(显示年月日小时分钟)5(显示月日)
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
				currentdate = hour + seperator2 + minutes
			};
			if (type == 2) {
				currentdate = currentDate.getFullYear() + seperator1 + month + seperator1 + strDate
			};
			if (type == 3) {
				currentdate = currentDate.getFullYear() + seperator1 + month
			};
			if (type == 4) {
				currentdate = currentDate.getFullYear() + seperator1 + month + seperator1 + strDate + seperator3 + hour + seperator2 + minutes
			};
			if (type == 5) {
				currentdate = month + seperator1 + strDate
			};
			return currentdate
		},
			
			// 格式化时间(带中文)
			getNowFormatDateText(currentDate,type) {
				// type: 2(只展示月)
				let currentdate;
				let strDate = new Date(currentDate).getDate();
				let seperator1 = "月";
				let seperator2 = "日";
				let month = new Date(currentDate).getMonth() + 1;
				let hour = new Date(currentDate).getHours();
				if (type == 2) {
					currentdate = month + seperator1
				} else {
					currentdate = month + seperator1 + strDate + seperator2
				};
				return currentdate
			},
			
			//获取上一天和下一天
			getCurrentDate(type) {
				this.isDayPlusCanCilck = true;
				if (type == 'plus') {
					// 当前日期不能超过明天
					let temporaryDate = this.getNowFormatDate(new Date(),2);
					if (new Date(this.currentDayTime).getTime() >= new Date(temporaryDate).getTime()) {
						this.isDayPlusCanCilck = false
						return 
					};
					let time_num = new Date(this.currentDayTime); // 这是选择的日期转为时间戳的值
					let addDay = + time_num + 1000 * 60 * 60 * 24; // 加一天
					let newTime = new Date(addDay);
					this.currentDayTime = this.getNowFormatDate(newTime,2);
					if (new Date(this.currentDayTime).getTime() >= new Date(temporaryDate).getTime()) {
						this.isDayPlusCanCilck = false
					}
				} else {
					let time_num = new Date(this.currentDayTime); // 这是选择的日期转为时间戳的值
					let addDay = + time_num - 1000 * 60 * 60 * 24; // 减一天
					let newTime = new Date(addDay);
					this.currentDayTime = this.getNowFormatDate(newTime,2)
				};
				// 获取心率日数据
				this.querySleepStatisticsDetails({
					deviceId: this.temporaryDevices[0],
					startDate: this.currentDayTime
				})
			},
			
			// 获取某月的天数
			getMonthDay(year, month) {
			  let days = new Date(year, month, 0).getDate()
			  return days
			},
			
			// 获取上一月和下一月
			getCurrentMonth (type) {
				this.isMonthPlusCanCilck = true;
				if (type == 'plus') {
					// 当前月不能超过下月
					let temporaryDate = this.getNowFormatDate(new Date(),3);
					if (new Date(this.currentMonthDate).getTime() >= new Date(temporaryDate).getTime()) {
						this.isMonthPlusCanCilck = false
						return 
					};
					let arr = this.currentMonthDate.split("-");
					let year = arr[0]; //获取当前日期的年份
					let month = arr[1]; //获取当前日期的月份
					let year2 = year;
					let month2 = parseInt(month) + 1;
					if (month2 == 13) {
							//12月的下月是下年的1月
							year2 = parseInt(year2) + 1;
							month2 = 1;
					};
					if (month2 < 10) {
							//10月之前都需要补0
							month2 = "0" + month2;
					};
					let nextMonth = year2 + "-" + month2;
					this.currentMonthDays = this.getMonthDay(year2,month2);
					this.currentMonthDate = this.getNowFormatDate(new Date(nextMonth),3);
					this.initMonthDate = this.getNowFormatDateText(new Date(`${this.currentMonthDate}-01`),3);
					if (new Date(this.currentMonthDate).getTime() >= new Date(temporaryDate).getTime()) {
						this.isMonthPlusCanCilck = false
					}
				} else {
					let arr = this.currentMonthDate.split("-");
					let year = arr[0]; //获取当前日期的年份
					let month = arr[1]; //获取当前日期的月份
					let year2 = year;
					let month2 = parseInt(month) - 1;
					if (month2 == 0) {
						//1月的上一月是前一年的12月
						year2 = parseInt(year2) - 1;
						month2 = 12;
					};
					if (month2 < 10) {
						//10月之前都需要补0
						month2 = "0" + month2;
					};
					let preMonth = year2 + "-" + month2;
					this.currentMonthDays = this.getMonthDay(year2,month2);
					this.currentMonthDate = this.getNowFormatDate(new Date(preMonth),3);
					this.initMonthDate = this.getNowFormatDateText(new Date(`${this.currentMonthDate}-01`),3);
				};
				// 获取心率月数据
				this.querySleepStatisticsDetailsOther({
					deviceId: this.temporaryDevices[0],
					startDate: `${this.currentMonthDate}-01`,
					endDate: `${this.currentMonthDate}-${this.currentMonthDays}`
				},'month')
			},
			
			// 获取当前周
			getWeek (date) {
				let one_day = 86400000;
				let day = date.getDay();
				// 设置时间为当天的0点
				date.setHours(0);
				date.setMinutes(0);
				date.setSeconds(0);
				date.setMilliseconds(0);
				let week_start_time = date.getTime() - (day - 1) * one_day;
				let week_end_time = date.getTime() + (7 - day) * one_day;
				let last = week_start_time - 2*24*60*60*1000;
				let next = week_end_time + 24*60*60*1000;
				let month1 = new Date(week_start_time).getMonth()+1;
				let month2 = new Date(week_end_time).getMonth()+1;
				let day1 = new Date(week_start_time).getDate();
				let day2 = new Date(week_end_time).getDate();
				if(month1<10){
					month1 = "0"+month1;
				};
				if(month2<10){
					month2 = "0"+month2;
				};
				if(day1<10){
					day1 = "0"+day1;
				};
				if(day2<10){
					day2 = "0" + day2;
				};
				let time1 = month1+"-"+day1;
				let time2 = month2+"-"+day2;
				let map = new Map();
				map["syear"] =  new Date(week_start_time).getFullYear(); // 当前周周一的年份
				map["eyear"] =  new Date(week_end_time).getFullYear(); // 当前周周天的年份
				map["stime"] = week_start_time; // 当前周周一零点的毫秒数
				map["etime"] = week_end_time; // 当前周周日零点的毫秒数
				map["stext"] = time1; // 当前周 周一的日期 mm.dd 如 03.14
				map["etext"] = time2; // 当前周 周日的日期 mm.dd 如 03.20
				map["last"] = last; // 上一周 周六零点的毫秒数
				map["next"] = next; // 下一周  周一零点的毫秒数
				map["text"] = time1+" "+time2;
				return map;
			},
			
			// 获取上一周、下一周
			getCurrentWeek (type) {
				this.isWeekPlusCanCilck = true;
				if (type == 'plus') {
					// 当前周不能超过下周
					let temporaryDate = this.getNowFormatDate(new Date(),2);
					if (new Date(this.currentEndWeekDate).getTime() >= new Date(temporaryDate).getTime()) {
						this.isWeekPlusCanCilck = false;
						return 
					};
					let time = this.weekMap["next"]
					this.weekMap = this.getWeek(new Date(time));
					this.currentStartWeekDate = `${this.weekMap['syear']}-${this.weekMap["stext"]}`;
					this.currentEndWeekDate = `${this.weekMap['eyear']}-${this.weekMap["etext"]}`;
					this.initWeekDate = this.getNowFormatDateText(new Date(this.currentStartWeekDate),3);
					if (new Date(this.currentEndWeekDate).getTime() >= new Date(temporaryDate).getTime()) {
						this.isWeekPlusCanCilck = false
					};
					console.log('周',this.currentStartWeekDate,this.currentEndWeekDate)
				} else {
					let time = this.weekMap["last"]
					this.weekMap = this.getWeek(new Date(time));
					this.currentStartWeekDate = `${this.weekMap['syear']}-${this.weekMap["stext"]}`;
					this.currentEndWeekDate = `${this.weekMap['eyear']}-${this.weekMap["etext"]}`;
					this.initWeekDate = this.getNowFormatDateText(new Date(this.currentStartWeekDate),3);
					console.log('周',this.currentStartWeekDate,this.currentEndWeekDate)
				};
				// 获取心率周数据
				this.querySleepStatisticsDetailsOther({
					deviceId: this.temporaryDevices[0],
					startDate: this.currentStartWeekDate,
					endDate: this.currentEndWeekDate
				},'week')
			},
			
			// 判断周几
			judgeWeek (currentDate) {
				let date = new Date(currentDate);
				let day = date.getDay();
				switch (day) {
					case 0:
						return "周日"
						break;
					case 1:
						return "周一"
						break;
					case 2:
						return "周二"
						break;
					case 3:
						return "周三"
						break;
					case 4:
						return "周四"
						break;
					case 5:
						return "周五"
						break;
					case 6:
						return "周六"
						break
					}
			},
			
			// tab切换值改变事件
			change(index) {
				this.currentItem = index;
				if (index == 0) {
					this.initDayTime = this.getNowFormatDate(new Date(),1);
					this.currentDayTime = this.getNowFormatDate(new Date(),2);
					let temporaryDate = this.getNowFormatDate(new Date(),2);
					if (new Date(this.currentDayTime).getTime() >= new Date(temporaryDate).getTime()) { 
						this.isDayPlusCanCilck = false
					};
					// 获取心率日数据
					this.querySleepStatisticsDetails({
						deviceId: this.temporaryDevices[0],
						startDate: this.getNowFormatDate(new Date(),2)
					})
				};
				if (index == 1) {
					this.weekMap = this.getWeek(new Date());
					this.currentStartWeekDate = `${this.weekMap['syear']}-${this.weekMap["stext"]}`;
					this.currentEndWeekDate = `${this.weekMap['eyear']}-${this.weekMap["etext"]}`;
					this.initWeekDate = this.getNowFormatDateText(new Date(this.currentStartWeekDate),3);
					let temporaryDate = this.getNowFormatDate(new Date(),3);
					if (new Date(this.currentEndWeekDate).getTime() >= new Date(temporaryDate).getTime()) {
						this.isWeekPlusCanCilck = false
					};
					// 获取心率周数据
					this.querySleepStatisticsDetailsOther({
						deviceId: this.temporaryDevices[0],
						startDate: this.currentStartWeekDate,
						endDate: this.currentEndWeekDate
					},'week')
				};
				if (index == 2) {
					this.currentMonthDate = this.getNowFormatDate(new Date(),3);
					this.initMonthDate = this.getNowFormatDateText(new Date(`${this.currentMonthDate}-01`),3);
					let temporaryDate = this.getNowFormatDate(new Date(),3);
					if (new Date(this.currentMonthDate).getTime() >= new Date(temporaryDate).getTime()) {
						this.isMonthPlusCanCilck = false
					};
					// let currentData = new Date().getDate();
					// if (currentData < 10) {
					// 	currentData = '0'+currentData
					// };
					let arr = this.currentMonthDate.split("-");
					let year = arr[0]; //获取当前日期的年份
					let month = arr[1]; //获取当前日期的月份
					let year2 = year;
					let month2 = parseInt(month) - 1;
					if (month2 == 0) {
						//1月的上一月是前一年的12月
						year2 = parseInt(year2) - 1;
						month2 = 12;
					};
					if (month2 < 10) {
						//10月之前都需要补0
						month2 = "0" + month2;
					};
					let preMonth = year2 + "-" + month2;
					this.currentMonthDays = this.getMonthDay(year2,month2);
					// 获取心率月数据
					this.querySleepStatisticsDetailsOther({
						deviceId: this.temporaryDevices[0],
						startDate: `${this.currentMonthDate}-01`,
						endDate: `${this.currentMonthDate}-${this.currentMonthDays}`
					},'month')
				} 
			},
			
			// 进入健康小知识详情事件
			healthTipsDetailsEvent () {
				uni.redirectTo({
					url: '/healthMonitoringPackage/pages/healthHeartRateTips/healthHeartRateTips'
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
			background: #F5F5F5;
			overflow: auto;
			.content-top-area {
				background: #fff;
				height: 470px;
				display: flex;
				flex-direction: column;
				.content-top-title {
					width: 70%;
					height: 41px;
					margin: 0 auto;
					margin-top: 20px;
					::v-deep .u-subsection {
						// .u-item-bg {
						// 	height: 24px !important;
						// 	bottom: 5px !important
						// }
					}
				};
				.content-top-content {
					flex: 1;
					.day-data-area {
						display: flex;
						flex-direction: column;
						height: 100%;
						.data-top {
							width: 70%;
							margin: 0 auto;
							padding: 10px 0;
							box-sizing: border-box;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							>view {
								width: 100%;
								font-size: 14px;
								color: #101010;
								text-align: center;
								&:nth-child(1) {
									display: flex;
									justify-content: space-between;
								};
								&:nth-child(2) {
									margin: 6px 0;
									height: 20px;
								};
								&:last-child {
									font-size: 18px;
									height: 20px;
								}
							}
						};
						.data-bottom {
							flex: 1;
							position: relative;
							::v-deep .u-empty {
							 	position: absolute;
							 	top: 40%;
							 	left: 50%;
							 	transform: translate(-50%,-50%)
							}
						}
					}
				}
			};
			.content-bottom-area {
				margin-top: 8px;
				padding: 10px;
				box-sizing: border-box;
				background: #fff;
				> view {
					margin-bottom: 10px;
					border-radius: 10px;;
					box-shadow: 0px 1px 3px 0 rgba(163, 151, 151, 0.4);
					padding: 8px 12px;
					box-sizing: border-box;
				};
				.data-overview {
					height: 208px;
					display: flex;
					padding-top: 0 !important;
					flex-direction: column;
					.data-top {
						height: 42px;
						display: flex;
						align-items: center;
						box-sizing: border-box;
						@include bottom-border-1px(#BBBBBB);
						>image {
							width: 24px;
							height: 24px;
							margin-right: 10px;
							vertical-align: middle;
						};
						>text {
							font-size: 14px;
							color: #101010;
							vertical-align: middle;
						}
					};
					.data-content {
						flex: 1;
						padding: 16px 26px;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.data-content-top {
							display: flex;
							justify-content: space-between;
							.content-top-left {
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								align-items: center;
								>text {
									&:first-child {
										font-size: 18px;
										color: #101010;
										margin-bottom: 4px;
									};
									&:last-child {
										font-size: 12px;
										color: #9C9FA3;
									}
								}
							};
							.content-top-right {
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								align-items: center;
								>text {
									&:first-child {
										font-size: 18px;
										color: #101010;
										margin-bottom: 4px;
									};
									&:last-child {
										font-size: 12px;
										color: #9C9FA3;
									}
								}
							};
						};
						.data-content-bottom {
							display: flex;
							justify-content: space-between;
							.content-bottom-left {
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								align-items: center;
								>text {
									&:first-child {
										font-size: 18px;
										color: #101010;
										margin-bottom: 4px;
									};
									&:last-child {
										font-size: 12px;
										color: #9C9FA3;
									}
								}
							};
							.content-bottom-right {
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								align-items: center;
								>text {
									&:first-child {
										font-size: 18px;
										color: #101010;
										margin-bottom: 4px;
									};
									&:last-child {
										font-size: 12px;
										color: #9C9FA3;
									}
								}
							};
						};
					}
				};
				.daytime-nap {
					height: 91px;
					display: flex;
					flex-direction: column;
					.daytime-nap-top {
						>image {
							width: 24px;
							height: 24px;
							margin-right: 10px;
							vertical-align: middle;
						};
						>text {
							font-size: 14px;
							color: #101010;
							vertical-align: middle;
						}
					};
					.daytime-nap-bottom {
						flex: 1;
						display: flex;
						align-items: center;
						font-size: 18px;
						color: #101010;
					}
				};
				.health-tips {
					height: 91px;
					display: flex;
					flex-direction: column;
					height: 134px;
					.health-tips-top {
						>image {
							width: 24px;
							height: 24px;
							margin-right: 10px;
							vertical-align: middle;
						};
						>text {
							font-size: 14px;
							color: #101010;
							vertical-align: middle;
						}
					};
					.health-tips-bottom {
						flex: 1;
						display: flex;
						align-items: center;
						font-size: 14px;
						color: #101010;
						text-align: justify;
						text-indent: 12px;
					};
				}
			}
		}
	}
</style>



