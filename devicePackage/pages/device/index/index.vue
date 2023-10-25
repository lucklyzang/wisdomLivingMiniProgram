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
				<text>{{ `${noReadNum}条未读` }}</text>
				<text>{{ noReadNum == 0 ? '全部已读' : `${readedNum}条已读` }}</text>
			</view>
			<view class="message-atile-area-right">
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
		<view class="message-content-area">
			<u-empty text="暂无数据" v-if="isShowNoHomeNoData"></u-empty>
			<scroll-view class="scroll-view" scroll-y="true"  @scrolltolower="scrolltolower">
				<view class="message-list" v-for="(item,index) in fullNoticeList" :key="index">
					<text>
						{{ item.time }}
					</text>
					<view class="message-inner-list" v-for="(innerItem,innerIndex) in item.respVOS" :key="innerIndex" @click="enterMessageDetailsPageEvent(item,innerItem)">
						<view class="is-read-sign" v-if="innerItem.status == 0"></view>
						<view class="message-inner-list-top">
							<view class="inner-list-left">
								<image :src="innerItem.category == 0 ? deviceInformIconPng : systemInformIconPng"></image>
								<text>{{ innerItem.category == 0 ? '设备通知' : '系统通知' }}</text>
							</view>
							<view class="inner-list-right">
								<text>{{ innerItem.familyName }}</text>
								<text v-if="innerItem.category == 0">{{ deviceTypeTransitionText(innerItem.type) }}</text>
								<text v-if="innerItem.category == 0">{{ innerItem.roomName }}</text>
							</view>
						</view>
						<view class="message-inner-list-bottom" v-if="innerItem.category == 1">
							<u-parse :html="innerItem.content"></u-parse>
						</view>
						<view class="message-inner-list-bottom" v-else>
							<text>{{ innerItem.content }}</text>
						</view>
					</view>
				</view>
				<u-loadmore :status="status" v-show="fullNoticeList.length > 0"/>
			</scroll-view>
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
	import xflSelect from '@/components/xfl-select/xfl-select.vue'
	import { getDeviceInforPage, updateDeviceInformRead } from '@/api/device.js'
	import _ from 'lodash'
	export default {
		components: {
			navBar,
			xflSelect
		},
		data() {
			return {
				infoText: '加载中',
				currentPage: 1,
				pageSize: 15,
				totalCount: 0,
				noReadNum: 0,
				readedNum: 0,
				status: 'nomore',
				initValue: null,
				initValueId: null,
				noticeList: [],
				fullNoticeList: [],
				showLoadingHint: false,
				isShowNoHomeNoData: false,
				deviceInformIconPng: require("@/static/img/device-inform-icon.png"),
				systemInformIconPng: require("@/static/img/system-inform-icon.png"),
				familyMemberList: []
			}
		},
		onLoad() {
			this.initFamilyInfo();
			this.queryDeviceNoticeList({
				pageNo: this.currentPage,
				pageSize: this.pageSize,
				familyId: this.initValueId == 'null' ? '' : this.initValueId
			},true)
		},
		computed: {
			...mapGetters([
				'userInfo',
				'deviceNoticeDetails',
				'familyMessage',
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
		
		methods: {
			...mapMutations([
				'changeOverDueWay',
				'changeDeviceNoticeDetails'
			]),
			
			scrolltolower () {
				let totalPage = Math.ceil(this.totalCount/this.pageSize);
				if (this.currentPage >= totalPage) {
					this.status = 'nomore'
				} else {
					this.status = 'loadmore';
					this.currentPage = this.currentPage + 1;
					this.queryDeviceNoticeList({
						pageNo: this.currentPage,
						pageSize: this.pageSize,
						familyId: this.initValueId == 'null' ? '' : this.initValueId
					},false)
				}
			},
			
			backTo () {
				this.changeDeviceNoticeDetails({});
				uni.switchTab({
					url: '/pages/device/device'
				})
			},
			
			// 设备名称转换
			deviceTypeTransitionText (num) {
				let temporaryNum = num.toString();
				switch(temporaryNum) {
					case '1' :
						return '体征检测雷达'
						break;
					case '2' :
						return '存在感知雷达'
						break;
					case '3' :
						return '跌倒雷达'
						break;
					case '4' :
						return '人体检测雷达'
						break
				}
			},
			
			// 家庭选择下拉框下拉选择确定事件
			familyMemberChange (val) {
				this.initValue = val.orignItem.value;
				this.initValueId = val.orignItem.id;
				this.currentPage = 1;
				this.fullNoticeList = [];
				this.queryDeviceNoticeList({
					pageNo: this.currentPage,
					pageSize: this.pageSize,
					familyId: this.initValueId == 'null' ? '' : this.initValueId
				},true)
			},
			
			// 初始家庭信息
			initFamilyInfo () {
				this.familyMemberList = [];
				this.familyMemberList = _.cloneDeep(this.familyMessage.familyMemberList);
				this.familyMemberList.unshift({
					id: null,
					value: '所有家庭'
				});
				if (this.deviceNoticeDetails.familyId) {
					this.initValue = this.familyMessage.familyMemberList.filter((el) => { return el.id === this.deviceNoticeDetails.familyId })[0]['value'];
					this.initValueId = this.deviceNoticeDetails.familyId
				} else {
					this.initValue = this.familyMemberList[0]['value'];
					this.initValueId = this.familyMemberList[0]['id']
				}
			},
			
			// 获取设备通知列表
			queryDeviceNoticeList (data,flag) {
				if (flag) {
					this.showLoadingHint = true
				} else {
					this.showLoadingHint = false;
					this.infoText = '';
					this.status = 'loading';
				};
				this.noticeList = [];
				getDeviceInforPage(data).then((res) => {
					if ( res && res.data.code == 0) {
						this.totalCount = res.data.data.total;
						this.noticeList = res.data.data.list;
						this.fullNoticeList = this.fullNoticeList.concat(this.noticeList);
						if (this.fullNoticeList.length == 0) {
							this.isShowNoHomeNoData = true
						} else {
							this.noReadNum = 0;
							this.readedNum = 0;
							this.fullNoticeList.forEach((item) => {
								let noReadSum = 0;
								noReadSum = item.respVOS.filter((innerItem) => {
									return innerItem.status == 0
								}).length;
								this.noReadNum += noReadSum;
								let readSum = 0;
								readSum = item.respVOS.filter((innerItem) => {
									return innerItem.status == 1
								}).length;
								this.readedNum += readSum
							});
							this.isShowNoHomeNoData = false
						}
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error',
							position: 'bottom'
						})
					};
					if (flag) {
						this.showLoadingHint = false;
					} else {
						let totalPage = Math.ceil(this.totalCount/this.pageSize);
						if (this.currentPage >= totalPage) {
							this.status = 'nomore'
						} else {
							this.status = 'loadmore';
						}	
					}
				})
				.catch((err) => {
					if (flag) {
						this.showLoadingHint = false;
					} else {
						this.status = 'loadmore'
					};
					this.$refs.uToast.show({
						title: err.message,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			// 更新设备通知为已读
			updateDeviceInformReadEvent(id) {
				this.showLoadingHint = true
				this.infoText = '';
				updateDeviceInformRead(id).then((res) => {
					if ( res && res.data.code == 0) {
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
			
			// 进入消息详情事件
			enterMessageDetailsPageEvent (item,innerItem) {
				let temporaryDeviceNoticeDetails = this.deviceNoticeDetails;
				temporaryDeviceNoticeDetails['familyId'] = this.initValueId;
				temporaryDeviceNoticeDetails['time'] = item.time;
				temporaryDeviceNoticeDetails['content'] = innerItem;
				this.changeDeviceNoticeDetails(temporaryDeviceNoticeDetails);
				this.updateDeviceInformReadEvent(innerItem.id);
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
		height: 100%
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
						.item.active {
							color: #11D183 !important
						}
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
			padding: 16px 16px 16px 16px;
			box-sizing: border-box;
			position: relative;
			 ::v-deep .u-empty {
			 	position: absolute;
			 	top: 50%;
			 	left: 50%;
			 	transform: translate(-50%,-50%)
			 };
			 .scroll-view {
					height: 100%
			 };
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
				margin-bottom: 15px;
				.message-inner-list {
					margin-top: 15px;
					padding: 0 10px 10px 10px;
					box-sizing: border-box;
					box-shadow: 0px 2px 6px 0 rgba(92, 133, 136, 0.29);
					border-radius: 8px;
					position: relative;
					.is-read-sign {
						position: absolute;
						width: 8px;
						height: 8px;
						border-radius: 50%;
						background: red;
						top: 4px;
						right: 10px
					};
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

