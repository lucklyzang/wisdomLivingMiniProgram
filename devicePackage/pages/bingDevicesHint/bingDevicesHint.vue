<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<!-- <ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/> -->
		<view class="content-area">
			<view class="content-top">
				<view class="device-binding" v-if="showLoadingHint">
					<image :src="deviceBindingGif"></image>
				</view>
				<view class="device-success" v-if="!showLoadingHint && isSuccess">
					<image :src="deviceBindSuccessPng"></image>
				</view>
				<view class="device-fail" v-if="!showLoadingHint && isFail">
					<image :src="deviceBindFailPng"></image>
				</view>
				<text>{{ infoText }}</text>
			</view>
			<view class="content-bottom">
				<text @click="backTo">返回</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import { createUserDeviceBind } from '@/api/user.js'
	export default {
		components: {
		},
		data() {
			return {
				infoText: '绑定中',
				showLoadingHint: false,
				isSuccess: false,
				isFail: false,
				deviceBindingGif: require("@/static/img/device-binding.gif"),
				deviceBindSuccessPng: require("@/static/img/device-bind-success.png"),
				deviceBindFailPng: require("@/static/img/device-bind-fail.png")
			}
		},
		onLoad() {
			this.createUserDeviceBindEvent({
				userId: this.userInfo.userId,
				deviceId: this.currentNeedBindDevicesMessage.message.deviceId,
				familyId: this.familyId,
				roomId: this.currentNeedBindDevicesMessage.message.roomId,
				customName: this.currentNeedBindDevicesMessage.message.customName,
				deviceCode: this.currentNeedBindDevicesMessage.message.sn
			})
		},
		computed: {
			...mapGetters([
				'userInfo',
				'familyId',
				'currentNeedBindDevicesMessage'
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
			
			// 用户绑定设备
			createUserDeviceBindEvent (data) {
				this.showLoadingHint = true;
				createUserDeviceBind(data).then((res) => {
					if ( res && res.data.code == 0) {
						this.infoText = '绑定成功!';
						this.isSuccess = true
					} else {
						this.isFail = true;
						this.infoText = '绑定失败!'
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error',
							position: 'bottom'
						})
					};
					this.showLoadingHint = false;
				})
				.catch((err) => {
					this.isFail = true;
					this.infoText = '绑定失败!';
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
					url: '/devicePackage/pages/bingDevices/bingDevices'
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
		.content-area {
			padding: 16px;
			box-sizing: border-box;
			height: 100%;
			display: flex;
			flex-direction: column;
			.content-top {
				height: 55vh;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: flex-end;
				.device-binding {
					>image {
						width: 175px;
						height: 175px
					}
				};
				.device-success {
					>image {
						width: 94px;
						height: 94px
					}
				};
				.device-fail {
					>image {
						width: 71px;
						height: 71px
					}
				}
				>text {
					margin-top: 40px;
					font-size: 18px;
					color: #101010
				}
			};
			.content-bottom {
				height: 45vh;
				display: flex;
				align-items: center;
				justify-content: center;
				>text {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 319px;
					height: 55px;
					border: 1px solid #11D183;
					border-radius: 28px;
					color: #11D183;
					font-size: 18px;
				}
			}
		}
	}
</style>

