<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="呼吸" @backClick="backTo">
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
							<qiun-data-charts @getIndex="getDayIndexEvent" v-if="dayChartData.isShow" type="area" :canvas2d="true" canvasId="abcdef123gh" :opts="breathDayOpts" :ontouch="true" :chartData="dayChartData['data']" />
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
							<!-- 	<u-empty text="暂无数据" v-if="!weekChartData.isShow"></u-empty> -->
							<qiun-data-charts type="column" @getIndex="getWeekIndexEvent" canvasId="abcdatef123gh" :opts="breathMonthOpts" :ontouch="true" :chartData="chartWeekData" />
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
							<!-- 	<u-empty text="暂无数据" v-if="!weekChartData.isShow"></u-empty> -->
							<qiun-data-charts type="column" @getIndex="getMonthIndexEvent" :canvas2d="true" canvasId="abcdghhjjsatef123gh" :opts="breathMonthOpts" :ontouch="true" :chartData="chartWeekData" />
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
								<text>{{ `${average}次/分` }}</text>
								<text>平均呼吸</text>
							</view>
							<view class="content-top-right">
								<text>{{ `${lowest}次/分` }}</text>
								<text>最低呼吸</text>
							</view>
						</view>
						<view class="data-content-bottom">
							<view class="content-bottom-left">
								<text>{{ `${highest}次/分` }}</text>
								<text>最高</text>
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
						<text>正常人通常呼吸频率在16-24次/分，低于10次/分，通常提示患者的呼吸频率减慢，超过24次/分，通常提示患者有呼吸急促。呼吸急促、减慢，依据不同疾......</text>
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
				initDayText: '',
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
				dayChartData: {
					isShow: true,
					data: {}
				},
				lowest: '',
				highest: '',
				average: '',
				breathDayOpts: {
					dataLabel: true,
					color: ["#1890FF"],
					padding: [10,10,10,10],
					enableScroll: true,
					dataPointShapeType: 'hollow',
					legend: { show: false },
					xAxis: {
						itemCount: 9,
						axisLine: false
					},
					yAxis: {
						gridType: "solid",
						dashLength: 2,
						 data: [
							 {
								 min: 0
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
				chartWeekData: {},
				breathWeekOpts: {
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
				breathMonthOpts: {
					dataPointShape: false,
					dataLabel: false,
					color: ["#F7A4B6"],
					padding: [10,10,10,10],
					legend: { show: false },
					enableScroll: true,
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
				initWeekText: '',
				initMonthText: '',
				weekChartData: {
					isShow: true,
					data: {}
				},
				monthChartData: {
					isShow: true,
					data: {}
				},
				temporaryDevices: [],
				lineChartData: {}
			}
		},
		
		onLoad() {
			this.getServerData();
			this.initDayTime = this.getNowFormatDate(new Date(),1);
			this.currentDayTime = this.getNowFormatDate(new Date(),2);
			let temporaryDate = this.getNowFormatDate(new Date(),2);
			if (new Date(this.currentDayTime).getTime() >= new Date(temporaryDate).getTime()) { 
				this.isDayPlusCanCilck = false
			};
			
			// 获取呼吸数据日
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
			
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: ["周一","周二","周三","周四","周五","周六","周日"],
						 series: [
						   {
						     data: [{value: 10,color: '#fff'},{value: 20,color: '#fff'},{value: 14,color: '#fff'},
									{value: 13,color: '#fff'},{value: 15,color: '#fff'},{value: 16,color: '#fff'},
									{value: 8,color: '#fff'}
								 ]
						   },
							 {
							   data: [{value: 50,color: '#1890FF'},{value: 60,color: '#1890FF'},{value: 55,color: '#1890FF'},
									{value: 90,color: '#1890FF'},{value: 80,color: '#1890FF'},{value: 70,color: '#1890FF'},
									{value: 65,color: '#1890FF'}
								 ]
							 }
						 ]
						};
					this.chartWeekData = JSON.parse(JSON.stringify(res));
					console.log('拼接数据',this.chartWeekData);
				}, 500)
			},
			
			// 获取日数据当前点击索引
			getDayIndexEvent (e) {
				this.initDayTime = e['opts']['categories'][e.currentIndex['index']];
				this.initDayText = this.dayChartData['data']['series'][0]['data'][e.currentIndex['index']];
			},
			
			// 获取周数据当前点击索引
			getWeekIndexEvent (e) {
			},
			
			// 获取月数据当前点击索引
			getMonthIndexEvent (e) {
			
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
			
			// 获取某月的天数
			getMonthDay(year, month) {
			  let days = new Date(year, month, 0).getDate()
			  return days
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
				// 获取呼吸日数据
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
					console.log('当前月',this.currentMonthDate);
				};
				// 获取呼吸月数据
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
				// 获取呼吸周数据
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
					// 获取呼吸日数据
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
					console.log('数',this.currentStartWeekDate,this.currentEndWeekDate);
					// 获取呼吸周数据
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
					// 获取呼吸月数据
					this.querySleepStatisticsDetailsOther({
						deviceId: this.temporaryDevices[0],
						startDate: `${this.currentMonthDate}-01`,
						endDate: `${this.currentMonthDate}-${this.currentMonthDays}`
					},'month')
				} 
			},
			
			// 获取体征数据详情(日)
			querySleepStatisticsDetails (data) {
				this.dayChartData = {
					isShow: true,
					data: {}
				};
				this.initDayTime = '';
				this.initDayText = '';
				this.lowest = '';
				this.highest = '';
				this.average = '';
				sleepStatisticsDetails(data).then((res) => {
					if ( res && res.data.code == 0) {
						let questData = res.data.data;
						this.dayChartData['isShow'] = true;
						// 呼吸
						if ( JSON.stringify(res.data.data) == '{}' || questData.breath.timeList.length == 0) {
							this.initDayTime = '-';
							this.initDayText = '-';
							this.dayChartData = {
								isShow: false,
								data: {}
							}
						} else {
							this.initDayText = Math.floor(questData.breath.timeList[0]['value']);
							this.initDayTime = this.getNowFormatDate(new Date(questData.breath.timeList[0]['time']),1);
							this.lowest = Math.floor(questData.breath.lowest);
							this.highest = Math.floor(questData.breath.lowest);
							this.average = Math.floor(questData.breath.average);
							this.dayChartData['isShow'] = true;
							let temporaryData = {
								categories: [],
								series: [
									{
										data: []
									}
								]
							};
							questData.breath.timeList.forEach((item,index) => {
								temporaryData['categories'].push(this.getNowFormatDate(new Date(item.time),1));
								temporaryData['series'][0]['data'].push(Math.floor(item.value))
							});
							console.log('呼吸拼接数据',temporaryData);
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
				this.lowest = '';
				this.highest = '';
				this.average = '';
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
								this.lowest = Math.floor(questData.breathMinValue);
								this.highest = Math.floor(questData.breathMaxValue);
								this.average = Math.floor(questData.breathAverage);
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
									temporaryData['categories'].push(this.judgeWeek(item.createTime));
									temporaryData['series'][0]['data'].push({
										color: '#fff',
										value: Math.floor(item.breathMinValue)
									});
									temporaryData['series'][1]['data'].push({
										color: '#F7A4B6',
										value: Math.floor(item.breathMaxValue - item.breathMinValue)
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
								this.monthChartData = {
									isShow: false,
									data: {}
								}
							} else {
								this.lowest = Math.floor(questData.breathMinValue);
								this.highest = Math.floor(questData.breathMaxValue);
								this.average = Math.floor(questData.breathAverage);
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
									temporaryData['categories'].push(this.getNowFormatDate(new Date(item.createTime),5));
									temporaryData['series'][0]['data'].push({
										color: '#fff',
										value: Math.floor(item.breathMinValue)
									});
									temporaryData['series'][1]['data'].push({
										color: '#F7A4B6',
										value: Math.floor(item.breathMaxValue - item.breathMinValue)
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
						title: err,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			// 进入健康小知识详情事件
			healthTipsDetailsEvent () {
				uni.redirectTo({
					url: '/healthMonitoringPackage/pages/healthBreatheTips/healthBreatheTips'
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
				height: 440px;
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




