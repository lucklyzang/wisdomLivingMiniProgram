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
					<view class="log-list" v-for="(item,index) in logList" :key="index">
						<text>{{ item.date }}</text>
						<text>>>></text>
						<text>呼吸</text>
						<text>20次/分</text>
						<text>心跳</text>
						<text>89次/分</text>
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
				checked: false,
				dateShow: false,
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
		onReady() {
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
		mounted() {
		},
		methods: {
			...mapMutations([
				'changeOverDueWay'
			]),
			
			// 日期图标点击事件
			dateIconClickEvent () {
				this.dateShow = true
			},
			
			// 日期选择确定事件
			dateSure (value) {
				console.log(value)
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
					.log-list {
						padding: 0 10px;
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








