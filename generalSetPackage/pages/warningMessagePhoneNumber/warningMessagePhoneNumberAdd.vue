<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="添加手机号" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="content-top-area">
				<u-form :model="form" ref="uForm">
					<u-form-item left-icon="minus-square-fill">
						<u-input v-model="form.phoneNumber" placeholder="请输入手机号"/>
					</u-form-item>
					<u-form-item left-icon="email">
						<u-input v-model="form.verificationCode" placeholder="请输入验证码" type="number"/>
						<template slot="right">
							<text v-if="showGetVerificationCode" @click="getVerificationCodeEvent">获取验证码</text>
							<text v-if="!showGetVerificationCode" class="count">{{count}}s后重新获取</text>
						</template>
					</u-form-item>
				</u-form>
			</view>
			<view class="content-bottom-area">
				<view class="content-bottom" @click="sureEvent">
					<text>确认</text>
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
				showLoadingHint: false,
				showGetVerificationCode: true,
				count: '',
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
			
			// 确认事件
			sureEvent () {
				uni.redirectTo({
					url: '/generalSetPackage/pages/warningMessagePhoneNumber/warningMessagePhoneNumber'
				})
			},
			
			// 获取验证码事件
			getVerificationCodeEvent () {
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.showGetVerificationCode = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.showGetVerificationCode = true;
							clearInterval(this.timer);
							this.timer = null
						}
					}, 1000)
				}
			},
			
			backTo () {
				uni.redirectTo({
					url: '/generalSetPackage/pages/warningMessagePhoneNumber/warningMessagePhoneNumber'
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
			background: #F5F5F5;
			padding: 10px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			.content-top-area {
				flex: 1;
				::v-deep .u-form {
					.u-form-item {
						background: #fff;
						padding: 2px 8px !important;
						margin-bottom: 10px;
						.u-input {
						};
						.u-form-item--left__content__icon {
							color: #11D183;
							font-size: 16px
						};
						.u-form-item--right__content__icon {
							font-size: 14px;
							color: #11D183
						};
						.uni-input-placeholder {
							color: #C1C2C5 !important;
							font-size: 14px !important
						}
					}
				}
			};
			.content-bottom-area {
				width: 100%;
				height: 100px;
				display: flex;
				align-items: center;
				justify-content: center;
				.content-bottom {
					width: 90%;
					height: 42px;
					background: #11D183;
					border-radius: 4px;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center
				}
			}
		}
	}
</style>







