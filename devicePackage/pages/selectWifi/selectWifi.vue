<template>
	<view class="content-box">
		<!-- wifi列表弹框 -->
		<view class="wifi-list-box">
			<u-popup v-model="wifiListBoxShow" mode="bottom" height="500px" border-radius="30" :safe-area-inset-bottom="true">
					<view class="wifi-title">
						<text>可添加设备的WIFI</text>
					</view>
					<view class="wifi-list-wrapper">
						<view class="wifi-list" v-for="(item,index) in wifiList" :key="item" @click="chooseWifiSureEvent">
							<view class="wifi-list-left">
								<text>{{ item }}</text>
								<text class="current-connect" v-if="index == 0">当前手机连接</text>
							</view>
							<view class="wifi-list-right">
								<u-icon name="wifi" color="#0E2442" size="40"></u-icon>
							</view>
						</view>
					</view>
			</u-popup>
		</view>
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="content-top-area">
				<view class="top-title">
					<text>选择Wi-Fi</text>
					<text>此设备只支持使用2.4GHz Wi-Fi连接使用</text>
				</view>
				<view class="form-area">
					<u-form :model="form" ref="uForm">
						<u-form-item>
							<u-input v-model="form.phoneNumber" height="80" placeholder="请输入WIFI名称"/>
							<template slot="right" v-if="!isSureWifi">
								<text @click="chooseWifiEvent">选择WIFI</text>
							</template>
						</u-form-item>
						<u-form-item v-if="!wifiListBoxShow || isSureWifi">
							<u-input v-model="form.verificationCode" height="80" placeholder="请输入WIFI密码" type="password"/>
						</u-form-item>
					</u-form>
				</view>
			</view>
			<view class="operation-area">
				<text @click="sureEvent">{{ isSureWifi ? '确认' : '下一步' }}</text>
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
				wifiListBoxShow: false,
				isSureWifi: false,
				wifiList: ['wifi1','wifi2','wifi3','wifi4','wifi5','wifi6','wifi7','wifi41','wifi52','wifi63','wifi73'],
				form: {
					phoneNumber: '',
					verificationCode: ''
				}
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
			
			// 选择wifi事件
			chooseWifiEvent () {
				this.wifiListBoxShow = true
			},
			
			// 选择wifi确认事件
			chooseWifiSureEvent () {
				this.wifiListBoxShow = false;
				this.isSureWifi = true
			},
			
			// wifi确认连接事件
			sureEvent () {
				uni.redirectTo({
					url: '/devicePackage/pages/selectWifi/connectDevice'
				})
						
			},
			
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
		};
		.wifi-list-box {
			::v-deep .u-drawer {
				.u-drawer-content {
					padding: 20px 30px;
					box-sizing: border-box;
					display: flex;
						flex-direction: column;
					// .uni-scroll-view-content {
					// 	display: flex;
					// 	flex-direction: column;
						.wifi-title {
							font-size: 14px;
							color: rgba(14, 36, 66, 0.56);
							margin-bottom: 10px;
						};
						.wifi-list-wrapper {
							flex: 1;
							overflow: auto;
							.wifi-list {
								display: flex;
								height: 50px;
								justify-content: space-between;
								.wifi-list-left {
									display: flex;
									flex-direction: column;
									>text {
										font-size: 18px;
										color: #101010;
									};
									.current-connect {
											font-size: 14px;
											color: rgba(14, 36, 66, 0.56)
									}
								};
								.wifi-list-right {}
							}
						}
					// }
				}
			}		
		};
		.nav {
			width: 100%;
			background: #fff;
		};
		.content-area {
			width: 100%;
			padding: 16px;
			box-sizing: border-box;
			flex: 1;
			overflow: auto;
			display: flex;
			align-items: center;
			flex-direction: column;
			.content-top-area {
				width: 100%;
				flex: 1;
				display: flex;
				flex-direction: column;
				.top-title {
					display: flex;
					flex-direction: column;
					margin-bottom: 40px;
					>text {
						&:first-child {
							font-size: 22px;
							color: #101010
						};
						&:last-child {
							margin-top: 4px;
							font-size: 14px;
							color: #0E2442
						}
					}
				};
				.form-area {
					flex: 1;
					overflow: auto;
					::v-deep .u-form {
						.u-form-item {
							background: rgba(229, 229, 229, 0.41);
							border-radius: 13px;
							padding: 2px 8px !important;
							margin-bottom: 30px;
							.u-input {
							};
							.u-form-item--right__content__icon {
								font-size: 14px;
								color: #34B9C0
							};
							.uni-input-placeholder {
								color: #C1C2C5 !important;
								font-size: 14px !important
							}
						}
					}
				}
			};
			.operation-area {
				height: 80px;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				>text {
					font-size: 14px;
					display: inline-block;
					border-radius: 26px;
					width: 60%;
					height: 40px;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #11D183;
					color: #fff
				}
			}
		}
	}
</style>




