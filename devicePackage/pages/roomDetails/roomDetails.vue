
<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="房间详情" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="room-name">
				<text>主卧</text>
			</view>
			<view class="content-bottom">
				<view class="devices-list" @click="enterDeviceEvent(item)" v-for="(item,index) in deviceList" :key="index">
					<view class="list-top">
						<view class="list-top-left">
							<image :src="deviceIconPng"></image>
						</view>
						<view class="list-top-right">
							<text>在线</text>
						</view>
					</view>
					<view class="list-bottom">
						<text>{{ item.room }}</text>
						<text>{{ item.deviceName }}</text>
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
				deviceIconPng: require("@/static/img/room-icon.png"),
				showLoadingHint: false,
				deviceList: [
					{
						room: '主卧',
						deviceName: '跌倒检测雷达'
					},
					{
						room: '主卧',
						deviceName: '人员存在感知雷达'
					},
					{
						room: '主卧',
						deviceName: '体征监测雷达'
					},
					{
						room: '主卧',
						deviceName: '人体检测雷达'
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
			
			// 进入设备事件
			enterDeviceEvent (item) {
				if (item.deviceName == '跌倒检测雷达') {
					uni.redirectTo({
						url: '/devicePackage/pages/tumbleRadarCompleteSet/completeSet'
					})
				} else if (item.deviceName == '人员存在感知雷达') {
					uni.redirectTo({
						url: '/devicePackage/pages/existPerceptionRadarCompleteSet/completeSet'
					})
				} else if (item.deviceName == '体征监测雷达') {
					uni.redirectTo({
						url: '/devicePackage/pages/signMonitorRadarCompleteSet/completeSet'
					})
				} else if (item.deviceName == '人体检测雷达') {
					uni.redirectTo({
						url: '/devicePackage/pages/bodyDetectionRadarCompleteSet/completeSet'
					})
				}
			},
			
			backTo () {
				uni.switchTab({
					url: '/pages/device/device'
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
			width: 100%;
			flex: 1;
			padding: 0 10px 10px 10px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			.room-name {
				padding-left: 6px;
				box-sizing: border-box;
				height: 40px;
				display: flex;
				align-items: center;
				font-size: 20px;
				color: #101010;
			};
			.content-bottom {
				flex: 1;
				overflow: auto;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				align-content: flex-start;
				.devices-list {
					width: 48%;
					height: 102px;
					border-radius: 10px;
					box-shadow: 0px 1px 6px 0 rgba(0, 0, 0, 0.1);
					padding: 6px 16px;
					box-sizing: border-box;
					margin: 10px 0;
					.list-top {
						display: flex;
						justify-content: space-between;
						.list-top-left {
							>image {
								width: 38px;
								height: 39px
							}
						};
						.list-top-right {
							>text {
								font-size: 14px;
								color: #0079FF
							}
						}
					};
					.list-bottom {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						>text {
							color: #101010;
							&:first-child {
								font-size: 18px;
								margin-bottom: 4px
							};
							&:last-child {
								font-size: 16px
							};
						}
					}
				}
			}
		}
	}
</style>