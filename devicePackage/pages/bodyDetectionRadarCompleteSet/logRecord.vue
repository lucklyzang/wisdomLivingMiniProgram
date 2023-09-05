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
			<view class="log-list-wrapper">
				<view class="log-list" v-for="(item,index) in logList" :key="index">
					<text>{{ item.date }}</text>
					<text>>>></text>
					<text>进: 1</text>
					<text>出: 0</text>
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
				moreIconPng: require("@/static/img/more-icon.png"),
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
			box-sizing: border;
			.log-list-wrapper {
				height: 100%;
				overflow: auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				.log-list {
					margin-bottom: 10px;
					>text {
						font-size: 14px;
						color: #101010;
						&:nth-child(2) {
							margin-left: 4px
						};
						&:nth-child(3) {
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
</style>







