<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="消息" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="message-title-area">
			<view class="message-atile-area-left">
				<text>一条未读</text>
				<text>全部已读</text>
			</view>
			<view class="message-atile-area-right">
				<xfl-select
					:list="familyMemberList"
					:clearable="false"
					:showItemNum="8"
					 @change="familyMemberChange"
					placeholder = "请选择家庭"
					:selectHideType="'hideAll'"
					:initValue="familyMemberList[0]['value']"
				>
				</xfl-select>
			</view>
		</view>
		<view class="message-content-area">
			<view class="message-list">
				<text>
					2023-07-20 14:21
				</text>
				<view class="message-inner-list" @click="enterMessageDetailsPageEvent">
					<view class="message-inner-list-top">
						<view class="inner-list-left">
							<image :src="systemInformIconPng"></image>
							<text>设备通知</text>
						</view>
						<view class="inner-list-right">
							<text>张和大家都的家</text>
							<text>体征监测雷达</text>
							<text>卧室</text>
						</view>
					</view>
					<view class="message-inner-list-bottom">
						<text>
							今天23点50分识别到今日最大心率153，最大心率值略高于正常值
						</text>
					</view>
				</view>
			</view>
			<view class="message-list">
				<text>
					2023-07-20 14:21
				</text>
				<view class="message-inner-list">
					<view class="message-inner-list-top">
						<view class="inner-list-left">
							<image :src="deviceInformIconPng"></image>
							<text>设备通知</text>
						</view>
						<view class="inner-list-right">
							<text>张三的家</text>
							<text>体征监测雷达</text>
							<text>卧室</text>
						</view>
					</view>
					<view class="message-inner-list-bottom">
						<text>
							今天23点50分识别到今日最大心率153，最大心率值略高于正常值
						</text>
					</view>
				</view>
				<view class="message-inner-list">
					<view class="message-inner-list-top">
						<view class="inner-list-left">
							<image :src="deviceInformIconPng"></image>
							<text>设备通知</text>
						</view>
						<view class="inner-list-right">
							<text>张三的家</text>
							<text>体征监测雷达</text>
							<text>卧室</text>
						</view>
					</view>
					<view class="message-inner-list-bottom">
						<text>
							今天23点50分识别到今日最大心率153，最大心率值略高于正常值
						</text>
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
	import xflSelect from '@/components/xfl-select/xfl-select.vue';
	import { getUserFamilyList } from '@/api/user.js'
	export default {
		components: {
			navBar,
			xflSelect
		},
		data() {
			return {
				infoText: '',
				showLoadingHint: false,
				deviceInformIconPng: require("@/static/img/device-inform-icon.png"),
				systemInformIconPng: require("@/static/img/system-inform-icon.png"),
				familyMemberList: [],
			}
		},
		onLoad() {
			this.queryUserFamilyList()
		},
		computed: {
			...mapGetters([
				'userInfo',
				'familyId'
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
				uni.switchTab({
					url: '/pages/device/device'
				})
			},
			
			// 家庭选择下拉框下拉选择确定事件
			familyMemberChange (val) {
				console.log(val)
			},
			
			// 获取用户家庭列表
			queryUserFamilyList () {
				this.familyMemberList = [];
				getUserFamilyList().then((res) => {
					if ( res && res.data.code == 0) {
						for (let item of res.data.data) {
							this.familyMemberList.push({
								id: item.id,
								value: item.name
							})
						};
						if (this.familyId) {
							this.initValue = this.familyId
						} else {
							this.initValue = this.familyMemberList[0]['id']
						};
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error',
							position: 'bottom'
						})
					}
				})
				.catch((err) => {
					this.$refs.uToast.show({
						title: err,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			// 进入消息详情事件
			enterMessageDetailsPageEvent () {
				uni.redirectTo({
					url: '/devicePackage/pages/messageDetails/messageDetails'
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
		background: #f5f5f5;
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
		.message-title-area {
			height: 40px;
			padding: 0 16px;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #fff;
			.message-atile-area-left {
				>text {
					font-size: 14px;
					&:first-child {
						color: #E86F50;
						margin-right: 10px
					};
					&:last-child {
						color: #11D183
					}
				}
			};
			.message-atile-area-right {
				width: 100px;
				::v-deep .show-box {
					border: none !important;
					color: #fff !important;
					height: 25px !important;
					background: #11D183 !important;
					height: 25px !important;
					.input {
						@include no-wrap;
						display: inline-block;
						line-height: 25px;
						height: 25px;
						padding-right: 4px;
						box-sizing: border-box;
						text-align: center !important;
					};
					.list {
						color: #101010;
					};
					.list-container {
						width: 150px !important;
						top: 0;
						.popper__arrow {
							display: none !important;
						}
					};
					.placeholder {
						color: #fff !important
					};
					.right-arrow {
						padding-right: 4px;
						box-sizing: border-box;
						color: #fff !important
					}
				}
			}
		};
		.message-content-area {
			flex: 1;
			overflow: auto;
			display: flex;
			flex-direction: column;
			padding: 0 16px 16px 16px;
			box-sizing: border-box; 
			.message-list {
				text-align: center;
				>text {
					display: inline-block;
					height: 25px;
					font-size: 12px;
					width: 125px;
					background: #BBBBBB;
					text-align: center;
					border-radius: 15px;
					color: #fff;
					line-height: 25px;
				};
				margin-top: 15px;
				.message-inner-list {
					margin-top: 15px;
					padding: 0 10px 10px 10px;
					box-sizing: border-box;
					box-shadow: 0px 2px 6px 0 rgba(92, 133, 136, 0.29);
					border-radius: 8px;
					.message-inner-list-top {
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 46px;
						@include bottom-border-1px(#BBBBBB);
						.inner-list-left {
							>image {
								width: 24px;
								height: 24px;
								margin-right: 10px;
								vertical-align: middle;
							};
							>text {
								color: #101010;
								font-size: 16px;
								vertical-align: middle
							}
						};
						.inner-list-right {
							flex: 1;
							padding-left: 6px;
							box-sizing: border-box;
							text-align: right;
							display: inline-block;
							@include no-wrap;
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
								};
								&:last-child {
									margin-right: 0 !important
								}
							}
						}
					};
					.message-inner-list-bottom {
						color: #888888;
						font-size: 14px;
						margin-top: 10px;
						text-align: justify
					}
				}
			}
		}
	}
</style>

