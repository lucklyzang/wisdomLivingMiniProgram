<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="消息详情" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view>
				<text>{{ deviceNoticeDetails.content.category == 0 ? '设备通知' : '系统通知' }}</text>
			</view>
			<view v-if="deviceNoticeDetails.content.category == 0">
				<text></text>
				<text>{{ deviceTypeTransitionText(deviceNoticeDetails.content.type) }}</text>
				<text>{{ deviceNoticeDetails.content.roomName }}</text>
				<text>{{ deviceNoticeDetails.time }}</text>
			</view>
			<view v-else>
				<text>{{ deviceNoticeDetails.content.familyName }}</text>
				<text>{{ deviceNoticeDetails.time }}</text>
			</view>
			<view v-if="deviceNoticeDetails.content.category == 0">
				<text>
					{{ deviceNoticeDetails.content.content }}
				</text>
			</view>
			<view v-if="deviceNoticeDetails.content.category == 1">
				<u-parse :html="deviceNoticeDetails.content.content"></u-parse>
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
				showLoadingHint: false
			}
		},
		onLoad() {
			console.log('详情信息',this.deviceNoticeDetails);
		},
		computed: {
			...mapGetters([
				'userInfo',
				'deviceNoticeDetails'
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
			
			// 设备名称转换
			deviceTypeTransitionText (num) {
				let temporaryNum = num.toString();
				switch(temporaryNum) {
					case '1' :
						return '体征检测雷达'
						break;
					case '2' :
						return '存在感知雷达'
						break;
					case '3' :
						return '跌倒雷达'
						break;
					case '4' :
						return '人体检测雷达'
						break
				}
			},
			
			backTo () {
				uni.redirectTo({
					url: '/devicePackage/pages/device/index/index'
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
			padding: 16px;
			box-sizing: border-box;
			>view {
				&:nth-child(1) {
					>text {
						color: #101010;
						font-size: 16px;
					}
				};
				&:nth-child(2) {
					margin-top: 8px;
					margin-bottom: 8px;
					word-break: break-all;
					>text {
						color: #737373;
						margin-right: 14px;
						font-size: 12px;
						&:nth-child(1){
							position: relative;
						};
						&:nth-child(1) ::after{
							content: "";
							position: absolute;
							top: 1px;
							right: -8px;
							width: 1px;
							height: 14px;
							background: #BBBBBB
						};
						&:nth-child(2){
							position: relative;
						};
						&:nth-child(2) ::after{
							content: "";
							position: absolute;
							top: 1px;
							right: -8px;
							width: 1px;
							height: 14px;
							background: #BBBBBB
						}
					}
				};
				&:nth-child(3) {
					margin-top: 8px;
					margin-bottom: 8px;
					word-break: break-all;
					>text {
						color: #737373;
						margin-right: 14px;
						font-size: 12px;
					}	
				};		
				&:last-child {
					word-break: break-all;
					line-height: 20px;
					color: #000000;
					font-size: 12px
				}
			}
		}
	}
</style>


