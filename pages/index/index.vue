<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="top-area">
			<view>
				<text>健康</text>
			</view>
			<view class="dropdown-area">
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
		<view class="center-area">
			<view class="bind-sleep-device-area">
				<view>
					<text>睡眠</text>
				</view>
				<view>
					<view>
						<text>暂无睡眠数据</text>
					</view>
					<view>
						<text>立即</text>
						<text @click="bindDeviceEvent">绑定设备</text>
						<text>获取检测数据</text>
					</view>
				</view>
			</view>
			<view class="bind-sleep-device-area bind-toileting-device-area">
				<view>
					<text>入厕</text>
				</view>
				<view>
					<view>
						<text>暂无入厕数据</text>
					</view>
					<view>
						<text>立即</text>
						<text @click="bindDeviceEvent">绑定设备</text>
						<text>获取检测数据</text>
					</view>
				</view>
			</view>
			<view class="bind-sleep-device-area tumble-toileting-device-area">
				<view>
					<text>跌倒</text>
				</view>
				<view>
					<view>
						<text>暂无跌倒数据</text>
					</view>
					<view>
						<text>立即</text>
						<text @click="bindDeviceEvent">绑定设备</text>
						<text>获取检测数据</text>
					</view>
				</view>
			</view>
			<view class="bind-sleep-device-area leave-home-device-area">
				<view>
					<text>离家和回家</text>
				</view>
				<view>
					<view>
						<text>暂无离/回家数据</text>
					</view>
					<view>
						<text>立即</text>
						<text @click="bindDeviceEvent">绑定设备</text>
						<text>获取检测数据</text>
					</view>
				</view>
			</view>
		</view>
		<view class="center-area-data" v-show="false">
			<view class="banner-area-box">
				<view class="banner-area"></view>
			</view>
			<view class="sleep-area-data">
				<view class="sleep-data-title">
					<text>睡眠</text>
					<text>7月8日</text>
					<text class="room-name">主卧</text>
					<text>睡眠8小时、睡眠状态良好</text>
				</view>
				<view class="heart-rate-box">
					<view class="heart-rate-title">
						<view class="heart-rate-title-left">
							<image :src="heartRateIconPng"></image>
							<text>心率 70次/分</text>
							<text>心率正常</text>
						</view>
						<view class="heart-rate-title-right" @click="enterDetailsEvent('心率')">
							详情
						</view>
					</view>
					<view class="heart-rate-chart">
						
					</view>
				</view>
				<view class="heart-rate-box breathe-box">
					<view class="heart-rate-title">
						<view class="heart-rate-title-left">
							<image :src="breatheIconPng"></image>
							<text>呼吸 16次/分</text>
							<text>呼吸正常</text>
						</view>
						<view class="heart-rate-title-right" @click="enterDetailsEvent('呼吸')">
							详情
						</view>
					</view>
					<view class="heart-rate-chart">
						
					</view>
				</view>
			</view>
			<view class="sleep-area-data toilet-area-data">
				<view class="sleep-data-title">
					<text>入厕</text>
					<text>7月8日</text>
					<text class="room-name">卫生间</text>
					<text>入厕两次</text>
				</view>
				<view class="heart-rate-box">
					<view class="heart-rate-title">
						<view class="heart-rate-title-left">
							<image :src="toiletIconPng"></image>
							<text>平均入厕时间 15分钟</text>
							<text>入厕时间正常</text>
						</view>
						<view class="heart-rate-title-right" @click="enterDetailsEvent('入厕')">
							详情
						</view>
					</view>
					<view class="heart-rate-chart">
						
					</view>
				</view>
			</view>
			<view class="sleep-area-data tumble-area-data">
				<view class="sleep-data-title">
					<text>跌倒</text>
					<text>7月8日</text>
					<text class="room-name">主卧、客厅</text>
					<text>跌倒一次</text>
				</view>
				<view class="heart-rate-box">
					<view class="heart-rate-title">
						<view class="heart-rate-title-left">
							<image :src="tumbleIconPng"></image>
							<text>跌倒1次</text>
							<text>已自行站起</text>
						</view>
						<view class="heart-rate-title-right" @click="enterDetailsEvent('跌倒')">
							详情
						</view>
					</view>
					<view class="heart-rate-chart">
						
					</view>
				</view>
			</view>
			<view class="sleep-area-data leave-home-area-data">
				<view class="sleep-data-title">
					<text>离家和回家</text>
					<text>7月8日</text>
					<text class="room-name">主卧、客厅</text>
				</view>
				<view class="heart-rate-box">
					<view class="heart-rate-title">
						<view class="heart-rate-title-left">
							<image :src="leaveHomeIconPng"></image>
							<text>最近离家时间</text>
							<text>22：37</text>
						</view>
						<view class="heart-rate-title-right" @click="enterDetailsEvent('离家和回家')">
							详情
						</view>
					</view>
					<view class="heart-rate-chart">
						
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-area">
			<text @click="editDataCardEvent">编辑数据卡片</text>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import xflSelect from '@/components/xfl-select/xfl-select.vue';
	import { getUserFamilyList } from '@/api/user.js'
	export default {
		components: {
			xflSelect
		},
		data() {
			return {
				infoText: '',
				initValue: '',
				showLoadingHint: false,
				heartRateIconPng: require("@/static/img/heart-rate-icon.png"),
				breatheIconPng: require("@/static/img/breathe-icon.png"),
				toiletIconPng: require("@/static/img/toilet-icon.png"),
				tumbleIconPng: require("@/static/img/tumble-icon.png"),
				leaveHomeIconPng: require("@/static/img/leave-home-icon.png"),
				familyMemberList: []
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
			this.queryUserFamilyList()
		},
		methods: {
			...mapMutations([
				'changeOverDueWay',
				'changeFamilyId'
			]),
			
			// 家庭选择下拉框下拉选择确定事件
			familyMemberChange (val) {
				console.log(val)
				if (val.orignItem.isClickNoEffect) {
					console.log('家庭管理');
				}
			},
			
			// 获取用户家庭列表
			queryUserFamilyList (familyId) {
				this.familyMemberList = [];
				getUserFamilyList({familyId}).then((res) => {
					if ( res && res.data.code == 0) {
						for (let item of res.data.data) {
							this.familyMemberList.push({
								id: item.id,
								value: item.name
							})
						};
						this.initValue = this.familyMemberList[0]['id'];
						this.changeFamilyId(this.initValue)
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
			
			// 绑定设备事件
			bindDeviceEvent () {
				this.editDataCardEvent()
				// uni.redirectTo({
				// 	url: '/devicePackage/pages/bingDevices/bingDevices'
				// })
			},
			
			// 进入数据详情事件
			enterDetailsEvent (text) {
				if (text == '心率') {
					uni.redirectTo({
						url: '/healthMonitoringPackage/pages/heartRate/heartRate'
					})
				} else if (text == '呼吸') {
					uni.redirectTo({
						url: '/healthMonitoringPackage/pages/breathe/breathe'
					})
				} else if (text == '入厕') {
					uni.redirectTo({
						url: '/healthMonitoringPackage/pages/toilet/toilet'
					})
				} else if (text == '跌倒') {
					uni.redirectTo({
						url: '/healthMonitoringPackage/pages/tumble/tumble'
					})
				} else if (text == '离家和回家') {
					uni.redirectTo({
						url: '/healthMonitoringPackage/pages/leaveHome/leaveHome'
					})
				}
			},
			
			// 编辑数据卡片事件
			editDataCardEvent () {
				uni.redirectTo({
					url: '/healthMonitoringPackage/pages/healthMonitoring/index/index'
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
		.top-area {
			height: 50px;
			display: flex;
			align-items: center;
			padding: 10px;
			box-sizing: border-box;
			width: 100%;
			background: #fff;
			margin-top: 44px;
			>view {
				&:nth-child(1) {
					font-size: 20px;
					color: #11D183
				};
				&:nth-child(2) {
					width: 140px;
					height: 40px;
					margin-top: 2px;
					::v-deep .show-box {
						border: none !important;
						font-size: 16px;
						height: 40px;
						color: #0E2442 !important;
						background: transparent !important;
						.input {
							@include no-wrap;
							display: inline-block;
							line-height: 40px;
							height: 40px;
							padding-right: 4px;
							box-sizing: border-box;
							text-align: center !important;
						};
						.list {
							color: #101010;
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
			}
		};
		.center-area {
			flex: 1;
			overflow: auto;
			background: #f5f5f5;
			.bind-sleep-device-area {
				margin-top: 2px;
				padding: 4px 10px;
				box-sizing: border-box;
				background: #fff;
				height: 275px;
				border-radius: 10px;
				display: flex;
				flex-direction: column;
				>view {
					&:nth-child(1) {
						font-size: 14px;
						color: #101010
					};
					&:nth-child(2) {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						>view {
							&:nth-child(1) {
								font-size: 14px;
								color: #101010;
								margin-bottom: 20px
							};
							&:nth-child(2) {
								font-size: 14px;
								display: flex;
								align-items: center;
								>text {
									color: #101010;
									&:nth-child(2) {
										display: inline-block;
										width: 89px;
										height: 26px;
										display: flex;
										align-items: center;
										justify-content: center;
										background: #11D183;
										border-radius: 4px;
										color: #fff !important;
										margin: 0 6px
									}
								}
							}
						}
					}
				}
			};
			.bind-toileting-device-area {
				height: 159px !important;
				margin-top: 4px;
			};
			.tumble-toileting-device-area {
				height: 132px !important;
				margin-top: 4px;
			};
			.leave-home-device-area {
				height: 159px !important;
				margin-top: 4px;
				margin-bottom: 4px;
			}
		};
		.center-area-data {
			flex: 1;
			overflow: auto;
			background: #f5f5f5;
			.banner-area-box {
				padding: 0 10px;
				box-sizing: border-box;
				background: #fff;
				.banner-area {
					width: 100%;
					height: 144px;
					background: #BBBBBB;
					border-radius: 7px;
				}
			};
			.sleep-area-data {
				height: 275px;
				background: #fff;
				border-radius: 10px;
				margin-top: 6px;
				padding: 4px 10px;
				box-sizing: border-box;
				.sleep-data-title {
					height: 32px;
					display: flex;
					align-items: center;
					>text {
						margin-right: 10px;
						margin-top: 2px;
						font-size: 12px;
						color: #BBBBBB;
						&:first-child {
							font-size: 14px;
							color: #101010;
							margin-top: 0 !important
						}
					};
					.room-name {
						position: relative;
					};
					.room-name::after {
						content: "";
						position: absolute;
						top: 1px;
						right: -6px;
						width: 1px;
						height: 14px;
						background: #BBBBBB
					}
				};
				.heart-rate-box {
					padding: 6px;
					box-sizing: border-box;
					border: 1px dashed #BBBBBB;
					border-radius: 10px;
					box-shadow: 0px 2px 6px 0 rgba(0, 0, 9, 0.1);
					height: 111px;
					margin-bottom: 8px;
					.heart-rate-title {
						display: flex;
						justify-content: space-between;
						.heart-rate-title-left {
							>image {
								width: 19px;
								height: 19px;
								vertical-align: middle;
								margin-right: 6px;
							};
							>text {
								font-size: 14px;
								color: #101010;
								vertical-align: middle;
								margin-right: 6px;
								&:last-child {
									font-size: 12px;
								}
							}
						};
						.heart-rate-title-right {
							font-size: 12px;
							color: #007AFF;
						}
					};
					.heart-rate-chart {}
				}
			};
			.toilet-area-data {
				height: 159px;
				margin-top: 8px
			};
			.tumble-area-data {
				height: 132px;
				margin-top: 8px;
				.heart-rate-box {
					height: 87px !important;
				}
			};
			.leave-home-area-data {
				height: 159px;
				margin-top: 8px;
				margin-bottom: 8px
			}
		};
		.bottom-area {
			margin: 0 auto;
			width: 353px;
			border-radius: 5px;
			height: 38px;
			text-align: center;
			line-height: 38px;
			border: 1px solid #11D183;
			color: #11D183;
			font-size: 14px;
		}
	}
</style>



