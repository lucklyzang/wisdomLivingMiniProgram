<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="info-title">
				<text>
					扫描不到要添加的设备怎么办？
				</text>
			</view>
			<view class="info-content">
				<view>
					<text>
						可能由于当前网络环境较差或设备已被他人绑定
					</text>
				</view>
				<view>
					<text>
						 1.请确保手机与设备之间的距离足够近，并且周围网络环境没有强干扰。
					</text>
				</view>
				<view>
					<text>
						2.同时需确认米家应用的定位权限未被关闭。若手动关闭了应用定位权限可能会导致无法自动发现设备
					</text>
				</view>
				<view>
					<text>
						 3.如果仍始终无法发现设备，可能因为设备已经被他人绑定了。如果你并不清楚是谁连接了设备，可以进行重置，重置方式请查阅说明书，或在APP中选择“手动添加”设备，根据引导操作。
					</text>
				</view>
				<view>
					<text>
						4.蓝牙设备请检查设备是否正常通电，手机蓝牙是否已经打开。
					</text>
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
				showLoadingHint: false
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
			
			backTo () {
				uni.redirectTo({
					url: '/devicePackage/pages/addDevices/addDevices'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "~@/common/stylus/variable.scss";
	page {
		width: 100%;
		height: 100vh;
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
			padding: 0px 16px 16px 16px;
			box-sizing: border-box;
			.info-title {
				text-align: center;
				font-size: 16px;
				color: #101010;
				font-weight: bold;
				margin-bottom: 10px;
			};
			.info-content {
				>view {
					font-size: 14px;
					color: #101010;
					line-height: 24px;
					&:nth-child(1) {
						text-align: center;
						margin-bottom: 10px;
					};
					&:nth-child(2) {
						text-indent: 20px;
						margin-bottom: 20px;
					};
					&:nth-child(3) {
						text-indent: 20px;
						margin-bottom: 20px;
					};
					&:nth-child(4) {
						text-indent: 20px;
						margin-bottom: 20px;
					};
					&:nth-child(5) {
						text-indent: 20px;
					}
				}
			}
		}
	}
</style>



