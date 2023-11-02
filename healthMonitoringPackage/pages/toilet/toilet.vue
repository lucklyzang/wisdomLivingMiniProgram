<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="入厕" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="content-top-area">
				<view class="content-top-title">
					<u-subsection :list="itemList" :current="currentItem" @change="change"></u-subsection>
				</view>
				<view class="content-top-content">
					<view class="day-data-area day-data-area-other" v-if="currentItem == 0">
						<view class="data-top">
							<view>
								<u-icon name="arrow-left" size="40" color="#101010" @click="getCurrentDate('minus')"></u-icon>
								<text>{{ `${getNowFormatDateText(currentDayTime)} ${judgeWeek(currentDayTime)}`}}</text>
								<u-icon name="arrow-right" size="40" :color="isDayPlusCanCilck ? '#101010' : '#c9c9c9'" @click="getCurrentDate('plus')"></u-icon>
							</view>
							<view>
								<!-- <text>{{ initDayTime }}</text> -->
								<text>入厕</text>
							</view>
							<!-- <view>
								<text>89次/分钟</text>
							</view> -->
						</view>
						<view class="data-bottom">
							<u-empty text="暂无数据" v-if="!dayChartData.isShow"></u-empty>
							<qiun-data-charts v-if="dayChartData.isShow" type="bar" :canvas2d="true" canvasId="ak89fghkdj4ggfdsfg45" :ontouch="true" :opts="toiletOpts" :chartData="dayChartData['data']" />
						</view>
						<view class="toilet-chart-message" v-if="!dayChartData.noData">
							<view class="time-bar">
								<view class="time-line"></view>
								<view class="time-text">
									<text>00:00</text>
									<text>04:00</text>
									<text>08:00</text>
									<text>12:00</text>
									<text>16:00</text>
									<text>20:00</text>
									<text>23:59</text>
								</view>
							</view>
							<view class="icon-bar">
								<view>
									<text></text>
									<text>未检测到人体</text>
								</view>
								<view>
									<text></text>
									<text>入厕</text>
								</view>
							</view>
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
						</view>
						<view class="data-bottom">
							<u-empty text="暂无数据" v-if="!weekChartData.isShow"></u-empty>
							<qiun-data-charts @getIndex="getWeekIndexEvent" v-if="weekChartData.isShow" :canvas2d="true" canvasId="abcdehdkah56dfdf8asfdf56k" type="column" :opts="toiletWeekOpts" :ontouch="true" :inScrollView="true" :chartData="weekChartData.data" />
						</view>
						<view class="icon-bar" v-if="!weekChartData.noData">
							<view>
								<text></text>
								<text>未检测到人体</text>
							</view>
							<view>
								<text></text>
								<text>入厕</text>
							</view>
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
						</view>
						<view class="data-bottom">
							<u-empty text="暂无数据" v-if="!monthChartData.isShow"></u-empty>
							<qiun-data-charts @getIndex="getMonthIndexEvent" v-if="monthChartData.isShow" :canvas2d="true" canvasId="abcdehhdjskhder8asfdf56k" type="column" :opts="toiletMonthOpts" :ontouch="true" :inScrollView="true" :chartData="monthChartData.data" />
						</view>
						<view class="icon-bar" v-if="!monthChartData.noData">
							<view>
								<text></text>
								<text>未检测到人体</text>
							</view>
							<view>
								<text></text>
								<text>入厕</text>
							</view>
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
								<text>{{`${stool}次`}}</text>
								<text>大便次数</text>
							</view>
							<view class="content-top-right">
								<text>{{`${urinate}次`}}</text>
								<text>小便次数</text>
							</view>
						</view>
						<view class="data-content-bottom">
							<view class="content-bottom-left">
								<text>{{`${stoolAverageTime}分钟`}}</text>
								<text>大便平均时间</text>
							</view>
							<view class="content-bottom-right">
								<text>{{`${urinateAverageTime}分钟`}}</text>
								<text>小便平均时间</text>
							</view>
						</view>
					</view>
				</view>
				<view class="health-tips">
					<view class="health-tips-top">
						<image :src="daytimeNapIconPng"></image>
						<text>健康小知识</text>
					</view>
					<view class="health-tips-bottom" @click="healthTipsDetailsEvent">
						<text>一般来说，排便5-10分钟左右算正常，但存在个体差异性。具体情况如下：排便的时间通常与年龄、饮食习惯、运动等因素有关。一般情况下，普通人排便......</text>
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
	import { createVisitPageData, exitPageData } from '@/api/user.js'
	import { toiletDetails } from '@/api/device.js'
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
				currentItem: 0,
				isDayPlusCanCilck: true,
				isMonthPlusCanCilck: true,
				currentWeekXaxisArr: [],
				currentMonthXaxisArr: [],
				currentMonthYaxisArr: [],
				currentWeekYaxisArr: [],
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
				visitPageId: '',
				stool: '',
				urinate: '',
				stoolAverageTime: '',
				urinateAverageTime: '',
				dayChartData: {
					isShow: true,
					noData: false,
					data: {}
				},
				weekChartData: {
					isShow: true,
					noData: false,
					data: {}
				},
				monthChartData: {
					isShow: true,
					noData: false,
					data: {}
				},
				toiletOpts: {
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
							type: 'stack',
							width: 20
						}
					}
				},
				toiletWeekOpts: {
					color: ["#F0F0F0"],
					dataLabel: false,
					padding: [10,10,0,10],
					enableScroll: true,
					legend: {
						show: false
					},
					xAxis: {
						itemCount: 7
					},
					yAxis: {
						splitNumber: 5,
						data: [
							{
								format: 'yAxisDemoMix'
							}
						]
					},
					extra: {
						column: {
							type: 'stack',
							width: 20,
							categoryGap: 2
						},
						tooltip: {
							showBox: false
						}
					}
				},
				toiletMonthOpts: {
					color: ["#F0F0F0"],
					dataLabel: false,
					padding: [10,10,0,10],
					enableScroll: true,
					legend: {
						show: false
					},
					xAxis: {
						itemCount: 7,
						scrollShow: true
					},
					yAxis: {
						splitNumber: 5,
						data: [
							{
								format: 'yAxisDemoMix'
							}
						]
					},
					extra: {
						column: {
							type: 'stack',
							width: 20,
							categoryGap: 2
						},
						tooltip: {
							showBox: false
						}
					}
				}
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
			// 获取入厕数据日
			this.temporaryDevices = [];
			for (let el of this.deviceDataMessage.devices) {
				this.temporaryDevices.push(el.device)
			};
			// 获取入厕数据周
			this.queryToiletDetails({
				deviceId: this.temporaryDevices[0],
				startDate: this.getNowFormatDate(new Date(),2),
				endDate: this.getNowFormatDate(new Date(),2)
			},'day')
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
		mounted() {
		},
		methods: {
			...mapMutations([
				'changeOverDueWay'
			]),
			
			// 创建页面访问数据
			createVisitPage () {
				createVisitPageData({
					pageName: "健康-入厕详情(日周月)",
					pageKey: "toilet"
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
			
			// 获取周数据当前点击索引
			getWeekIndexEvent (e) {
				if (e.currentIndex['index'] == -1) { return };
				this.initWeekDate = this.getNowFormatDateText(this.currentWeekXaxisArr[e.currentIndex['index']]);
				this.currentWeekDate = this.getNowFormatDate(new Date(this.currentWeekXaxisArr[e.currentIndex['index']]),2);
				this.stool = this.currentWeekYaxisArr[e.currentIndex['index']]['stool'];
				this.urinate = this.currentWeekYaxisArr[e.currentIndex['index']]['urinate'];
				if (this.currentWeekYaxisArr[e.currentIndex['index']]['stoolTime'] == 0) {
					this.stoolAverageTime = 0
				} else {
					this.stoolAverageTime = Math.ceil(this.currentWeekYaxisArr[e.currentIndex['index']]['stoolTime']/this.currentWeekYaxisArr[e.currentIndex['index']]['stool']);
				};
				if (this.currentWeekYaxisArr[e.currentIndex['index']]['urinateTime'] == 0) {
					this.urinateAverageTime = 0
				} else {
					this.urinateAverageTime = Math.ceil(this.currentWeekYaxisArr[e.currentIndex['index']]['urinateTime']/this.currentWeekYaxisArr[e.currentIndex['index']]['urinate']);
				}
			},
			
			// 获取月数据当前点击索引
			getMonthIndexEvent (e) {
				if (e.currentIndex['index'] == -1) { return };
				this.initMonthDate = this.getNowFormatDateText(this.currentMonthXaxisArr[e.currentIndex['index']]);
				this.currentMonthDate = this.getNowFormatDate(new Date(this.currentMonthXaxisArr[e.currentIndex['index']]),2);
				this.stool = this.currentMonthYaxisArr[e.currentIndex['index']]['stool'];
				this.urinate = this.currentMonthYaxisArr[e.currentIndex['index']]['urinate'];
				if (this.currentMonthYaxisArr[e.currentIndex['index']]['stoolTime'] == 0) {
					this.stoolAverageTime = 0
				} else {
					this.stoolAverageTime = Math.ceil(this.currentMonthYaxisArr[e.currentIndex['index']]['stoolTime']/this.currentMonthYaxisArr[e.currentIndex['index']]['stool']);
				};
				if (this.currentMonthYaxisArr[e.currentIndex['index']]['urinateTime'] == 0) {
					this.urinateAverageTime = 0
				} else {
					this.urinateAverageTime = Math.ceil(this.currentMonthYaxisArr[e.currentIndex['index']]['urinateTime']/this.currentMonthYaxisArr[e.currentIndex['index']]['urinate']);
				}
			},
			
			// 获取入厕数据
			queryToiletDetails (data,text) {
				this.stool = '';
				this.urinate = '';
				this.stoolAverageTime = '';
				this.urinateAverageTime = '';
				if (text == 'day') {
					this.dayChartData = {
						isShow: true,
						noData: true,
						data: {}
					}
				} else if (text == 'week') {
					this.currentWeekXaxisArr = [];
					this.currentWeekYaxisArr = [];
					this.weekChartData = {
						isShow: true,
						noData: true,
						data: {}
					}
				} else if (text == 'month') {
					this.currentMonthXaxisArr = [];
					this.currentMonthYaxisArr = [];
					this.monthChartData = {
						isShow: true,
						noData: true,
						data: {}
					}
				};
				toiletDetails(data).then((res) => {
					if ( res && res.data.code == 0) {
						if (text == 'day') {
							let questData = res.data.data;
							if ( questData.length == 0 ) {
								this.stool = '-';
								this.urinate = '-';
								this.stoolAverageTime = '-';
								this.urinateAverageTime = '-';
								this.dayChartData = {
									isShow: false,
									noData: true,
									data: {}
								}
							} else {
								this.dayChartData['isShow'] = true;
								this.dayChartData['noData'] = false;
								this.stool = questData[0]['stool'];
								this.urinate = questData[0]['urinate'];
								this.stoolAverageTime = questData[0]['stoolTime'] == 0 ? 0 : Math.ceil(questData[0]['stoolTime']/this.stool);
								this.urinateAverageTime = questData[0]['urinateTime'] == 0 ? 0 : Math.ceil(questData[0]['urinateTime']/this.urinate);
								// type是否如厕 0-否， 1-是
								let temporaryData = {
									categories: ['7-4'],
									series: []
								};
								questData[0]['itemList'].forEach((item,index) => {
									if (item.type == 0) {
										temporaryData['series'].push(
											{
												name: "未检测到人体",
												color: "#F0F0F0",
												data: [1]
											}
										)
									} else if (item.type == 1) {
										temporaryData['series'].push(
											{
												name: "入厕",
												color: "#289E8E",
												data: [20]
											}
										)
									}
								});
								let temporaryContent = JSON.parse(JSON.stringify(temporaryData));
								this.dayChartData['data'] = temporaryContent
							}
						}	else if (text == 'week') {
							if (res.data.data.length > 0) {
								let questData = res.data.data;
								if (questData[0]['date'] == this.currentStartWeekDate) {
									this.stool = questData[0]['stool'];
									this.urinate = questData[0]['urinate'];
									this.stoolAverageTime = questData[0]['stoolTime'] == 0 ? 0 : Math.ceil(questData[0]['stoolTime']/this.stool);
									this.urinateAverageTime = questData[0]['urinateTime'] == 0 ? 0 : Math.ceil(questData[0]['urinateTime']/this.urinate);
								} else {
									this.stool = '-';
									this.urinate = '-';
									this.stoolAverageTime = '-';
									this.urinateAverageTime = '-';
								};
								this.weekChartData['isShow'] = true;
								this.weekChartData['noData'] = false;
								let lengthArr = [];
								let maxColumn;
								let temporaryData = {
									categories: [],
									series: []
								};
								questData.forEach((item,index) => {
									temporaryData['categories'].push(this.judgeWeek(item.date));
									this.currentWeekYaxisArr.push(item);
									this.currentWeekXaxisArr.push(item.date);
									lengthArr.push(item.itemList.length);
								});
								// 按所有天中数据最多的那天算(每天的数据条数不一致)
								maxColumn = Math.max.apply(null,lengthArr);
								for (let i = 0;i < maxColumn;i++) {
									temporaryData['series'].push({
										"data": []
									})
								};
								temporaryData['series'].forEach((item,index) => {
									this.currentWeekXaxisArr.forEach((innerItem,innerIndex) => {
										let currentData = questData[innerIndex]['itemList'];
										if (currentData[index]) {
											if (currentData[index]['type'] == 0) {
												item['data'].push(
													{value:1,color:"#F0F0F0"}
												)
											} else if (currentData[index]['type'] == 1) {
												item['data'].push(
													{value:20,color:"#289E8E"}
												)
											}
										} else {
											item['data'].push(
												{value: 1,color: '#F0F0F0'}
											)
										}
									})
								});
								let temporaryContent = JSON.parse(JSON.stringify(temporaryData));
								this.weekChartData['data'] = temporaryContent;
							} else {
								this.stool = '-';
								this.urinate = '-';
								this.stoolAverageTime = '-';
								this.urinateAverageTime = '-';
								this.weekChartData = {
									isShow: false,
									noData: true,
									data: {}
								}
							}
						} else if (text == 'month') {
							if (res.data.data.length > 0) {
								let questData = res.data.data;
								if (questData[0]['date'] == this.currentStartMonthDate) {
									this.stool = questData[0]['stool'];
									this.urinate = questData[0]['urinate'];
									this.stoolAverageTime = Math.ceil(questData[0]['stoolTime']/this.stool);
									this.urinateAverageTime = Math.ceil(questData[0]['urinateTime']/this.urinate);
								} else {
									this.stool = '-';
									this.urinate = '-';
									this.stoolAverageTime = '-';
									this.urinateAverageTime = '-';
								};
								this.monthChartData['noData'] = false;
								this.monthChartData['isShow'] = true;
								let lengthArr = [];
								let maxColumn;
								let temporaryData = {
									categories: [],
									series: []
								};
								questData.forEach((item,index) => {
									temporaryData['categories'].push(this.judgeWeek(item.date));
									this.currentMonthYaxisArr.push(item);
									this.currentMonthXaxisArr.push(item.date);
									lengthArr.push(item.itemList.length);
								});
								// 按所有天中数据最多的那天算(每天的数据条数不一致)
								maxColumn = Math.max.apply(null,lengthArr);
								for (let i = 0;i < maxColumn;i++) {
									temporaryData['series'].push({
										"data": []
									})
								};
								temporaryData['series'].forEach((item,index) => {
									this.currentMonthXaxisArr.forEach((innerItem,innerIndex) => {
										let currentData = questData[innerIndex]['itemList'];
										if (currentData[index]) {
											if (currentData[index]['type'] == 0) {
												item['data'].push(
													{value:1,color:"#F0F0F0"}
												)
											} else if (currentData[index]['type'] == 1) {
												item['data'].push(
													{value:20,color:"#289E8E"}
												)
											}
										} else {
											item['data'].push(
												{value: 1,color: '#F0F0F0'}
											)
										}
									})
								});
								let temporaryContent = JSON.parse(JSON.stringify(temporaryData));
								this.monthChartData['data'] = temporaryContent;
							} else {
								this.stool = '-';
								this.urinate = '-';
								this.stoolAverageTime = '-';
								this.urinateAverageTime = '-';
								this.monthChartData = {
									isShow: false,
									noData: true,
									data: {}
								}
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
				// type:1(只显示小时分钟),2(只显示年月日)3(只显示年月)
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
				if (type == 1) {
					currentdate = hour + seperator2 + minutes
				};
				if (type == 2) {
					currentdate = currentDate.getFullYear() + seperator1 + month + seperator1 + strDate
				};
				if (type == 3) {
					currentdate = currentDate.getFullYear() + seperator1 + month
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
				this.queryToiletDetails({
					deviceId: this.temporaryDevices[0],
					startDate: this.currentDayTime,
					endDate: this.currentDayTime
				},'day')
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
					};
					console.log('当前月',this.currentMonthDate);
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
					console.log('当前月',this.currentMonthDate);
				};
				this.queryToiletDetails({
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
			
			// 获取某月的天数
			getMonthDay(year, month) {
			  let days = new Date(year, month, 0).getDate()
			  return days
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
				this.queryToiletDetails({
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
					// 获取跌倒日数据
					this.queryToiletDetails({
						deviceId: this.temporaryDevices[0],
						startDate: this.getNowFormatDate(new Date(),2),
						endDate: this.getNowFormatDate(new Date(),2)
					},'day')
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
					// 获取跌倒周数据
					this.queryToiletDetails({
						deviceId: this.temporaryDevices[0],
						startDate: this.getNowFormatDate(new Date(),2),
						endDate: this.currentEndWeekDate,
					},'week')
				};
				if (index == 2) {
					this.currentMonthDate = this.getNowFormatDate(new Date(),3);
					this.initMonthDate = this.getNowFormatDateText(new Date(`${this.currentMonthDate}-01`),3);
					let temporaryDate = this.getNowFormatDate(new Date(),3);
					if (new Date(this.currentMonthDate).getTime() >= new Date(temporaryDate).getTime()) {
						this.isMonthPlusCanCilck = false
					};
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
					// 获取跌倒月数据
					this.queryToiletDetails({
						deviceId: this.temporaryDevices[0],
						startDate: `${this.currentMonthDate}-01`,
						endDate: `${this.currentMonthDate}-${this.currentMonthDays}`
					},'month')
				} 
			},
			
			// 进入健康小知识详情事件
			healthTipsDetailsEvent () {
				uni.redirectTo({
					url: '/healthMonitoringPackage/pages/healthToiletTips/healthToiletTips'
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
				padding-top: 20px;
				box-sizing: border-box;
				.content-top-title {
					width: 70%;
					height: 41px;
					background: #fff;
					margin: 0 auto;
					::v-deep .u-subsection {
						// .u-item-bg {
						// 	height: 24px !important;
						// 	bottom: 5px !important
						// }
					}
				};
				.content-top-content {
					.day-data-area-other {
						.data-bottom {
							position: relative;
							height: 200px !important;
							min-height: 200px !important
						}
					};
					.day-data-area {
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
									margin: 6px 0
								};
								&:last-child {
									font-size: 18px
								}
							}
						};
						.data-bottom {
							min-height: 250px;
							position: relative;
							::v-deep .u-empty {
							 	position: absolute;
							 	top: 40%;
							 	left: 50%;
							 	transform: translate(-50%,-50%)
							}
						};
						.icon-bar {
							height: 80px;
							display: flex;
							justify-content: center;
							align-items: center;
							>view {
								width: 100px;
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
											background: #F0F0F0
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
											background: #289E8E
										};
										&:last-child {
											font-size: 14px;
											margin-top: 4px;
											color: #101010
										}
									} 
								}
							}
						};
						.toilet-chart-message {
							height: 120px;
							position: relative;
							.time-bar {
								.time-line {
									width: 100%;
									height: 1px;
									background: #BBBBBB
								};
								.time-text {
									display: flex;
									align-items: center;
									>text {
										flex: 1;
										text-align: center;
										font-size: 14px;
										color: #101010
									}
								}
							};
							.icon-bar {
								height: 80px;
								display: flex;
								justify-content: center;
								align-items: center;
								margin-top: 30px;
								>view {
									width: 100px;
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
												background: #F0F0F0
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
												background: #289E8E
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




