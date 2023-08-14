<template>
	<view class="container">
		<!-- 隐私政策概要内容弹框 -->
		<view class="privacy-policy-box">
			<u-popup v-model="privacyPolicyBoxShow" mode="bottom" border-radius="30" :mask-close-able="false" :safe-area-inset-bottom="true">
					<view class="privacy-policy-title">
						<text>
							守望家隐私政策概要
						</text>
					</view>
					<view class="privacy-policy-content">
						<text>
							欢迎您使用手望家小程序。您可以使用本小程序以实现智能设备的控制、共享功能。我们将严格遵守相关法律法规和隐私政策以保护您的个人信息。为提供基本服务,需要联网以及调用您的如下权限或功能,以搜集必要的个人信息:
						</text>
					</view>
					<view class="privilege-box">
						<text>
							必要权限(用于本小程序的基本服务和功能)
						</text>
					</view>
					<view class="account-box">
						<text>
							账号信息(必选)用于本小程序内使用米家账号快速登陆的功能
						</text>
					</view>
					<view class="info-title">
						<text>
							请阅读并同意
						</text>
						<text>用户协议</text>
						<text>与</text>
						<text>
							隐私政策
						</text>
					</view>
					<view class="btn-box">
						<button @click="quitEvent">退出</button>
						<button @click="agreeContinueEvent">同意并继续</button>
					</view>
			</u-popup>
		</view>
		<!-- 微信授权弹框 -->
		<view class="weixin-authorization-info-box">
			<u-popup v-model="weixinAuthorizationInfoBoxShow" mode="bottom" :safe-area-inset-bottom="true" height="414px">
				<view class="weixin-top-area">
					<view class="weixin-top-area-left">
						<image :src="logoSmallIcon"></image>
						<text>守望家</text>
					</view>
					<view class="weixin-top-area-right">
						<u-icon name="info-circle" size="34" color="#dbdbdb"></u-icon>
					</view>
				</view>
				<view class="account-info-area">
					<text>申请获取并验证你的手机号</text>
					<text>登录并关联米家账号</text>
				</view>
				<view class="phone-number-area">
					<text>15669106075</text>
					<text>微信绑定号码</text>
				</view>
				<view class="not-allow-area">
					<text>不允许</text>
				</view>
				<view class="other-phone-number-area">
					<text>使用其他号码</text>
				</view>
			</u-popup>
		</view>
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" text="登录中,请稍候···" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<u-modal v-model="modalShow" :content="modalContent"
		 :show-cancel-button="true" @confirm="sureCancel" @cancel="cancelSure">
		</u-modal>
		<view class="container-content">
			<view class="top-area-box">
				<image :src="loginBackgroundPng"></image>
				<view class="title">
					<view>
						<text>
							{{ isForgetPassword ? '忘记密码' : isSetPassword ? '设置密码' : isPasswordLogin ? '密 码 登 录' : '验 证 码 登 录 / 注 册' }}
						</text>
					</view>
					<view>
						<image :src="loginLogoPng"></image>
					</view>
					<view>
						<text>守&nbsp;&nbsp;望&nbsp;&nbsp;家</text>
					</view>
				</view>
			</view>
			<view class="skip-box" v-if="isSetPassword">
				<text>跳过</text>
			</view>
			<view class="form-box">
				<u-form :model="form" ref="uForm">
					<u-form-item  v-if="!isSetPassword" label="+86" :label-style="{'font-size':'12px','color': '#B5B5B5'}">
						<u-input v-model="form.username" placeholder="请输入手机号"/>
					</u-form-item>
					<u-form-item v-if="(isPasswordLogin && !isForgetPassword) || isSetPassword">
						<u-input v-model="form.password" placeholder="请输入密码" type="password"/>
					</u-form-item>
					<u-form-item v-if="(!isPasswordLogin || isForgetPassword) && !isSetPassword">
						<u-input v-model="form.verificationCode" placeholder="请输入验证码" type="number"/>
						<template slot="right">
							<text v-if="showGetVerificationCode" @click="getVerificationCodeEvent">获取验证码</text>
							<text v-if="!showGetVerificationCode" class="count">{{count}}s后重新获取</text>
						</template>
					</u-form-item>
					<u-form-item v-if="isForgetPassword">
						<u-input v-model="form.newPassword" placeholder="请输入新密码" type="password"/>
					</u-form-item>
					<u-form-item v-if="isForgetPassword"> 
						<u-input v-model="form.againPassword" placeholder="再次输入新密码" type="password"/>
					</u-form-item>
				</u-form>
				<view class="form-bottom-info-text" v-if="!isForgetPassword && !isSetPassword">
					<text class="info-left" @click="loginMethodEvent">{{ isPasswordLogin ? '验证码登录/注册' : '密码登录' }}</text>
					<text v-if="isPasswordLogin" class="info-right" @click="forgetPasswordEvent">忘记密码</text>
				</view>
			</view>
			<view class="form-btn" v-if="!isForgetPassword && !isSetPassword">
				<button @click="sure">{{ isPasswordLogin ? '登 录' : '登 录/注 册' }}</button>
				<view class="form-btn-info-text">
					<u-checkbox-group>
						<u-checkbox v-model="isReadAgreeChecked" shape="circle" active-color="#289E8E">阅读并同意协议</u-checkbox>
					</u-checkbox-group>
					<text>协议链接</text>
				</view>
			</view>
			<view class="enter-home-btn" v-if="isForgetPassword || isSetPassword">
				<button @click="sure">进 入 首 页</button>
			</view>
      <view class="weixin-login" v-if="!isForgetPassword && !isSetPassword">
        <u-divider border-color="#DBDBDB" color="#919191" @click="weixinLoginEvent">其他登录方式</u-divider>
        <view class="image-wrapper" @click="weixinLoginEvent">
          <image src="/static/img/weixin.png">
        </view>
      </view>
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	import {logIn} from '@/api/login.js'
	import { setCache, getCache, removeCache } from '@/common/js/utils'
	export default {
	components: {
	 },
		data() {
			return {
				loginBackgroundPng: require("@/static/img/login-background.png"),
				loginLogoPng: require("@/static/img/login-logo.png"),
				logoSmallIcon: require("@/static/img/logo-small-icon.png"),
				form: {
					username: '',
					password: '',
					verificationCode: '',
					newPassword: '',
					againPassword: ''
				},
				showGetVerificationCode: true,
				isSetPassword: false,
				count: '',
				privacyPolicyBoxShow: false,
				weixinAuthorizationInfoBoxShow: false,
				timer: null,
				isPasswordLogin: true,
				isForgetPassword: false,
				isReadAgreeChecked: false,
				showLoadingHint: false,
				modalShow: false,
				modalContent: ''
			}
		},
		onReady () {
		},
		computed: {
			...mapGetters([
				'userInfo'
			])
		},
		mounted () {
			this.form.username = getCache('userName') ? getCache('userName') : '';
			this.form.password = getCache('userPassword') ? getCache('userPassword') : ''
		},
		methods: {
			...mapMutations([
				'storeUserInfo',
				'changeOverDueWay'
			]),
			
			// 登录方式点击事件
			loginMethodEvent () {
				this.isPasswordLogin = !this.isPasswordLogin;
				this.form.username = '';
				this.form.password = '';
				this.form.verificationCode = ''
			},
			
			// 忘记密码事件
			forgetPasswordEvent () {
				this.isSetPassword = false;
				this.isForgetPassword = true;
				this.form.username = '';
				this.form.password = '';
				this.form.verificationCode = '';
				this.form.newPassword = ''
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
			
			// 退出隐私政策概要弹框事件
			quitEvent () {
				this.privacyPolicyBoxShow = false
			},
			
			// 同意并继续事件
			agreeContinueEvent () {
				this.privacyPolicyBoxShow = false
			},
				 
			// 账号密码事件
			sure () {
				// 注册时获取验证码后进入设置密码环节
				if (!this.isPasswordLogin) {
					this.isSetPassword = true
				};
				uni.switchTab({
					url: '/pages/index/index'
				})
				// if (!this.form.username) {
				// 	this.$refs.uToast.show({
				// 		title: '请输入账号',
				// 		type: 'warning'
				// 	});
				// 	return
				// };
				// if (!this.form.password) {
				// 	this.$refs.uToast.show({
				// 		title: '请输入密码',
				// 		type: 'warning'
				// 	});
				// 	return
				// };
				// let loginMessage = {
				//   username: this.form.username,
				//   password: this.form.password
				// };
				// this.showLoadingHint = true;
				// logIn(loginMessage).then((res) => {
				// 	if (res) {
				// 	  if (res.data.code == 200) {
				// 		   this.changeOverDueWay(false);
				// 		   setCache('storeOverDueWay',false); 
				// 			// 登录用户名密码及用户信息存入Locastorage
    //           // 判断是否勾选记住用户名密码
    //           if (this.list[0]['checked']) {
    //             setCache('userName', this.form.username);
    //             setCache('userPassword', this.form.password);
    //           } else {
    //             removeCache('userName', this.form.username);
    //             removeCache('userPassword', this.form.password);
    //           };
				// 			setCache('userInfo', res.data.data.worker);
				// 			setCache('roleNameList', res.data.data.roleNameList);
				// 			setCache('permissionInfo', res.data.data.authorities);
				// 			setCache('isLogin', true);
				// 			this.storeUserInfo(res.data.data.worker);
				// 			this.changePermissionInfo(res.data.data.authorities);
				// 			this.changeRoleNameList(res.data.data.roleNameList);
				// 			if (this.userInfo.hospitalList.length > 1) {
				// 				this.hospitalList = [];
				// 				this.selectHospitalList = [];
				// 				for (let item of this.userInfo.hospitalList) {
				// 					this.hospitalList.push({
				// 						value: item.hospitalName,
				// 						id: item.id
				// 					})
				// 				};
				// 				this.chooseHospitalShow = true
				// 			} else {
				// 				uni.navigateTo({
				// 					url: '/pages/index/index'
				// 				})
				// 			}
				// 	  } else {
				// 		 this.modalShow = true;
				// 		 this.modalContent = `${res.msg}`
				// 	  }
				// 	};
				// 	this.showLoadingHint = false;
				//   })
				//   .catch((err) => {
				// 	   this.showLoadingHint = false;
				// 	   this.modalShow = true;
				// 	   this.modalContent = `${err}`
				//   })
			},
      
      // 微信授权登录事件
      weixinLoginEvent () {
        this.weixinAuthorizationInfoBoxShow = true
      },
			
			// 弹框确定事件
			sureCancel () {},
			
			// 弹框取消事件
			cancelSure () {}
		}
	}
</script>

<style lang="scss">
	@import "~@/common/stylus/variable.scss";
	page {
		width: 100%;
		height: 100vh;
	};
	.container {
		@include content-wrapper;
		font-size: 14px;
		.privacy-policy-box {
			::v-deep .u-drawer {
				.u-drawer-content {
					padding: 20px 10px;
					box-sizing: border-box;
					.privacy-policy-title {
						font-size: 18px;
						color: #101010;
						font-weight: bold;
						margin-bottom: 10px
					};
					.privacy-policy-content {
						text-align: justify;
						margin-bottom: 10px;
						line-height: 26px;
						font-size: 14px
					};
					.privilege-box {
						margin-bottom: 10px;
						line-height: 26px;
						font-size: 14px
					};
					.account-box {
						text-align: justify;
						margin-bottom: 10px;
						line-height: 26px;
						font-size: 14px
					};
					.info-title {
						margin-bottom: 10px;
						font-size: 14px;
						text {
							&:first-child {
								color: #101010;
								font-weight: bold;
							};
							&:nth-child(2) {
								color: blue;
								font-weight: bold;
							};
							&:nth-child(3) {
								color: #101010;
								font-weight: bold;
							};
							&:nth-child(4) {
								color: blue;
								font-weight: bold;
							}
						}
					};
					.btn-box {
						margin: 0 auto;
						margin-top: 40px;
						display: flex;
						justify-content: space-between;
						width: 90%;
						button {
							width: 110px;
							font-size: 16px;
							color: #000000;
							background: #fff;
							border: 1px solid #BBBBBB;
							height: 36px;
							text-align: center;
							line-height: 36px;
						  border-radius: 10px;
							&:last-child {
								color: #289E8E
							}
						}
					}
				}
			}
		};
		.weixin-authorization-info-box {
			::v-deep .u-drawer {
				.u-drawer-content {
					padding: 10px 20px;
					box-sizing: border-box;
					background: #fff;
					.uni-scroll-view-content {
						display: flex;
						flex-direction: column;
					}
						.weixin-top-area {
							display: flex;
							justify-content: space-between;
							align-items: center;
							.weixin-top-area-left {
								display: flex;
								align-items: center;
								>image {
									width: 31px;
									height: 31px;
									margin-right: 6px
								};
								>text {
									font-size: 14px;
									color: #101010
								}
							};
							.weixin-top-area-right {}
						};
						.account-info-area {
							margin-top: 20px;
							display: flex;
							flex-direction: column;
							>text {
								&:first-child {
									font-size: 16px;
									color: #101010;
									font-weight: bold;
								};
								&:last-child {
									margin-top: 8px;
									font-size: 12px;
									color: #adadad
								}
							}
						};
						.phone-number-area {
							margin-top: 20px;
							background: #ffffd6;
							border: 2px solid #ffd17c;
							width: 100%;
							height: 58px;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							font-size: 10px;
							color: #4c4c4c;
							>text {
								&:first-child {
									font-size: 14px;
									margin-bottom: 2px;
								};
								&:last-child {
									color: #cdcdcd
								}
							}
						};
						.not-allow-area {
							margin-top: 10px;
							background: #ffffd6;
							border: 2px solid #ffd17c;
							width: 100%;
							height: 58px;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: 14px;
							color: #4c4c4c;
						};
						.other-phone-number-area {
							width: 100%;
							flex: 1;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 12px;
							height: 150px;
							color: #3a3ab7
						}
					}
			}		
		};
		/deep/ .u-model {
			position: relative;
			box-sizing: border-box;
			overflow: auto !important;
			.u-model__content {
				.slot-content {
					height: 300px;
					.show-box {
						.list-container {
							top: 0;
							.list {
								.item {
									color: #a8a8a8
								};
								.active {
									color: #01a6ff;
								}
							}
						}
					}
				}
			};
			.u-model__footer__button {
				color: #43c3f4 !important
			}
		};
		.container-content {
			flex: 1;
			background: #fff;
			position: relative;
			.top-area-box {
				position: relative;
				width: 100%;
				height: 30vh;
				> image {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 30vh
				};
				.title {
					width: 100%;
					height: 30vh;
					display: flex;
					justify-content: center;
					flex-direction: column;
					align-items: center;
					color: black;
					font-size: 26px;
				  color: #fff;
				  font-weight: bold;
				  >view {
						z-index: 1000;
						&:first-child {
							font-size: 18px
						};
						&:nth-child(2) {
							width: 64px;
							height: 72px;
							margin: 20px 0 10px 0;
							 image {
								 width: 100%;
								 height: 100%
							 }
						};
						&:last-child {
							font-size: 18px
						}
					}
				}
			};
			.skip-box {
				width: 80%;
				margin: 0 auto;
				margin-top: 40px;
				text-align: right;
				font-size: 22px;
				color: #101010
			};
			.form-box {
        width: 80%;
        margin: 0 auto;
				margin-top: 40px;
				display: flex;
				flex-direction: column;
				position: relative;
				::v-deep .u-form {
					.u-form-item {
						&:last-child {
							margin-bottom: 0
						};
						margin-bottom: 30px;
						.u-input {
							background: #fff;
						};
						.u-form-item--right__content__icon {
							font-size: 14px;
							color: #289E8E
						};
						.uni-input-placeholder {
							color: #101010 !important;
							font-size: 14px !important
						}
					};
					.uni-input-placeholder::after {
						border: 0 solid #989898 !important
					}
				};
				.form-bottom-info-text {
					width: 100%;
					display: flex;
					height: 40px;
					align-items: center;
					justify-content: space-between;
					>text {
						font-size: 12px;
						color: #B5B5B5
					}
				}
			};
			.form-btn {
        width: 80%;
        margin: 0 auto;
        margin-top: 50px;
				button {
					font-size: 16px;
					color: #000000;
					background: #fff;
					border: 1px solid #BBBBBB;
					height: 46px;
					line-height: 46px;
          border-radius: 10px;
				};
				.form-btn-info-text {
					margin-top: 4px;
					align-items: center;
					text-align: right;
					display: flex;
					justify-content: flex-end;
					::v-deep .u-checkbox-group {
						.u-checkbox {
							.u-checkbox__label {
								font-size: 12px;
								color: #252525
							}
						}
					};
					>text {
						color: #0097E6;
						font-size: 12px
					}
				}
			};
			.enter-home-btn {
				width: 80%;
				margin: 0 auto;
				margin-top: 50px;
				button {
					font-size: 16px;
					color: #000000;
					background: #fff;
					border: 1px solid #BBBBBB;
					height: 46px;
					line-height: 46px;
				  border-radius: 10px;
				}
			};
      .weixin-login {
        width: 80%;
        margin: 0 auto;
        margin-top: 90px;
				::v-deep .u-divider {
					.u-divider-line {
						width: 150px !important
					};
					.u-divider-text {
						font-size: 14px
					}
				};
        .image-wrapper {
          width: 24px;
          height: 24px;
          margin: 0 auto;
					margin-top: 10px;
          image {
            width: 24px;
						height: 24px
          }
        }
      }
		}
	}
</style>
