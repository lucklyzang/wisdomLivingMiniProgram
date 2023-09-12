<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<u-modal v-model="modalShow" :show-title="false" :content="modalContent"
		 :show-cancel-button="true" @confirm="sureCancel" @cancel="cancelSure">
		</u-modal>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="通用设置" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="set-list-area">
				<view class="set-list" v-for="(item,index) in setList" :key="index" @click="setEvent(item.name)">
					<view class="set-list-left">
						<text>{{ item.name }}</text>
						<text v-if="index == 2">{{ item.nameInfo }}</text>
					</view>
					<view class="set-list-right">
						<u-switch v-model="checked" active-color="#11D183" v-if="index == 0"></u-switch>
						<u-icon name="arrow-right" size="40" color="#101010" v-else></u-icon>
					</view>
				</view>
			</view>
			<view class="log-out">
				<text @click="logOutEvent">退出登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import { userSignOut } from '@/api/login.js'
	import { removeAllLocalStorage } from '@/common/js/utils'
	import navBar from "@/components/zhouWei-navBar"
	export default {
		components: {
			navBar
		},
		data() {
			return {
				infoText: '退出中...',
				checked: true,
				showLoadingHint: false,
				modalShow: false,
				modalContent: '',
				setList: [
					{
						name: '消息提示音'
					},
					{
						name: '告警设置'
					},
					{
						name: '账号安全',
						nameInfo: '密码、手机号等'
					},
					{
						name: '个人信息收集清单'
					},
					{
						name: '应用权限使用清单'
					},
					{
						name: '隐私政策'
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
			
			// 弹框确定事件
			sureCancel () {
				this.modalContent = '';
				this.showLoadingHint = true;
				userSignOut().then((res) => {
					if ( res && res.data.code == 0) {
						this.$refs.uToast.show({
							title: '退出登录成功!',
							type: 'success',
							position: 'bottom'
						});
						// 清空store和localStorage
						this.$store.dispatch('resetDeviceState');
						removeAllLocalStorage();
						uni.redirectTo({
							url: '/pages/login/login'
						})
					} else {
					 this.modalShow = true;
					 this.modalContent = res.data.msg
					};
					this.showLoadingHint = false;
				})
				.catch((err) => {
					this.showLoadingHint = false;
					this.modalShow = true;
					this.modalContent = `${err}`
				})
			},
			
			// 弹框取消事件
			cancelSure () {
				
			},
			
			// 退出登录事件
			logOutEvent () {
				this.modalShow = true;
				this.modalContent = '确认退出登录?'
			},
			
			// 设置事件
			setEvent(name) {
				if (name == '告警设置') {
					uni.redirectTo({
						url: '/generalSetPackage/pages/warningSetting/warningSetting'
					})
				} else if (name == '账号安全') {
					uni.redirectTo({
						url: '/generalSetPackage/pages/accountSecurity/accountSecurity'
					})
				}
			},
			
			backTo () {
				uni.switchTab({
					url: '/pages/personInfo/personInfo'
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
		::v-deep .u-drawer {
			.u-drawer-content {
				.u-drawer__scroll-view {
					.u-model {
						.u-model__footer {
							.hairline-left {
								color: #11D183 !important
							}
						}
					}
				}
			}
		};
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
			.set-list-area {
				flex: 1;
				overflow: auto;
				.set-list {
					padding: 0 6px 0 10px;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 53px;
					background: #fff;
					margin-bottom: 10px;
					.set-list-left {
						font-size: 14px;
						color: #101010;
						>text {
							&:nth-child(2) {
								font-size: 12px;
								color: #888888;
								margin-left: 4px;
								vertical-align: bottom
							}
						}
					};
					.set-list-right {}
				}
			};
			.log-out {
				height: 120px;
				display: flex;
				justify-content: center;
				align-items: center;
				>text {
					display: inline-block;
					width: 206px;
					height: 42px;
					text-align: center;
					line-height: 42px;
					color: #E86F50;
					font-size: 14px;
					border-radius: 4px;
					border: 1px solid #E86F50
				}
			}
		}
	}
</style>




