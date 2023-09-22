<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010"  title="修改家庭信息" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="edit-top">
				<view class="edit-input">
					<u-input v-model="familyNameValue" type="text" placeholder="请输入家庭名称" placeholder-style="color:#101010" />
				</view>
			</view>
			<view class="edit-bottom">
				<text @click="completeEvent">完成</text>
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
	import { updateUserFamily, getUserFamilyList } from '@/api/user.js'
	export default {
		components: {
			navBar
		},
		data() {
			return {
				infoText: '',
				showLoadingHint: false,
				familyNameValue: '',
				receiveData: {}
			}
		},
		onLoad(options) {
			this.receiveData = JSON.parse(options.transmitData);
			this.familyNameValue = this.receiveData.value
		},
		computed: {
			...mapGetters([
				'userInfo',
				'familyMessage'
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
				'changeOverDueWay',
				'changeFamilyId',
				'changeFamilyMessage'
			]),
			
			// 完成事件
			completeEvent () {
				if (!this.familyNameValue) {
					this.$refs.uToast.show({
						title: '家庭名称不能为空!',
						type: 'warning',
						position: 'bottom'
					});
					return
				};
				this.showLoadingHint = true;
				this.infoText = '添加中...';
				updateUserFamily({
						name: this.familyNameValue,
						id: this.receiveData.id
					}).then((res) => {
					if ( res && res.data.code == 0) {
						this.$refs.uToast.show({
							title: '修改成功',
							type: 'success',
							position: 'bottom'
						});
						this.queryUserFamilyList()
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error',
							position: 'bottom'
						})
					}	
					this.showLoadingHint = false;
				})
				.catch((err) => {
					this.showLoadingHint = false;
					this.$refs.uToast.show({
						title: err.message,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			// 获取用户家庭列表
			queryUserFamilyList () {
				this.showLoadingHint = true;
				this.infoText = '加载中...';
				let familyMemberList = [];
				let fullFamilyMemberList = [];
				getUserFamilyList().then((res) => {
					if ( res && res.data.code == 0) {
						fullFamilyMemberList = res.data.data;
						for (let item of res.data.data) {
							familyMemberList.push({
								id: item.id,
								value: item.name
							})
						};
						this.changeFamilyId(familyMemberList[0]['id']);
						let temporaryFamilyMessage = this.familyMessage;
						temporaryFamilyMessage['familyMemberList'] = familyMemberList;
						temporaryFamilyMessage['fullFamilyMemberList'] = fullFamilyMemberList;
						this.changeFamilyMessage(temporaryFamilyMessage);
						this.backTo()
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error',
							position: 'bottom'
						})
					};
					this.showLoadingHint = false;
				})
				.catch((err) => {
					this.showLoadingHint = false;
					this.$refs.uToast.show({
						title: err.message,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			backTo () {
				uni.redirectTo({
					url: '/generalSetPackage/pages/familyManagement/familyManagement'
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
			flex: 1;
			padding: 20px;
			background: #F5F5F5;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			.edit-top {
				flex: 1;
				display: flex;
				flex-direction: column;
				.edit-input {
					::v-deep {
						.u-input {
							border-radius: 8px;
							padding-left: 6px !important;
							height: 42px;
							box-sizing: border-box;
							background: #fff !important;
							.u-input__input {
								height: 42px;
								line-height: 42px;
							}
						}
					}
				}
			};
			.edit-bottom {
				width: 100%;
				height: 200px;
				display: flex;
				align-items: center;
				>text {
					width: 100%;
					display: inline-block;
					height: 42px;
					text-align: center;
					line-height: 42px;
					border-radius: 4px;
					background: #11D183;
					font-size: 12px;
					color: #fff
				}
			}
		}
	}
</style>




