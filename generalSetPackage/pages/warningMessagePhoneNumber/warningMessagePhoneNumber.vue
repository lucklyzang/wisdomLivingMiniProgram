<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="报警信息接受手机" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="family-name-area">
				<view class="dropdown-area">
					<xfl-select
						:list="familyMemberList"
						:clearable="false"
						:showItemNum="8"
						 @change="familyMemberChange"
						placeholder = "请选择家庭"
						:selectHideType="'hideAll'"
						:initValue="initValue"
					>
					</xfl-select>
				</view>
			</view>
			<view class="phone-number-list-area">
				<u-empty text="暂无数据" v-if="isShowNoHomeNoData"></u-empty>
				<view class="family-list" v-for="(item,index) in phoneList" :key="index">
					<view class="list-serial">
						<text>报警信息接收手机{{ index + 1 }}</text>
					</view>
					<view class="list-content">
						<view class="list-left">
							<text>{{ item }}</text>
						</view>
						<view class="list-right">
							<image :src="editGreenIconPng" @click="editEvent(item)"></image>
							<image :src="deleteRedSquareIconPng" @click="deleteEvent(item)"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="content-bottom-area">
				<view class="content-bottom" @click="addEvent">
					<u-icon name="plus" color="#11D183" size="50"></u-icon>
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
	import xflSelect from '@/components/xfl-select/xfl-select.vue'
	import { getUserFamilyList } from '@/api/user.js'
	import navBar from "@/components/zhouWei-navBar"
	import _ from 'lodash'
	export default {
		components: {
			navBar,
			xflSelect
		},
		data() {
			return {
				infoText: '',
				checked: false,
				isShowNoHomeNoData: false,
				showLoadingHint: false,
				initValue: null,
				initValueId: null,
				familyMemberList: [],
				fullFamilyMemberList: [],
				phoneList: [],
				editGreenIconPng: require("@/static/img/edit-green-icon.png"),
				deleteRedSquareIconPng: require("@/static/img/delete-red-square-icon.png"),
			}
		},
		onLoad() {
			this.initFamilyInfo()
		},
		computed: {
			...mapGetters([
				'userInfo',
				'familyId',
				'warningMessagePhoneNumber',
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
		methods: {
			...mapMutations([
				'changeOverDueWay',
				'changeWarningMessagePhoneNumber'
			]),
			
			// 家庭选择下拉框下拉选择确定事件
			familyMemberChange (val) {
				this.initValue = val.orignItem.value;
				this.initValueId = val.orignItem.id;
				let temporaryFamilyMemberList = this.fullFamilyMemberList.filter((item) => { return item.id ==  this.initValueId });
				this.phoneList = temporaryFamilyMemberList[0]['phones'];
				if (this.phoneList.length > 0) {
					this.isShowNoHomeNoData = false
				} else {
					this.isShowNoHomeNoData = true
				}
			},
			
			// 初始家庭信息
			initFamilyInfo () {
				this.familyMemberList = [];
				this.fullFamilyMemberLis = [];
				this.familyMemberList = _.cloneDeep(this.familyMessage.familyMemberList);
				this.fullFamilyMemberList = _.cloneDeep(this.familyMessage.fullFamilyMemberList);
				if (this.warningMessagePhoneNumber.familyId) {
					this.initValueId = this.warningMessagePhoneNumber.familyId;
					this.initValue = this.familyMemberList.filter((el) => { return el.id == this.warningMessagePhoneNumber.familyId })[0]['value'];
					let temporaryIndex = this.fullFamilyMemberList.findIndex((el) => { return el.id == this.warningMessagePhoneNumber.familyId });
					this.phoneList = this.fullFamilyMemberList[temporaryIndex]['phones']
				} else {
					if (this.familyId) {
						this.initValueId = this.familyId;
						this.initValue = this.familyMemberList.filter((el) => { return el.id == this.familyId })[0]['value'];
						let temporaryIndex = this.fullFamilyMemberList.findIndex((el) => { return el.id == this.familyId });
						this.phoneList = this.fullFamilyMemberList[temporaryIndex]['phones']
					} else {
						this.initValueId = this.familyMemberList[0]['id'];
						this.initValue = this.familyMemberList[0]['value'];
						this.phoneList = this.fullFamilyMemberList[0]['phones']
					}
				}
			},
			
			// 编辑事件
			editEvent (item) {
				let temporaryNumberMessage = this.warningMessagePhoneNumber;
				temporaryNumberMessage['type'] = '编辑';
				temporaryNumberMessage['familyId'] = this.initValueId;
				temporaryNumberMessage['mobile'] = item;
				this.changeWarningMessagePhoneNumber(temporaryNumberMessage);
				uni.redirectTo({
					url: '/generalSetPackage/pages/warningMessagePhoneNumber/warningMessagePhoneNumberOperationSure'
				})
			},
			
			// 删除事件
			deleteEvent (item) {
				let temporaryNumberMessage = this.warningMessagePhoneNumber;
				temporaryNumberMessage['type'] = '删除';
				temporaryNumberMessage['familyId'] = this.initValueId;
				temporaryNumberMessage['mobile'] = item;
				this.changeWarningMessagePhoneNumber(temporaryNumberMessage);
				uni.redirectTo({
					url: '/generalSetPackage/pages/warningMessagePhoneNumber/warningMessagePhoneNumberOperationSure'
				})
			},
			
			// 添加事件
			addEvent () {
				let temporaryNumberMessage = this.warningMessagePhoneNumber;
				temporaryNumberMessage['familyId'] = this.initValueId;
				temporaryNumberMessage['type'] = '添加';
				this.changeWarningMessagePhoneNumber(temporaryNumberMessage);
				uni.redirectTo({
					url: '/generalSetPackage/pages/warningMessagePhoneNumber/warningMessagePhoneNumberAdd'
				})
			},
			
			backTo () {
				this.changeWarningMessagePhoneNumber({});
				uni.redirectTo({
					url: '/generalSetPackage/pages/generalSetting/generalSetting'
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
			.family-name-area {
				margin-bottom: 10px;
				.dropdown-area {
					width: 100px;
					::v-deep .show-box {
						border: none !important;
						font-size: 16px;
						padding: 0 !important;
						height: 40px;
						color: #0E2442 !important;
						background: transparent !important;
						.input {
							@include no-wrap;
							display: inline-block;
							line-height: 40px;
							padding-right: 4px;
							box-sizing: border-box
						};
						.list {
							color: #101010;
							.item.active {
								color: #11D183 !important
							}
						};
						.list-container {
							width: 150px !important;
							top: -10px;
							.popper__arrow {
								display: none !important;
							}
						};
						.placeholder {
							color: #0E2442 !important
						};
						.right-arrow {
							color: #0E2442 !important
						}
					}
				}
			};
			.phone-number-list-area {
				width: 100%;
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				overflow: auto;
				position: relative;
				::v-deep .u-empty {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%)
				};
				.family-list {
					width: 100%;
					margin-bottom: 10px;
					.list-serial {
						font-size: 14px;
						color: #101010;
						margin-bottom: 10px
					};
					.list-content {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 0 10px;
						box-sizing: border-box;
						height: 53px;
						background: #fff;
						border-radius: 10px;
						box-shadow: 0px 2px 6px 0px rgba(92,133,136,.26);
						.list-left {
							font-size: 14px;
							color: #101010;
							vertical-align: middle;
						};
						.list-right {
							>image {
								width: 24px;
								height: 24px;
								vertical-align: middle;
								&:first-child {
									margin-right: 16px
								}
							}
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
					width: 100%;
					height: 53px;
					border: 1px solid #11D183;
					border-radius: 29px;
					display: flex;
					align-items: center;
					justify-content: center
				}
			}
		}
	}
</style>






