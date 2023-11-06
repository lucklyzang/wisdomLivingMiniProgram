<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<!-- <ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/> -->
		<view class="content-area">
			<view class="content-top">
				<view class="device-binding" v-if="showLoadingHint">
					<image src="https://blink-radar.oss-cn-chengdu.aliyuncs.com/5ae75f4793c5ae4a3b8002752f0473019cd36b2e13bf716c8755670329c3e486.gif"></image>
				</view>
				<view class="device-success" v-if="!showLoadingHint && isSuccess">
					<image src="https://blink-radar.oss-cn-chengdu.aliyuncs.com/187b4cb8c0e3cfe249d49d8a1170b0f716ec3476bc6fe5152b17f362149739a9.png"></image>
				</view>
				<view class="device-fail" v-if="!showLoadingHint && isFail">
					<image src="https://blink-radar.oss-cn-chengdu.aliyuncs.com/9eabc7b7ea2df4cad6c4e5b27c185e425b210c4f70ca2069e9f1c04f4833bca4.png"></image>
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
	import { homePageBindDevice } from '@/api/home.js'
	export default {
		components: {
		},
		data() {
			return {
				infoText: '绑定中',
				showLoadingHint: true,
				isSuccess: false,
				isFail: false
			}
		},
		onLoad() {
			this.createUserDeviceBindEvent({
				id: this.deviceDataMessage.id, // 卡片id,
				devices: [this.currentNeedBindDevicesMessage.message.deviceId] // 设备idExample : 1,2
			})
		},
		computed: {
			...mapGetters([
				'userInfo',
				'familyId',
				'deviceDataMessage',
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
			
			// 首页用户数据卡片绑定设备
			createUserDeviceBindEvent (data) {
				this.showLoadingHint = true;
				this.isSuccess = false;
				this.isFail = false;
				this.infoText = '绑定中';
				homePageBindDevice(data).then((res) => {
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
						title: err.message,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			backTo () {
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

