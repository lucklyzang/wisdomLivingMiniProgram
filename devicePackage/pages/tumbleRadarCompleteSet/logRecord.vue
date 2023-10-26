<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<u-picker mode="time" v-model="dateShow" :params="params" @confirm="dateSure"></u-picker>
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" @backClick="backTo">
				<slot name="default">
					<text>跌倒检测雷达</text>
					<u-icon name="calendar-fill" color="#101010" size="45" @click="dateIconClickEvent"></u-icon>
				</slot>
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="log-list-wrapper">
				<u-empty text="暂无数据" v-if="isShowNoHomeNoData"></u-empty>
				<scroll-view class="scroll-view" scroll-y="true"  @scrolltolower="scrolltolower">
					<view class="log-list" v-for="(item,index) in fullRecordList" :key="index">
						<text>{{ getNowFormatDate(new Date(item.time),4) }}</text>
						<text>>>></text>
						<text :class="{'textStyle' : item.status == 1 || item.status == 3}">{{ statusTransForm(item.status) }}</text>
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
	import { getTumbleRadar } from '@/api/device.js'
	import { createVisitPageData, exitPageData } from '@/api/user.js'
	export default {
		components: {
			navBar
		},
		data() {
			return {
				infoText: '加载中',
				checked: false,
				dateShow: false,
				currentPageNum: 1,
				pageSize: 100,
				totalCount: 0,
				recordList: [],
				fullRecordList: [],
				isShowNoHomeNoData: false,
				status: 'nomore',
				params: {
					year: true,
					month: true,
					day: true
				},
				showLoadingHint: false,
				moreIconPng: require("@/static/img/more-icon.png"),
				logList: [],
				visitPageId: ''
			}
		},
		// this.currentDate,
		onLoad() {
			this.createVisitPage();
			this.currentDate = this.getNowFormatDate(new Date(),2);
			this.queryTumbleRadar({
				pageNo: this.currentPageNum,
				pageSize: this.pageSize,
				deviceId: this.beforeAddDeviceMessage.deviceId,
				startDate: this.currentDate,
				endDate: this.currentDate
			},true)
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
				'beforeAddDeviceMessage'
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
					pageName: "设备-跌倒监测雷达日志",
					pageKey: "tumbleRadarLogRecord"
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
			
			// 状态转换
			statusTransForm (status) {
				switch (status) {
					case 1:
						return "跌倒"
						break;
					case 2:
						return "起身"
						break;
					case 3:
						return "进入"
						break;
					case 4:
						return "离开"
						break
				}		
			},
			
			scrolltolower () {
				let totalPage = Math.ceil(this.totalCount/this.pageSize);
				if (this.currentPageNum >= totalPage) {
					this.status = 'nomore'
				} else {
					this.status = 'loadmore';
					this.currentPageNum = this.currentPageNum + 1;
					this.queryTumbleRadar({
						pageNo: this.currentPageNum,
						pageSize: this.pageSize,
						deviceId: this.beforeAddDeviceMessage.deviceId,
						startDate: this.currentDate,
						endDate: this.currentDate
					},false)
				}
			},
			
			// 格式化时间
			getNowFormatDate(currentDate,type) {
				// type:1(只显示小时分钟),2(只显示年月日)3(只显示年月)4(只显示年月日小时分钟)
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
				return currentdate
			},
			
			// 日期图标点击事件
			dateIconClickEvent () {
				this.dateShow = true
			},
			
			// 日期选择确定事件
			dateSure (value) {
				this.currentDate = `${value.year}-${value.month}-${value.day}`;
				this.fullRecordList = [];
				this.queryTumbleRadar({
					pageNo: this.currentPageNum,
					pageSize: this.pageSize,
					deviceId: this.beforeAddDeviceMessage.deviceId,
					startDate: this.currentDate,
					endDate: this.currentDate
				},true);
			},
			
			// 获取人体检测雷达日志
			queryTumbleRadar (data,flag) {
				this.recordList = [];
				if (flag) {
					this.showLoadingHint = true
				} else {
					this.showLoadingHint = false;
					this.infoText = '';
					this.status = 'loading';
				};
				getTumbleRadar(data).then((res) => {
					// status 1-跌倒，2-起身, 3-进入，4-离开
					if ( res && res.data.code == 0) {
						this.totalCount = res.data.data.total;
						this.recordList = res.data.data.list;
						if (!res.data.data.hasOwnProperty('list')) {
							this.isShowNoHomeNoData = true;
							this.recordList = []
						};
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
						if (this.currentPage >= totalPage) {
							this.status = 'nomore'
						} else {
							this.status = 'loadmore';
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
						title: err,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			backTo () {
				uni.redirectTo({
					url: '/devicePackage/pages/tumbleRadarCompleteSet/completeSet?transmitData='+1
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
			::v-deep .header_title_center {
				left: 210px !important;
				transform: translateX(-55%) !important;
				.u-icon {
					margin-left: 14px
				}
			}
		};
		.content-area {
			width: 100%;
			flex: 1;
			background: #F5F5F5;
			padding: 10px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			padding: 10px;
			box-sizing: border;
			.log-list-wrapper {
				height: 100%;
				overflow: auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;
				.scroll-view {
					height: 100%
				};
				 ::v-deep .u-empty {
				 	position: absolute;
				 	top: 50%;
				 	left: 50%;
				 	transform: translate(-50%,-50%)
				 };
				.log-list {
					margin-bottom: 10px;
					text-align: center;
					>text {
						font-size: 14px;
						color: #101010;
						&:nth-child(2) {
							margin: 0 4px
						};
						&:nth-child(3) {
							color: #289E8E
						}
					};
					.textStyle {
						color: #E86F50 !important
					}
				}
			}
		}
	}
</style>






