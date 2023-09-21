<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<u-picker mode="time" v-model="dateShow" :params="params" @confirm="dateSure"></u-picker>
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" @backClick="backTo">
				<slot name="default">
					<text>人体检测雷达</text>
					<u-icon name="calendar-fill" color="#101010" size="45" @click="dateIconClickEvent"></u-icon>
				</slot>
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="log-list-wrapper">
				<u-empty text="暂无数据" v-if="isShowNoHomeNoData"></u-empty>
				<scroll-view class="scroll-view" scroll-y="true"  @scrolltolower="scrolltolower">
					<view class="log-list" v-for="(item,index) in fullRecordList" :key="index">
						<view class="log-list-left">
							<text>{{ getNowFormatDate(new Date(item.createTime),4) }}</text>
							<text>>>></text>
						</view>
						<view class="log-list-right">
							<text>{{ `进: ${item.enter}` }}</text>
							<text>{{ `出: ${item.goOut}` }}</text>
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
	import { getBodyDetectionRadar } from '@/api/device.js'
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
				status: 'nomore',
				params: {
					year: true,
					month: true,
					day: true
				},
				currentDate: '',
				isShowNoHomeNoData: false,
				showLoadingHint: false,
				moreIconPng: require("@/static/img/more-icon.png"),
				visitPageId: ''
			}
		},
		onLoad() {
			this.createVisitPage();
			this.currentDate = this.getNowFormatDate(new Date(),2)
			this.queryBodyDetectionRadar({
				pageNo: this.currentPageNum,
				pageSize: this.pageSize,
				deviceId: this.beforeAddBodyDetectionDeviceMessage.deviceId,
				createDate: this.currentDate
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
				'beforeAddBodyDetectionDeviceMessage'
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
					pageName: "设备-人体检测雷达日志",
					pageKey: "bodyDetectionRadarLogRecord"
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
			
			// 日期图标点击事件
			dateIconClickEvent () {
				this.dateShow = true
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
						deviceId: this.beforeAddBodyDetectionDeviceMessage.deviceId,
						createDate: this.currentDate
					},false)
				}
			},
			
			// 日期选择确定事件
			dateSure (value) {
				this.currentDate = `${value.year}-${value.month}-${value.day}`;
				this.fullRecordList = [];
				this.queryBodyDetectionRadar({
					pageNo: this.currentPageNum,
					pageSize: this.pageSize,
					deviceId: this.beforeAddBodyDetectionDeviceMessage.deviceId,
					createDate: this.currentDate
				},true)
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
			
			// 获取人体检测雷达日志
			queryBodyDetectionRadar (data,flag) {
				this.recordList = [];
				if (flag) {
					this.showLoadingHint = true;
				} else {
					this.showLoadingHint = false;
					this.status = 'loading'
				};
				getBodyDetectionRadar(data).then((res) => {
					if (flag) {
						this.showLoadingHint = false;
					} else {
						this.status = 'loadmore'
					};
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
			
			backTo () {
				uni.redirectTo({
					url: '/devicePackage/pages/bodyDetectionRadarCompleteSet/completeSet?transmitData='+1
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
				left: 240px !important;
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
			box-sizing: border-box;
			overflow: auto;
			.log-list-wrapper {
				height: 100%;
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
					display: flex;
					>view {
						display: flex;
						justify-content: flex-end;
						>text {
							font-size: 14px;
							color: #101010;
						}
					};
					.log-list-left {
						width: 60%;
						>text {
							&:nth-child(2) {
								margin-left: 4px
							}
						}
					};
					.log-list-right {
						width: 40%;
						justify-content: flex-start;
						>text {
							&:nth-child(1) {
								margin: 0 10px;
								color: #289E8E
							};
							&:last-child {
								color: #E86F50
							}
						}
					}
				}
			}
		}
	}
</style>







