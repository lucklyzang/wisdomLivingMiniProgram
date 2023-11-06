<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="跌倒" @backClick="backTo">
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
								<text>跌倒</text>
							</view>
							<!-- <view>
								<text>2分钟</text>
							</view> -->
						</view>
						<view class="data-bottom">
							<u-empty text="暂无数据" v-if="!dayChartData.isShow"></u-empty>
							<qiun-data-charts v-if="dayChartData.isShow" type="bar" :canvas2d="true" canvasId="akglfjkdj4ggfdsfg45" :ontouch="true" :opts="tumbleOpts" :chartData="dayChartData['data']" />
						</view>
						<view class="tumble-chart-message" v-if="!dayChartData.noData">
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
										<text>正常</text>
									</view>
									<view>
										<text></text>
										<text>跌倒</text>
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
							<qiun-data-charts @getIndex="getWeekIndexEvent" v-if="weekChartData.isShow" :canvas2d="true" canvasId="abcdef67dfdfdf8asfdf56k" type="column" :opts="leaveHomeWeekOpts" :ontouch="true" :inScrollView="true" :chartData="weekChartData.data" />
						</view>
						<view class="icon-bar" v-if="!weekChartData.noData">
							<view>
								<text></text>
								<text>正常</text>
							</view>
							<view>
								<text></text>
								<text>跌倒</text>
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
							<qiun-data-charts @getIndex="getMonthIndexEvent" :inScrollView="true" v-if="monthChartData.isShow" :canvas2d="true" canvasId="abcdef67sasfdsd8956k" type="column" :opts="leaveHomeMonthOpts" :ontouch="true" :chartData="monthChartData.data" />
						</view>
						<view class="icon-bar" v-if="!monthChartData.noData">
							<view>
								<text></text>
								<text>正常</text>
							</view>
							<view>
								<text></text>
								<text>跌倒</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="content-center-area">
				<view class="health-tips">
					<view class="health-tips-top">
						<image :src="daytimeNapIconPng"></image>
						<text>健康小知识</text>
					</view>
					<view class="health-tips-bottom" @click="healthTipsDetailsEvent">
						<text>老人摔倒可能是不小心摔倒、腰椎疾病、心脑血管疾病等原因引起的，老人摔倒后怎么护理需要根据摔倒的原因进行判断。具体分析如下：1.不小心摔倒：如.....</text>
					</view>
				</view>
			</view>
			<view class="content-bottom-area">
				<u-empty text="暂无数据" v-if="isShowNoHomeNoData"></u-empty>
				<scroll-view class="scroll-view" scroll-y="true"  @scrolltolower="scrolltolower">
					<view class="data-overview-list" v-for="(item,index) in fullRecordList" :key="index">
						<view class="overview-list-left">
							<image :src="tumbleIconPng"></image>
							<text>{{ getNowFormatDate(new Date(item.fallTime),1) }}</text>
							<text>跌倒1次</text>
						</view>
						<view class="overview-list-right" v-if="item.hasOwnProperty('upTime') && item.upTime">
							<text>{{ `${Math.ceil(msToMinutes(item.upTime - item.fallTime))}分钟后起身` }}</text>
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
	import { createVisitPageData, exitPageData } from '@/api/user.js'
	import { tumbleDetails, getTumbleListDetails } from '@/api/device.js'
	export default {
		components: {
			navBar
		},
		data() {
			return {
				infoText: '',
				showLoadingHint: false,
				daytimeNapIconPng: require("@/static/img/daytime-nap-icon.png"),
				tumbleIconPng: require("@/static/img/tumble-icon.png"),
				itemList: [{
					name: '日'
				}, {
					name: '周'
				}, {
					name: '月'
				}],
				tumbleOpts: {
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
				currentWeekXaxisArr: [],
				currentMonthXaxisArr: [],
				currentItem: 0,
				isDayPlusCanCilck: true,
				isMonthPlusCanCilck: true,
				isWeekPlusCanCilck: true,
				currentDayTime: '',
				initDayTime: '',
				currentStartWeekDate: '',
				currentEndWeekDate: '',
				initWeekDate: '',
				currentWeekDate: '',
				currentMonthDate: '',
				currentMonthDate: '',
				currentMonthDays: '',
				initMonthDate: '',
				weekMap: {},
				temporaryDevices: [],
				visitPageId: '',
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
				currentPageNum: 1,
				pageSize: 20,
				totalCount: 0,
				status: 'nomore',
				isShowNoHomeNoData: false,
				fullRecordList: [],
				recordList: []
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
			// 获取跌倒数据日
			this.temporaryDevices = [];
			for (let el of this.deviceDataMessage.devices) {
				this.temporaryDevices.push(el.device)
			};
			this.queryTumbleDetails({
				deviceIds: this.temporaryDevices,
				startDate: this.getNowFormatDate(new Date(),2),
				endDate: this.getNowFormatDate(new Date(),2)
			},'day');
			
			// 获取跌倒日数据列表详情
			this.queryGetTumbleListDetails({
				pageNo: this.currentPageNum,
				pageSize: this.pageSize,
				deviceIds: this.temporaryDevices,
				date: this.getNowFormatDate(new Date(),2)
			},true,false)
		},
		
		onShow () {
			uni.$on('update', (object) => {
				this.createVisitPage();
			})
		},
		
		onUnload () {
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
					pageName: "健康-跌倒详情(日周月)",
					pageKey: "tumble"
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
				// 获取跌倒数据详情列表
				this.queryGetTumbleListDetails({
					pageNo: this.currentPageNum,
					pageSize: this.pageSize,
					deviceIds: this.temporaryDevices,
					date: this.currentWeekDate
				},false,true)
			},
			
			// 获取月数据当前点击索引
			getMonthIndexEvent (e) {
				if (e.currentIndex['index'] == -1) { return };
				this.initMonthDate = this.getNowFormatDateText(this.currentMonthXaxisArr[e.currentIndex['index']]);
				this.currentMonthDate = this.getNowFormatDate(new Date(this.currentMonthXaxisArr[e.currentIndex['index']]),2);
				// 获取跌倒数据详情列表
				this.queryGetTumbleListDetails({
					pageNo: this.currentPageNum,
					pageSize: this.pageSize,
					deviceIds: this.temporaryDevices,
					date: this.currentMonthDate
				},false,true)
			},
			
			// 获取跌倒数据详情列表
			queryGetTumbleListDetails (data,flag,isInit) {
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
				getTumbleListDetails(data).then((res) => {
					if ( res && res.data.code == 0) {
						this.totalCount = res.data.data.total;
						this.recordList = res.data.data.list;
						this.fullRecordList = this.fullRecordList.concat(this.recordList);
						if (this.fullRecordList.length == 0) {
							this.isShowNoHomeNoData = true
						} else {
							this.isShowNoHomeNoData = false
						};
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
					this.queryGetTumbleListDetails({
						pageNo: this.currentPageNum,
						pageSize: this.pageSize,
						deviceIds: this.temporaryDevices,
						date: '2023-10-24'
					},false,false)
				}
			},
			
			// 获取跌倒数据
			queryTumbleDetails (data,text) {
				if (text == 'day') {
					this.dayChartData = {
						isShow: true,
						noData: true,
						data: {}
					}
				} else if (text == 'week') {
					this.weekChartData = {
						isShow: true,
						noData: true,
						data: {}
					}
				} else if (text == 'month') {
					this.monthChartData = {
						isShow: true,
						noData: true,
						data: {}
					}
				};
				tumbleDetails(data).then((res) => {
					if ( res && res.data.code == 0) {
						if (text == 'day') {
							let questData = res.data.data;
							// 跌倒
							if ( questData.length == 0 ) {
								this.dayChartData = {
									isShow: false,
									noData: true,
									data: {}
								}
							} else {
								this.dayChartData['isShow'] = true;
								this.dayChartData['noData'] = false;
								// status: 0-正常，1-跌倒
								let temporaryData = {
									categories: ['7-4'],
									series: []
								};
								// 统计跌倒次数
								let temporaryCount = questData[0]['resItemVos'].filter((el) => { return el.status == 1}).length;
								questData[0]['resItemVos'].forEach((item,index) => {
									if (item.status == 0) {
										temporaryData['series'].push(
											{
												name: "正常",
												color: "#F0F0F0",
												data: [1]
											}
										)
									} else if (item.status == 1) {
										temporaryData['series'].push(
											{
												name: "跌倒",
												color: "#E8CB51",
												data: [1]
											}
										)
									}
								});
								let temporaryContent = JSON.parse(JSON.stringify(temporaryData));
								this.dayChartData['data'] = temporaryContent
							}
						}	else if (text == 'week') {
							this.currentWeekXaxisArr = [];
							if (res.data.data.length > 0) {
								let questData = res.data.data;
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
									this.currentWeekXaxisArr.push(item.date);
									lengthArr.push(item.resItemVos.length);
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
										let currentData = questData[innerIndex]['resItemVos'];
										if (currentData[index]) {
											if (currentData[index]['status'] == 0) {
												item['data'].push(
													{value:1,color:"#F0F0F0"}
												)
											} else if (currentData[index]['status'] == 1) {
												item['data'].push(
													{value:3,color:"#E8CB51"}
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
									noData: true,
									data: {}
								};
							}
						} else if (text == 'month') {
							this.currentMonthXaxisArr = [];
							if (res.data.data.length > 0) {
								let questData = res.data.data;
								this.monthChartData['isShow'] = true;
								this.monthChartData['noData'] = false;
								let lengthArr = [];
								let maxColumn;
								let temporaryData = {
									categories: [],
									series: []
								};
								questData.forEach((item,index) => {
									temporaryData['categories'].push(this.getNowFormatDate(new Date(item.date),5));
									this.currentMonthXaxisArr.push(item.date);
									lengthArr.push(item.resItemVos.length);
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
										let currentData = questData[innerIndex]['resItemVos'];
										if (currentData[index]) {
											if (currentData[index]['status'] == 0) {
												item['data'].push(
													{value:1,color:"#F0F0F0"}
												)
											} else if (currentData[index]['status'] == 1) {
												item['data'].push(
													{value:3,color:"#E8CB51"}
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
									noData: true,
									data: {}
								};
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
			
			// 毫秒转换成分钟
			msToMinutes(ms) {
				if (!ms) { return };
				let minutes = ms / 60000;
				return minutes
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
				// 获取跌倒日数据
				this.queryTumbleDetails({
					deviceIds: this.temporaryDevices,
					startDate: this.currentDayTime,
					endDate: this.currentDayTime
				},'day');
				
				// 获取跌倒数据列表详情
				this.queryGetTumbleListDetails({
					pageNo: this.currentPageNum,
					pageSize: this.pageSize,
					deviceIds: this.temporaryDevices,
					date: this.currentDayTime
				},false,true)
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
				// 获取跌倒月数据
				this.queryTumbleDetails({
					deviceIds: this.temporaryDevices,
					startDate: `${this.currentMonthDate}-01`,
					endDate: `${this.currentMonthDate}-${this.currentMonthDays}`
				},'month');
				// 获取跌倒数据列表详情
				this.queryGetTumbleListDetails({
					pageNo: this.currentPageNum,
					pageSize: this.pageSize,
					deviceIds: this.temporaryDevices,
					date: `${this.currentMonthDate}-01`
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
					this.currentEndWeekDate = `${this.weekMap['eyear']}-${this.weekMap["etext"]}`;
					this.initWeekDate = this.getNowFormatDateText(new Date(this.currentStartWeekDate),3);
					console.log('周',this.currentStartWeekDate,this.currentEndWeekDate)
				};
				// 获取跌倒周数据
				this.queryTumbleDetails({
					deviceIds: this.temporaryDevices,
					startDate: this.currentStartWeekDate,
					endDate: this.currentEndWeekDate
				},'week');
				// 获取跌倒数据列表详情
				this.queryGetTumbleListDetails({
					pageNo: this.currentPageNum,
					pageSize: this.pageSize,
					deviceIds: this.temporaryDevices,
					date: this.currentStartWeekDate
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
					this.queryTumbleDetails({
						deviceIds: this.temporaryDevices,
						startDate: this.getNowFormatDate(new Date(),2),
						endDate: this.getNowFormatDate(new Date(),2)
					},'day');
					// 获取跌倒数据列表详情
					this.queryGetTumbleListDetails({
						pageNo: this.currentPageNum,
						pageSize: this.pageSize,
						deviceIds: this.temporaryDevices,
						date: this.getNowFormatDate(new Date(),2)
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
					// 获取跌倒周数据
					this.queryTumbleDetails({
						deviceIds: this.temporaryDevices,
						startDate: this.currentStartWeekDate,
						endDate: this.currentEndWeekDate
					},'week');
					// 获取跌倒周数据列表详情
					this.queryGetTumbleListDetails({
						pageNo: this.currentPageNum,
						pageSize: this.pageSize,
						deviceIds: this.temporaryDevices,
						date: this.currentStartWeekDate
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
					// 获取跌倒月数据
					this.queryTumbleDetails({
						deviceIds: this.temporaryDevices,
						startDate: `${this.currentMonthDate}-01`,
						endDate: `${this.currentMonthDate}-${this.currentMonthDays}`
					},'month');
					// 获取跌倒月数据列表详情
					this.queryGetTumbleListDetails({
						pageNo: this.currentPageNum,
						pageSize: this.pageSize,
						deviceIds: this.temporaryDevices,
						date: `${this.currentMonthDate}-01`
					},false,true)
				} 
			},
			
			// 进入健康小知识详情事件
			healthTipsDetailsEvent () {
				uni.navigateTo({
					url: '/healthMonitoringPackage/pages/healthTumbleTips/healthTumbleTips'
				})
			},
			
			backTo () {
				uni.navigateBack()
				// uni.switchTab({
				// 	url: '/pages/index/index'
				// })
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
											background: #E8CB51
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
						.tumble-chart-message {
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
								height: 40px;
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
												background: #E8CB51
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
			.content-center-area {
				margin-top: 8px;
				padding: 10px;
				box-sizing: border-box;
				background: #fff;
				.health-tips {
					display: flex;
					flex-direction: column;
					height: 134px;
					border-radius: 10px;;
					box-shadow: 0px 1px 3px 0 rgba(163, 151, 151, 0.4);
					padding: 8px 12px;
					box-sizing: border-box;
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
				margin-top: 8px;
				padding: 10px;
				box-sizing: border-box;
				background: #fff;
				height: 250px;
				overflow: auto;
				.data-overview-list {
					height: 65px;
					display: flex;
					padding: 10px;
					margin-bottom: 10px;
					border-radius: 10px;;
					box-shadow: 0px 2px 6px 0 rgba(0, 0, 9, 0.1);
					padding: 8px 12px;
					box-sizing: border-box;
					align-items: center;
					justify-content: space-between;
					.overview-list-left {
						>image {
							width: 19px;
							height: 19px;
							vertical-align: middle;
							margin-right: 14px;
						};
						>text {
							font-size: 14px;
							color: #101010;
							vertical-align: middle;
							&:nth-of-type(1) {
								margin-right: 6px
							}
						}
					};
					.overview-list-right {
						font-size: 14px;
						color: #101010;
					}
				}
			}
		}
	}
</style>





