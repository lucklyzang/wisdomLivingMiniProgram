<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="睡眠" @backClick="backTo">
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
								<text>夜间睡眠</text>
							</view>
							<view>
								<text>{{ initDayText }}</text>
							</view>
						</view>
						<view class="data-bottom">
							<u-empty text="暂无数据" v-if="!dayChartData.isShow"></u-empty>
							<qiun-data-charts v-if="dayChartData.isShow" type="bar" canvasId="abc1fgfgfdshdjshd3" :ontouch="true" :opts="sleepDayOpts" :chartData="dayChartData.data" />
						</view>
						<view class="sleep-range" v-if="dayChartData['isShow']">
							<view class="sleep-range-left">
								<text>{{ dayChartData['sleepStartDate'] }}</text>
								<text>{{ `入睡${dayChartData['sleepStartTime']}` }}</text>
							</view>
							<view class="sleep-range-right">
								<text>{{ dayChartData['sleepEndDate'] }}</text>
								<text>{{ `醒来${dayChartData['sleepEndTime']}` }}</text>
							</view>
						</view>
						<view class="icon-bar">
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
								<text>夜间睡眠</text>
							</view>
							<view>
								<text>{{ initWeekText }}</text>
							</view>
						</view>
						<view class="data-bottom">
							<u-empty text="暂无数据" v-if="!weekChartData.isShow"></u-empty>
							<qiun-data-charts v-if="weekChartData.isShow" type="column" @getIndex="getWeekIndexEvent" canvasId="abcdssa12atef123gh" :opts="sleepWeekOpts" :ontouch="true" :chartData="weekChartData.data" />
						</view>
						<view class="icon-bar">
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
								<text>夜间睡眠</text>
							</view>
							<view>
								<text>{{ initMonthText }}</text>
							</view>
						</view>
						<view class="data-bottom">
								<u-empty text="暂无数据" v-if="!monthChartData.isShow"></u-empty>
							<qiun-data-charts type="column" v-if="monthChartData.isShow" @getIndex="getMonthIndexEvent" canvasId="abcsdghdsdsbdfdgsatef123gh" :opts="sleepMonthOpts" :ontouch="true" :chartData="monthChartData.data" />
						</view>
						<view class="icon-bar">
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
			</view>
			<view class="content-bottom-area">
				<view class="daytime-nap">
					<view class="daytime-nap-top">
						<image :src="daytimeNapIconPng"></image>
						<text>日间小憩</text>
					</view>
					<view class="daytime-nap-bottom">
						<text>{{ daySleepTimeQuantum }}</text>
						<text>{{ daySleepTime }}</text>
					</view>
				</view>
				<view class="health-tips">
					<view class="health-tips-top">
						<image :src="daytimeNapIconPng"></image>
						<text>健康小知识</text>
					</view>
					<view class="health-tips-bottom" @click="healthTipsDetailsEvent">
						<text>年龄和个体差异会影响每个人的睡眠需求。一般成人每晚需要约7到9小时的睡眠，而儿童和青少年可能需要更多。睡前和起床时间的规律......</text>
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
	export default {
		components: {
			navBar
		},
		data() {
			return {
				infoText: '',
				showLoadingHint: false,
				daytimeNapIconPng: require("@/static/img/daytime-nap-icon.png"),
				itemList: [{
					name: '日'
				}, {
					name: '周'
				}, {
					name: '月'
				}],
				dayChartData: {
					isShow: true,
					sleepStartTime: '',
					sleepEndTime: '',
					sleepStartDate: '',
					sleepEndDate: '',
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
				sleepDayOpts: {
					padding: [0,10,0,10],
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
							width: 60
						}
					}
				},
				chartWeekData: {},
				sleepWeekOpts: {
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
						disabled: true,
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
				sleepMonthOpts: {
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
						disabled: true,
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
				daySleepTime: '',
				daySleepTimeQuantum: '',
				currentItem: 0,
				isDayPlusCanCilck: true,
				isMonthPlusCanCilck: true,
				isWeekPlusCanCilck: true,
				currentDayTime: '',
				initDayTime: '',
				currentStartWeekDate: '',
				currentEndWeekDate: '',
				initDayText: '',
				initWeekDate: '',
				initWeekText: '',
				initMonthText: '',
				currentMonthDate: '',
				currentMonthDays: '',
				initMonthDate: '',
				weekMap: {},
				temporaryDevices: []
			}
		},
		onLoad() {
			this.initDayTime = this.getNowFormatDate(new Date(),1);
			this.currentDayTime = this.getNowFormatDate(new Date(),2);
			let temporaryDate = this.getNowFormatDate(new Date(),2);
			if (new Date(this.currentDayTime).getTime() >= new Date(temporaryDate).getTime()) { 
				this.isDayPlusCanCilck = false
			};
			// 获取睡眠数据日
			this.temporaryDevices = [];
			for (let el of this.deviceDataMessage.devices) {
				this.temporaryDevices.push(el.device)
			};
			this.querySleepStatisticsDetails({
				deviceId: this.temporaryDevices[0],
				startDate: this.getNowFormatDate(new Date(),2),
			})
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
			
			
			// 获取日数据当前点击索引
			getDayIndexEvent (e) {
			},
			
			// 获取周数据当前点击索引
			getWeekIndexEvent (e) {
			},
			
			// 获取月数据当前点击索引
			getMonthIndexEvent (e) {
			
			},
			
			// 毫秒转换成分钟
			msToMinutes(ms) {
				if (!ms) { return };
				let minutes = ms / 60000;
				return minutes
			},
			
			// 获取体征数据详情(天)
			querySleepStatisticsDetails (data) {
				this.initDayText = '';
				this.daySleepTimeQuantum = '';
				this.daySleepTime = '';
				this.dayChartData = {
					isShow: true,
					sleepStartTime: '',
					sleepEndTime: '',
					sleepStartDate: '',
					sleepEndDate: '',
					data: {}
				};
				sleepStatisticsDetails(data).then((res) => {
					if ( res && res.data.code == 0) {
						let questData = res.data.data;
						this.dayChartData['isShow'] = true;
						// 睡眠
						if (JSON.stringify(res.data.data) == '{}' || JSON.stringify(questData.sleepVO) == '{}') {
							this.initDayText = '-';
							this.daySleepTimeQuantum = '-';
							this.daySleepTime = '-';
							this.dayChartData = {
								isShow: false,
								sleepStartTime: '',
								sleepEndTime: '',
								sleepStartDate: '',
								sleepEndDate: '',
								data: {}
							}
						} else {
							let nightSleepDuration = 	Math.ceil(this.msToMinutes(questData.sleepVO['end'] - questData.sleepVO['start']));
							let temporaryDataArr = questData.sleepVO.sleepOrWeekVOS.filter((item) => { return item.type == 0});
							if (temporaryDataArr.length == 0) {
								this.dayChartData = {
									isShow: false,
									sleepStartTime: '',
									sleepEndTime: '',
									sleepStartDate: '',
									sleepEndDate: '',
									data: {}
								};
								return
							};
							console.log('数据睡眠',questData.sleepVO);
							this.daySleepTimeQuantum = `${this.getNowFormatDate(new Date(questData.sleepVO['dayStart']),1)}-${this.getNowFormatDate(new Date(questData.sleepVO['dayEnd']),1)}`;
							this.daySleepTime = this.minutesTransitionHour(questData.sleepVO['dayTime']);
							this.initDayText = this.minutesTransitionHour(questData.sleepVO['totalTime'] - questData.sleepVO['dayTime']);
							this.dayChartData['isShow'] = true;
							let temporaryData = {
								categories: ["7-9"],
								series: []
							};
							this.dayChartData['sleepStartTime'] = this.getNowFormatDate(new Date(questData.sleepVO['start']),1);
							this.dayChartData['sleepEndTime'] = this.getNowFormatDate(new Date(questData.sleepVO['end']),1);
							this.dayChartData['sleepStartDate'] = this.getNowFormatDateText(new Date(questData.sleepVO['start']));
							this.dayChartData['sleepEndDate'] = this.getNowFormatDateText(new Date(questData.sleepVO['end']));
							questData['sleepVO']['sleepOrWeekVOS'].forEach((item,index) => {
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
							console.log('数据睡眠凭借',temporaryData);
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
						title: err,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			// 获取体征数据详情(周月)
			querySleepStatisticsDetailsOther (data,type) {
				if (type == 'week') {
					this.initWeekText = '';
					this.weekChartData = {
						isShow: true,
						data: {}
					}
				} else if (type == 'month') {
					this.initMonthText = '';
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
								this.weekChartData = {
									isShow: false,
									data: {}
								}
							} else {
								if (questData['respVOList'].length == 0) {
									this.initWeekText = '-';
									this.weekChartData = {
										isShow: false,
										data: {}
									};
									return
								};
								this.initDayText = this.minutesTransitionHour(JSON.parse(questData.respVOList[0]['sleepData'])[0]);
								this.weekChartData['isShow'] = true;
								let temporaryData = {
									categories: [],
									series: [
										{
										  data: []
										},
										{
										  data: []
										},
										{
										  data: []
										}
									]
								};
								questData['respVOList'].forEach((item,index) => {
									temporaryData['categories'].push(this.judgeWeek(item.createTime));
									// sleepData-[睡眠时间, 清醒时间, 无人时间] 时间单位:分钟
									let currentDayData = JSON.parse(item['sleepData']);
									let currentDayTotalDuration = Math.ceil(currentDayData[0] + currentDayData[1] + currentDayData[2]);
									let sleepDuration = !currentDayData[0] ? 0 : Math.ceil((currentDayData[0]/currentDayTotalDuration)*100);
									let soberDuration = !currentDayData[1] ? 0 : Math.ceil((currentDayData[1]/currentDayTotalDuration)*100);
									let notDetectedDuration = !currentDayData[2] ? 0 : Math.ceil((currentDayData[2]/currentDayTotalDuration)*100);
									temporaryData['series'][0]['data'].push(
										{value: sleepDuration,color: '#57B6EE'}
									);
									temporaryData['series'][1]['data'].push(
										{value: soberDuration,color: '#F2A15F'}
									);
									temporaryData['series'][2]['data'].push(
										{value: notDetectedDuration ,color: '#F0F0F0'}
									)
								});
								let temporaryContent = JSON.parse(JSON.stringify(temporaryData));
								console.log('周拼接数据',temporaryContent);
								this.weekChartData['data'] = temporaryContent
							}	
						} else if (type == 'month') {
							let questData = res.data.data;
							this.monthChartData['isShow'] = true;
							if ( JSON.stringify(res.data.data) == '{}' || questData.respVOList.length == 0) {
								this.initMonthText = '-';
								this.monthChartData = {
									isShow: false,
									data: {}
								}
							} else {
								if (questData['respVOList'].length == 0) {
									this.initMonthText = '-';
									this.monthChartData = {
										isShow: false,
										data: {}
									};
									return
								};
								this.initDayText = this.minutesTransitionHour(JSON.parse(questData.respVOList[0]['sleepData'])[0]);
								this.monthChartData['isShow'] = true;
								let temporaryData = {
									categories: [],
									series: [
										{
										  data: []
										},
										{
										  data: []
										},
										{
										  data: []
										}
									]
								};
								questData['respVOList'].forEach((item,index) => {
									temporaryData['categories'].push(this.getNowFormatDate(new Date(item.startTime),5));
									// sleepData-[睡眠时间, 清醒时间, 无人时间] 时间单位:分钟
									let currentDayData = JSON.parse(item['sleepData']);
									let currentDayTotalDuration = Math.ceil(currentDayData[0] + currentDayData[1] + currentDayData[2]);
									let sleepDuration = !currentDayData[0] ? 0 : Math.ceil((currentDayData[0]/currentDayTotalDuration)*100);
									let soberDuration = !currentDayData[1] ? 0 : Math.ceil((currentDayData[1]/currentDayTotalDuration)*100);
									let notDetectedDuration = !currentDayData[2] ? 0 : Math.ceil((currentDayData[2]/currentDayTotalDuration)*100);
									temporaryData['series'][0]['data'].push(
										{value: sleepDuration,color: '#57B6EE'}
									);
									temporaryData['series'][1]['data'].push(
										{value: soberDuration,color: '#F2A15F'}
									);
									temporaryData['series'][2]['data'].push(
										{value: notDetectedDuration ,color: '#F0F0F0'}
									)
								});
								let temporaryContent = JSON.parse(JSON.stringify(temporaryData));
								console.log('月拼接数据',temporaryContent);
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
						title: err,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			// 获取某月的天数
			getMonthDay(year, month) {
			  let days = new Date(year, month, 0).getDate()
			  return days
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
				// 获取睡眠日数据
				this.querySleepStatisticsDetails({
					deviceId: this.temporaryDevices[0],
					startDate: this.currentDayTime
				})
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
				};
				// 获取睡眠月数据
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
				// 获取睡眠周数据
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
					// 获取睡眠日数据
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
					// 获取睡眠周数据
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
			
			// 进入健康小知识详情事件
			healthTipsDetailsEvent () {
				uni.redirectTo({
					url: '/healthMonitoringPackage/pages/healthSleepTips/healthSleepTips'
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
			flex: 1;
			background: #F5F5F5;
			overflow: auto;
			display: flex;
			flex-direction: column;
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
					margin-top: 10px;
					flex: 1;
					.day-data-area-other {
						.data-bottom {
							flex: none !important;
							margin-top: 50px;
							height: 80px !important
						}
					};
					.day-data-area {
						display: flex;
						flex-direction: column;
						height: 100%;
						.data-top {
							width: 70%;
							margin: 0 auto;
							height: 93px;
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
								&:nth-child(3) {
									margin-bottom: 6px;
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
						};
						.sleep-range {
							width: 100%;
							display: flex;
							padding: 0 6px;
							box-sizing: border-box;
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
				}
			};
			.content-bottom-area {
				flex: 1;
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
				.daytime-nap {
					height: 57px;
					display: flex;
					justify-content: space-between;
					align-items: center;
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
						padding-left: 4px;
						box-sizing: border-box;
						flex: 1;
						display: flex;
						justify-content: flex-end;
						align-items: center;
						font-size: 18px;
						color: #101010;
						>text {
							&:first-child {
								font-size: 14px;
								margin-right: 10px;
								margin-top: 2px;
							};
							&:last-child {
								font-weight: bold
							}
						}
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



