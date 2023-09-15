<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<u-picker mode="time" v-model="dateShow" :params="params" @confirm="dateSure"></u-picker>
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" @backClick="backTo">
				<slot name="default">
					<text>日志</text>
					<u-icon name="calendar-fill" color="#101010" size="45" @click="dateIconClickEvent"></u-icon>
				</slot>
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="top-title">
				<text>检测中</text>
				<image src="https://blink-radar.oss-cn-chengdu.aliyuncs.com/28faa5a2010595fd16449e97b5973cb9d44d0fc46a9cacf1b604b31fcf2eea9d.gif"></image>
			</view>
			<view class="bottom-area">
				<view class="statistics-area">
					<view class="statistics-content">
						<view class="statistics-content-left">
							<text>呼吸</text>
							<text>
								20
							</text>
							<text>次/分</text>
						</view>
						<view class="statistics-content-right">
							<text>心跳</text>
							<text>
								90
							</text>
							<text>次/分</text>
						</view>
					</view>
				</view>
				<view class="log-list-wrapper">
					<u-empty text="暂无数据" v-if="isShowNoHomeNoData"></u-empty>
					<scroll-view class="scroll-view" scroll-y="true"  @scrolltolower="scrolltolower">
						<view class="log-list" v-for="(item,index) in logList" :key="index">
							<text>{{ getNowFormatDate(new Date(item.createTime),4) }}</text>
							<text>>>></text>
							<text>呼吸</text>
							<text>20次/分</text>
							<text>心跳</text>
							<text>89次/分</text>
						</view>
						<u-loadmore :status="status" v-show="fullRecordList.length > 40" />
					</scroll-view>
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
	import { getBodyDetectionRadar } from '@/api/device.js'
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
				pageSize: 20,
				totalCount: 0,
				recordList: [],
				fullRecordList: [],
				status: 'loadmore',
				isShowNoHomeNoData: false,
				params: {
					year: true,
					month: true,
					day: true
				},
				showLoadingHint: false,
				logList: [
					{
						date: '2023-03-06 18:59'
					},
					{
						date: '2023-03-06 18:59'
					},
					{
						date: '2023-03-06 18:59'
					},
					{
						date: '2023-03-06 18:59'
					}
				]
			}
		},
		onLoad() {
		},
		computed: {
			...mapGetters([
				'userInfo'
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
			
			scrolltolower () {
				let totalPage = Math.ceil(this.totalCount/this.pageSize);
				if (this.currentPageNum >= totalPage) {
					this.status = 'nomore'
				} else {
					this.status = 'loading';
					this.currentPageNum = this.currentPageNum + 1;
					this.queryBodyDetectionRadar({
						pageNo: this.currentPageNum,
						pageSize: this.pageSize,
						deviceId: this.beforeAddBodyDetectionDeviceMessage.deviceId,
						createDate: this.currentDate
					})
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
				this.queryBodyDetectionRadar({
					pageNo: this.currentPageNum,
					pageSize: this.pageSize,
					deviceId: this.beforeAddBodyDetectionDeviceMessage.deviceId,
					createDate: this.currentDate
				});
			},
			
			// 获取人体检测雷达日志
			queryBodyDetectionRadar (data) {
				this.recordList = [];
				this.showLoadingHint = true;
				getBodyDetectionRadar(data).then((res) => {
					this.showLoadingHint = false;
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
					this.showLoadingHint = false;
					this.$refs.uToast.show({
						title: err,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			backTo () {
				uni.redirectTo({
					url: '/devicePackage/pages/signMonitorRadarCompleteSet/completeSet?transmitData='+1
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
			display: flex;
			flex-direction: column;
			.top-title {
				padding: 10px;
				box-sizing: border-box;
				height: 35vh;
				display: flex;
				flex-direction: column;
				align-items: center;
				>image {
					width: 100%;
				};
				>text {
					font-size: 14px;
					color: #101010;
				}
			};
			.bottom-area {
				flex: 1;
				display: flex;
				flex-direction: column;
				background: #fff;
				.statistics-area {
					height: 60px;
					padding: 0 20px;
					box-sizing: border-box;
					.statistics-content {
						margin-top: -50px;
						padding: 0 20px;
						box-sizing: border-box;
						width: 100%;
						height: 90px;
						display: flex;
						justify-content: space-between;
						align-items: center;
						background: #fff;
						border-radius: 12px;
						box-shadow: 0px 2px 8px -1px rgba(199, 218, 219, 1);
						.statistics-content-left {
							>text {
								font-size: 14px;
								color: #101010;
								&:nth-child(2) {
									font-size: 28px;
									color: #289E8E;
									margin: 0 8px 0 20px
								}
							}
						};
						.statistics-content-right {
							>text {
								font-size: 14px;
								color: #101010;
								&:nth-child(2) {
									font-size: 28px;
									color: #3B9DF9;
									margin: 0 8px 0 20px
								}
							}
						}
					}
				};
				.log-list-wrapper {
					flex: 1;
					border-top: 1px dashed #BBBBBB;
					padding-top: 10px;
					box-sizing: border-box;
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
						padding: 0 10px;
						text-align: center;
						box-sizing: border-box;
						margin-bottom: 10px;
						>text {
							font-size: 14px;
							color: #101010;
							&:nth-child(2) {
								margin: 0 4px
							};
							&:nth-child(4) {
								color: #289E8E
							};
							&:nth-child(3) {
								margin: 0 4px
							};
							&:nth-child(5) {
								margin: 0 4px
							};
							&:last-child {
								color: #3B9DF9
							}
						}
					}
				}
			}
		}
	}
</style>








