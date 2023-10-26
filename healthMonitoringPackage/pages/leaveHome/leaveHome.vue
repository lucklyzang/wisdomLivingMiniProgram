<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="离家和回家" @backClick="backTo">
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
								<text>{{ initDayText }}</text>
							</view>
						</view>
						<view class="data-bottom">
							<u-empty text="暂无数据" v-if="!dayChartData.isShow"></u-empty>
							<qiun-data-charts @getIndex="getDayIndexEvent" :inScrollView="true" tooltipFormat="tooltipDemo1" v-if="dayChartData.isShow" :canvas2d="true" canvasId="abcdef67sasfdf56k" type="column" :opts="leaveHomeDayOpts" :ontouch="true" :chartData="dayChartData.data" />
						</view>
						<view class="icon-bar" v-if="dayChartData.isShow"></view>
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
							</view>
						</view>
						<view class="data-bottom">
							<u-empty text="暂无数据" v-if="!weekChartData.isShow"></u-empty>
							<qiun-data-charts @getIndex="getWeekIndexEvent" v-if="weekChartData.isShow" :canvas2d="true" canvasId="abcdef67dfdfdf8asfdf56k" type="column" :opts="leaveHomeWeekOpts" :ontouch="true" :inScrollView="true" :chartData="weekChartData.data" />
						</view>
						<view class="icon-bar" v-if="weekChartData.isShow">
							<view>
								<text></text>
								<text>离家</text>
							</view>
							<view>
								<text></text>
								<text>回家</text>
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
							<view>
							</view>
						</view>
						<view class="data-bottom">
							<u-empty text="暂无数据" v-if="!monthChartData.isShow"></u-empty>
							<qiun-data-charts @getIndex="getMonthIndexEvent" :inScrollView="true" v-if="monthChartData.isShow" :canvas2d="true" canvasId="abcdef67sasfdsd8956k" type="column" :opts="leaveHomeMonthOpts" :ontouch="true" :chartData="monthChartData.data" />
						</view>
						<view class="icon-bar" v-if="monthChartData.isShow">
							<view>
								<text></text>
								<text>离家</text>
							</view>
							<view>
								<text></text>
								<text>回家</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="content-center-area">
				<view class="health-tips">
					<view class="health-tips-top">
						<image :src="daytimeNapIconPng"></image>
						<text>温馨提示</text>
					</view>
					<view class="health-tips-bottom" @click="healthTipsDetailsEvent">
						<text>老年人外出要警惕两件事，可大大降低心梗风险！第一是出门前记得上一次厕所，并且每次上完厕所之后要注意缓慢起身；因为憋尿的时候会让人体的交感神经.....</text>
					</view>
				</view>
			</view>
			<view class="content-bottom-area">
				<u-empty text="暂无数据" v-if="isShowNoHomeNoData"></u-empty>
				<scroll-view class="scroll-view" scroll-y="true"  @scrolltolower="scrolltolower">
					<view class="data-overview-list" v-for="(item,index) in fullRecordList" :key="index">
						<view class="overview-list-left">
							<image :src="leaveHomeListIconPng" v-if="item.goOut"></image>
							<image :src="goHomeIconPng" v-if="item.enter"></image>
							<text>{{ getNowFormatDate(new Date(item.createTime),4) }}</text>
						</view>
						<view class="overview-list-right">
							<text v-if="item.goOut">离家</text>
							<text v-if="item.enter">回家</text>
						</view>
					</view>
					<u-loadmore :status="status" v-show="fullRecordList.length > 0" />
				</scroll-view>
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
	import { enterLeaveHomeDetails, getBodyDetectionRadarDetails } from '@/api/device.js'
	import { createVisitPageData, exitPageData } from '@/api/user.js'
	export default {
		components: {
			navBar
		},
		data() {
			return {
				infoText: '',
				showLoadingHint: false,
				daytimeNapIconPng: require("@/static/img/daytime-nap-icon.png"),
				leaveHomeListIconPng: require("@/static/img/leave-home-list-icon.png"),
				goHomeIconPng: require("@/static/img/go-home-icon.png"),
				itemList: [{
					name: '日'
				}, {
					name: '周'
				}, {
					name: '月'
				}],
				isShowNoHomeNoData: false,
				currentPageNum: 1,
				pageSize: 20,
				totalCount: 0,
				status: 'nomore',
				fullRecordList: [],
				recordList: [],
				currentItem: 0,
				isDayPlusCanCilck: true,
				isMonthPlusCanCilck: true,
				isWeekPlusCanCilck: true,
				currentDayTime: '',
				initDayTime: '',
				initDayText: '',
				currentStartWeekDate: '',
				currentEndWeekDate: '',
				initWeekDate: '',
				currentWeekDate: '',
				currentMonthDate: '',
				currentMonthDays: '',
				initMonthDate: '',
				currentMonthDate: '',
				weekMap: {},
				currentWeekXaxisArr: [],
				currentMonthXaxisArr: [],
				temporaryDevices: [],
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
				leaveHomeDayOpts: {
					color: ["#F2A15F","#289E8E"],
					dataLabel: false,
					padding: [10,10,10,10],
					enableScroll: true,
					tooltip: { showBox: true},
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
						column: {
							width: 6,
							categoryGap: 2
						}
					}
				},
				leaveHomeWeekOpts: {
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
				leaveHomeMonthOpts: {
					dataLabel: false,
					padding: [10,10,0,10],
					enableScroll: true,
					legend: {
						show: false
					},
					xAxis: {
						scrollShow: true,
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
			// 获取离家和回家日数据
			this.temporaryDevices = [];
			for (let el of this.deviceDataMessage.devices) {
				this.temporaryDevices.push(el.device)
			};
			this.queryEnterLeaveHomeDetails({
				deviceId: this.temporaryDevices[0],
				startDate: this.getNowFormatDate(new Date(),2),
				endDate: this.getNowFormatDate(new Date(),2)
			},'day');
			// 获取离家回家数据详情
			this.queryBodyDetectionRadar({
				pageNo: this.currentPageNum,
				pageSize: this.pageSize,
				deviceId: this.temporaryDevices[0],
				queryDate: this.getNowFormatDate(new Date(),2)
			},true,false)
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
					pageName: "健康-离家回家详情(日周月)",
					pageKey: "leaveHome"
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
				if (!e['opts']['chartData']['legendData']['points'][0][0]['data'][e.currentIndex['index']] && !e['opts']['chartData']['legendData']['points'][0][1]['data'][e.currentIndex['index']]){
					this.initDayText = '';
				} else if (!e['opts']['chartData']['legendData']['points'][0][0]['data'][e.currentIndex['index']]) {
					this.initDayText = '回家';
				} else if (!e['opts']['chartData']['legendData']['points'][0][1]['data'][e.currentIndex['index']]) {
					this.initDayText = '离家';
				} else {
					this.initDayText = '回家、离家';
				};
				console.log('点击数据',this.initDayText);
			},
			
			// 获取周数据当前点击索引
			getWeekIndexEvent (e) {
				if (e.currentIndex['index'] == -1) { return };
				this.initWeekDate = this.getNowFormatDateText(this.currentWeekXaxisArr[e.currentIndex['index']]);
				this.currentWeekDate = this.getNowFormatDate(new Date(this.currentWeekXaxisArr[e.currentIndex['index']]),2);
				// 获取离、回家天数据详情
				this.queryBodyDetectionRadar({
					pageNo: this.currentPageNum,
					pageSize: this.pageSize,
					deviceId: this.temporaryDevices[0],
					queryDate: this.currentWeekDate
				},false,true)
			},
			
			// 获取月数据当前点击索引
			getMonthIndexEvent (e) {
				if (e.currentIndex['index'] == -1) { return };
				this.initMonthDate = this.getNowFormatDateText(this.currentMonthXaxisArr[e.currentIndex['index']]);
				this.currentMonthDate = this.getNowFormatDate(new Date(this.currentMonthXaxisArr[e.currentIndex['index']]),2);
				// 获取离、回家天数据详情
				this.queryBodyDetectionRadar({
					pageNo: this.currentPageNum,
					pageSize: this.pageSize,
					deviceId: this.temporaryDevices[0],
					queryDate: this.currentMonthDate
				},false,true)
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
			
			// 获取离回家数据详情
			queryEnterLeaveHomeDetails (data,type) {
				this.dayChartData = {
					isShow: true,
					data: {}
				};
				this.weekChartData = {
					isShow: true,
					data: {}
				};
				this.monthChartData = {
					isShow: true,
					data: {}
				};
				enterLeaveHomeDetails(data).then((res) => {
					if ( res && res.data.code == 0) {
						if (type == 'day') {
							this.initDayText = '';
							this.initDayTime = '';
							this.dayChartData['isShow'] = true;
							if (res.data.data.length > 0) {
								this.dayChartData['isShow'] = true;
								let questData = res.data.data[0]['ruleDataVO'];
								if (questData.details[0]['enter'] && questData.details[0]['goOut']) {
									this.initDayText = '离家、回家';
								} else if (questData.details[0]['enter']) {
									this.initDayText = '离家';
								} else if (questData.details[0]['goOut']) {
									this.initDayText = '回家';
								} else {
									this.initDayText = '-';
								};
								this.initDayTime = this.getNowFormatDate(new Date(questData.details[0]['createTime']),1);
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
									temporaryData['categories'].push(this.getNowFormatDate(new Date(item.createTime),1));
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
								this.dayChartData['data'] = temporaryContent;
							} else {
								this.dayChartData = {
									isShow: false,
									data: {}
								};
								this.initDayText = '-';
								this.initDayTime = '-';
							}
						} else if (type == 'week') {
							this.weekChartData['isShow'] = true;
							this.currentWeekXaxisArr = [];
							if (res.data.data.length > 0) {
								let questData = res.data.data;
								this.weekChartData['isShow'] = true;
								let lengthArr = [];
								let maxColumn;
								let temporaryData = {
									categories: [],
									series: []
								};
								questData.forEach((item,index) => {
									temporaryData['categories'].push(this.judgeWeek(item.date));
									this.currentWeekXaxisArr.push(item.date);
									lengthArr.push(item.ruleDataVO.details.length);
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
										let currentData = questData[innerIndex]['ruleDataVO']['details'];
										if (currentData[index]) {
											if (currentData[index]['enter']) {
												item['data'].push(
													{value:1,color:"#289E8E"}
												)
											} else if (currentData[index]['goOut']) {
												item['data'].push(
													{value:1,color:"#E86F50"}
												)
											} else if (!currentData[index]['goOut']) {
												item['data'].push(
													{value:1,color:"#289E8E"}
												)
											} else if (!currentData[index]['enter']) {
												item['data'].push(
													{value:1,color:"#E86F50"}
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
								this.weekChartData = {
									isShow: false,
									data: {}
								};
							}
						} else if (type == 'month') {
							this.currentMonthXaxisArr = [];
							this.monthChartData['isShow'] = true;
							if (res.data.data.length > 0) {
								let questData = res.data.data;
								this.monthChartData['isShow'] = true;
								let lengthArr = [];
								let maxColumn;
								let temporaryData = {
									categories: [],
									series: []
								};
								questData.forEach((item,index) => {
									temporaryData['categories'].push(this.getNowFormatDate(new Date(item.date),5));
									this.currentMonthXaxisArr.push(item.date);
									lengthArr.push(item.ruleDataVO.details.length);
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
										let currentData = questData[innerIndex]['ruleDataVO']['details'];
										if (currentData[index]) {
											if (currentData[index]['enter']) {
												item['data'].push(
													{value:1,color:"#289E8E"}
												)
											} else if (currentData[index]['goOut']) {
												item['data'].push(
													{value:1,color:"#E86F50"}
												)
											} else if (!currentData[index]['goOut']) {
												item['data'].push(
													{value:1,color:"#289E8E"}
												)
											} else if (!currentData[index]['enter']) {
												item['data'].push(
													{value:1,color:"#E86F50"}
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
								this.monthChartData = {
									isShow: false,
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
				// 获取离、回家天数据
				this.queryEnterLeaveHomeDetails({
					deviceId: this.temporaryDevices[0],
					startDate: this.currentDayTime,
					endDate: this.currentDayTime
				},'day');
				// 获取离、回家天数据详情
				this.queryBodyDetectionRadar({
					pageNo: this.currentPageNum,
					pageSize: this.pageSize,
					deviceId: this.temporaryDevices[0],
					queryDate: this.currentDayTime
				},false,true)
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
				// 获取离、回家月数据
				this.queryEnterLeaveHomeDetails({
					deviceId: this.temporaryDevices[0],
					startDate: `${this.currentMonthDate}-01`,
					endDate: `${this.currentMonthDate}-${this.currentMonthDays}`
				},'month');
				// 获取离、回家天数据详情
				this.queryBodyDetectionRadar({
					pageNo: this.currentPageNum,
					pageSize: this.pageSize,
					deviceId: this.temporaryDevices[0],
					queryDate: `${this.currentMonthDate}-01`
				},false,true)
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
					this.initWeekDate = this.getNowFormatDateText(new Date(this.currentStartWeekDate),3);
					this.currentEndWeekDate = `${this.weekMap['eyear']}-${this.weekMap["etext"]}`;
					console.log('周',this.currentStartWeekDate,this.currentEndWeekDate)
				};
				// 获取离、回家周数据
				this.queryEnterLeaveHomeDetails({
					deviceId: this.temporaryDevices[0],
					startDate: this.currentStartWeekDate,
					endDate: this.currentEndWeekDate
				},'week');
				// 获取离、回家天数据详情
				this.queryBodyDetectionRadar({
					pageNo: this.currentPageNum,
					pageSize: this.pageSize,
					deviceId: this.temporaryDevices[0],
					queryDate: this.currentStartWeekDate
				},false,true)
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
			
			// 获取某月的天数
			getMonthDay(year, month) {
			  let days = new Date(year, month, 0).getDate()
			  return days
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
					// 获取离家和回家天数据
					this.queryEnterLeaveHomeDetails({
						deviceId: this.temporaryDevices[0],
						startDate: this.getNowFormatDate(new Date(),2),
						endDate: this.getNowFormatDate(new Date(),2)
					},'day');
					// 获取离、回家天数据详情
					this.queryBodyDetectionRadar({
						pageNo: this.currentPageNum,
						pageSize: this.pageSize,
						deviceId: this.temporaryDevices[0],
						queryDate: this.getNowFormatDate(new Date(),2)
					},false,true)
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
					// 获取离家和回家周数据
					this.queryEnterLeaveHomeDetails({
						deviceId: this.temporaryDevices[0],
						startDate: this.currentStartWeekDate,
						endDate: this.currentEndWeekDate
					},'week');
					// 获取离、回家天数据详情
					this.queryBodyDetectionRadar({
						pageNo: this.currentPageNum,
						pageSize: this.pageSize,
						deviceId: this.temporaryDevices[0],
						queryDate: this.currentStartWeekDate
					},false,true)
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
					// 获取离家和回家月数据
					this.queryEnterLeaveHomeDetails({
						deviceId: this.temporaryDevices[0],
						startDate: `${this.currentMonthDate}-01`,
						endDate: `${this.currentMonthDate}-${this.currentMonthDays}`
					},'month');
					// 获取离、回家天数据详情
					this.queryBodyDetectionRadar({
						pageNo: this.currentPageNum,
						pageSize: this.pageSize,
						deviceId: this.temporaryDevices[0],
						queryDate: `${this.currentMonthDate}-01`
					},false,true)
				} 
			},
			
			// 获取离家回家详情日志
			queryBodyDetectionRadar (data,flag,isInit) {
				this.recordList = [];
				if (isInit) {
					this.isShowNoHomeNoData = false;
					data.pageNo = 1;
					this.fullRecordList = []
				};
				if (flag) {
					this.showLoadingHint = true
				} else {
					this.showLoadingHint = false;
					this.status = 'loading';
				};
				getBodyDetectionRadarDetails(data).then((res) => {
					if ( res && res.data.code == 0) {
						this.totalCount = res.data.data.total;
						this.recordList = res.data.data.list;
						this.fullRecordList = this.fullRecordList.concat(this.recordList);
						if (this.fullRecordList.length == 0) {
							this.isShowNoHomeNoData = true
						} else {
							this.isShowNoHomeNoData = false
						}
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error',
							position: 'bottom'
						})
					};
					if (flag) {
						this.showLoadingHint = false;
					} else {
						let totalPage = Math.ceil(this.totalCount/this.pageSize);
						if (this.currentPageNum >= totalPage) {
							this.status = 'nomore'
						} else {
							this.status = 'loadmore'
						}
					}
				})
				.catch((err) => {
					if (flag) {
						this.showLoadingHint = false;
					} else {
						this.status = 'loadmore'
					};
					this.$refs.uToast.show({
						title: err.message,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			scrolltolower () {
				let totalPage = Math.ceil(this.totalCount/this.pageSize);
				if (this.currentPageNum >= totalPage) {
					this.status = 'nomore'
				} else {
					this.status = 'loadmore';
					this.currentPageNum = this.currentPageNum + 1;
					this.queryBodyDetectionRadar({
						pageNo: this.currentPageNum,
						pageSize: this.pageSize,
						deviceId: this.temporaryDevices[0],
						queryDate: this.currentDayTime
					},false,false)
				}
			},
			
			// 进入健康小知识详情事件
			healthTipsDetailsEvent () {
				uni.redirectTo({
					url: '/healthMonitoringPackage/pages/healthLeaveHomeTips/healthLeaveHomeTips'
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
				height: 450px;
				display: flex;
				flex-direction: column;
				.content-top-title {
					width: 70%;
					height: 41px;
					margin: 0 auto;
					margin-top: 20px;
					::v-deep .u-subsection {
						.u-item {
							.u-item-text {}
						};
						.u-item-bg {
							// height: 25px !important;
							// bottom: 5px !important
						}
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
									font-size: 14px
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
						};
						.icon-bar {
							height: 30px;
							display: flex;
							justify-content: center;
							align-items: center;
							>view {
								&:first-child {
									margin-right: 10px;
									>text {
										display: inline-block;
										&:first-child {
											width: 16px;
											height: 10px;
											background: #E86F50;
											margin-right: 4px;
										};
										&:last-child {
											font-size: 14px;
											color: #101010
										}
									} 
								};
								&:last-child {
									>text {
										display: inline-block;
										&:first-child {
											width: 16px;
											height: 10px;
											background: #289E8E;
											margin-right: 4px;
										};
										&:last-child {
											font-size: 14px;
											color: #101010
										}
									} 
								}
							}
						}
					}
				}
			};
			.content-center-area {
				margin-top: 8px;
				padding: 10px;
				box-sizing: border-box;
				margin-bottom: 10px;
				background: #fff;
				.health-tips {
					border-radius: 10px;;
					box-shadow: 0px 1px 3px 0 rgba(163, 151, 151, 0.4);
					padding: 8px 12px;
					box-sizing: border-box;
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
					}
				}
			};
			.content-bottom-area {
				// flex: 1;
				height: 250px;
				padding: 10px;
				box-sizing: border-box;
				background: #fff;
				position: relative;
				overflow: auto;
				.scroll-view {
					height: 100%
				};
				::v-deep .u-empty {
				 	position: absolute;
				 	top: 50%;
				 	left: 50%;
				 	transform: translate(-50%,-50%)
				};
				.data-overview-list {
					margin-bottom: 10px;
					border-radius: 10px;;
					box-shadow: 0px 1px 3px 0 rgba(163, 151, 151, 0.4);
					padding: 8px 12px;
					box-sizing: border-box;
					height: 65px;
					display: flex;
					padding: 10px;
					box-sizing: border-box;
					align-items: center;
					justify-content: space-between;
					.overview-list-left {
						>image {
							width: 19px;
							height: 19px;
							vertical-align: middle;
							margin-right: 14px;
							&:nth-child(1) {
								margin-right: 2px
							}
						};
						>text {
							font-size: 14px;
							color: #101010;
							vertical-align: middle;
							margin-left: 10px
						}
					};
					.overview-list-right {
						font-size: 14px;
						color: #101010;
						>text {
							&:nth-child(1) {
								margin-right: 4px
							}
						}
					}
				}
			}
		}
	}
</style>






