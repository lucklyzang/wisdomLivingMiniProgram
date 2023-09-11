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
								<text>89次/分钟</text>
							</view>
						</view>
						<view class="data-bottom">
							
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
								<text>{{ getNowFormatDateText(initWeekDate) }}</text>
							</view>
							<view>
								<text>49-109次/分钟</text>
							</view>
						</view>
						<view class="data-bottom"></view>
					</view>
					<view class="day-data-area" v-if="currentItem == 2">
						<view class="data-top">
							<view>
								<u-icon name="arrow-left" size="40" color="#101010" @click="getCurrentMonth('minus')"></u-icon>
								<text>{{ getNowFormatDateText(currentMonthDate,2) }}</text>
								<u-icon name="arrow-right" size="40" :color="isMonthPlusCanCilck ? '#101010' : '#c9c9c9'" @click="getCurrentMonth('plus')"></u-icon>
							</view>
							<view>
								<text>{{ getNowFormatDateText(initMonthDate) }}</text>
							</view>
							<view>
								<text>49-109次/分钟</text>
							</view>
						</view>
						<view class="data-bottom"></view>
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
				<view class="data-overview-list">
					<view class="overview-list-left">
						<image :src="tumbleIconPng"></image>
						<text>07:58</text>
						<text>跌倒1次</text>
					</view>
					<view class="overview-list-right">
						<text>7分钟后起身</text>
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
				currentItem: 0,
				currentItem: 0,
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
			// 获取跌倒数据日
			this.temporaryDevices = [];
			for (let el of this.deviceDataMessage.devices) {
				this.temporaryDevices.push(el.device)
			}
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
				}
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
					console.log('当前月',this.currentMonthDate);
				}
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
					if (new Date(this.currentEndWeekDate).getTime() >= new Date(temporaryDate).getTime()) {
						this.isWeekPlusCanCilck = false
					};
					console.log('周',this.currentStartWeekDate,this.currentEndWeekDate)
				} else {
					let time = this.weekMap["last"]
					this.weekMap = this.getWeek(new Date(time));
					this.currentStartWeekDate = `${this.weekMap['syear']}-${this.weekMap["stext"]}`;
					this.currentEndWeekDate = `${this.weekMap['eyear']}-${this.weekMap["etext"]}`;
					console.log('周',this.currentStartWeekDate,this.currentEndWeekDate)
				}
			},
			
			// 判断周几
			judgeWeek (currentDate) {
				let date = new Date(currentDate);
				let day = date.getDay();
				switch (day) {
					case 0:
						return "星期日"
						break;
					case 1:
						return "星期一"
						break;
					case 2:
						return "星期二"
						break;
					case 3:
						return "星期三"
						break;
					case 4:
						return "星期四"
						break;
					case 5:
						return "星期五"
						break;
					case 6:
						return "星期六"
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
					}
				};
				if (index == 1) {
					this.weekMap = this.getWeek(new Date());
					this.currentStartWeekDate = `${this.weekMap['syear']}-${this.weekMap["stext"]}`;
					this.currentEndWeekDate = `${this.weekMap['eyear']}-${this.weekMap["etext"]}`;
					this.initWeekDate = this.getNowFormatDate(new Date(),3);
					let temporaryDate = this.getNowFormatDate(new Date(),3);
					if (new Date(this.currentEndWeekDate).getTime() >= new Date(temporaryDate).getTime()) {
						this.isWeekPlusCanCilck = false
					}
				};
				if (index == 2) {
					this.currentMonthDate = this.getNowFormatDate(new Date(),3);
					this.initMonthDate = this.getNowFormatDate(new Date(),3);
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
				} 
			},
			
			// 进入健康小知识详情事件
			healthTipsDetailsEvent () {
				uni.redirectTo({
					url: '/healthMonitoringPackage/pages/healthTumbleTips/healthTumbleTips'
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
						.u-item-bg {
							height: 24px !important;
							bottom: 5px !important
						}
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
									margin: 6px 0
								};
								&:last-child {
									font-size: 18px
								}
							}
						};
						.data-bottom {
							flex: 1;
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
				flex: 1;
				margin-top: 8px;
				padding: 10px;
				box-sizing: border-box;
				background: #fff;
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





