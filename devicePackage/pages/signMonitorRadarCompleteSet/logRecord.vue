<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<u-picker mode="time" v-model="dateShow" :params="params" @confirm="dateSure"></u-picker>
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" @backClick="backTo">
				<slot name="default">
					<text>体征监测雷达</text>
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
								{{ breath }}
							</text>
							<text>次/分</text>
						</view>
						<view class="statistics-content-right">
							<text>心跳</text>
							<text>
								{{ heartRate }}
							</text>
							<text>次/分</text>
						</view>
					</view>
				</view>
				<view class="log-list-wrapper">
					<u-empty text="暂无数据" v-if="isShowNoHomeNoData"></u-empty>
					<scroll-view class="scroll-view" scroll-y="true"  @scrolltolower="scrolltolower">
						<view class="log-list" v-for="(item,index) in fullRecordList" :key="index">
							<view class="log-list-left">
								<text>{{ getNowFormatDate(new Date(item.time),4) }}</text>
								<text>>>></text>
							</view>
							<view class="log-list-right" v-if="item.hasPeople == 1">
								<text>呼吸</text>
								<text :class="{'textStyleOne' : item.breath >= 25}">{{ `${item.breath}次/分` }}</text>
								<text>心跳</text>
								<text :class="{'textStyleTwo' : item.heart >= 130}">{{ `${item.heart}次/分` }}</text>
							</view>
							<view class="log-list-right" v-else>
								<text>未检测到人体</text>
							</view>
						</view>
						<u-loadmore :status="status" v-show="fullRecordList.length > 0" />
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
	import { getsignMonitorRadar } from '@/api/device.js'
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
				breath: '',
				heartRate: '',
				fullRecordList: [],
				currentDate: '',
				status: 'nomore',
				isShowNoHomeNoData: false,
				params: {
					year: true,
					month: true,
					day: true
				},
				showLoadingHint: false,
				visitPageId: ''
			}
		},
		onLoad() {
			this.createVisitPage();
			this.currentDate = this.getNowFormatDate(new Date(),2)
			this.querySignMonitorRadar({
				pageNo: this.currentPageNum,
				pageSize: this.pageSize,
				deviceId: this.beforeAddSignMonitorRadarCompleteSet.deviceId,
				queryDate: this.currentDate
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
				'beforeAddSignMonitorRadarCompleteSet'
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
					pageName: "设备-体征监测雷达日志",
					pageKey: "signMonitorRadarLogRecord"
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
			
			scrolltolower () {
				let totalPage = Math.ceil(this.totalCount/this.pageSize);
				if (this.currentPageNum >= totalPage) {
					this.status = 'nomore'
				} else {
					this.status = 'loadmore';
					this.currentPageNum = this.currentPageNum + 1;
					this.querySignMonitorRadar({
						pageNo: this.currentPageNum,
						pageSize: this.pageSize,
						deviceId: this.beforeAddSignMonitorRadarCompleteSet.deviceId,
						queryDate: this.currentDate
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
				this.querySignMonitorRadar({
					pageNo: this.currentPageNum,
					pageSize: this.pageSize,
					deviceId: this.beforeAddSignMonitorRadarCompleteSet.deviceId,
					queryDate: this.currentDate
				},true);
			},
			
			// 获取人体检测雷达日志
			querySignMonitorRadar (data,flag) {
				this.recordList = [];
				this.breath = "";
				this.heartRate = "";
				if (flag) {
					this.showLoadingHint = true
				} else {
					this.showLoadingHint = false;
					this.infoText = '';
					this.status = 'loading';
				};
				getsignMonitorRadar(data).then((res) => {
					if (flag) {
							this.showLoadingHint = false
					} else {
						this.status = 'loadmore';
					};
					if ( res && res.data.code == 0) {
						this.breath = res.data.data.breath ? res.data.data.breath : '-';
						this.heartRate = res.data.data.heartRate ? res.data.data.heartRate : '-';
						this.totalCount = res.data.data['pageResult'].total;
						this.recordList = res.data.data['pageResult'].list;
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
						title: err.message,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			backTo () {
				uni.$emit('update', { transmitData: 1 });
				uni.$off('update');
				uni.navigateBack()
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
				height: 0;
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
						display: flex;
						justify-content: center;
						.log-list-left {
							margin-right: 4px;
							>text {
								font-size: 14px;
								color: #101010;
								&:nth-child(1) {
									margin-right: 4px;
								}
							}
						};
						.log-list-right {
							.textStyleOne {
								color: #b90019 !important
							};
							.textStyleTwo {
								color: #E86F50 !important
							};
							>text {
								font-size: 14px;
								color: #101010;
								&:nth-child(2) {
									margin: 0 4px;
									color: #289E8E
								};
								&:nth-child(4) {
									color: #3B9DF9;
									margin-left: 4px
								}
							}
						}
					}
				}
			}
		}
	}
</style>








