<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="报警范围设置" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="set-list-area">
				<view class="set-list">
					<view class="set-list-left">
						<text>心率异常报警</text>
					</view>
					<view class="set-list-right">
						<u-switch v-model="personRetentionAlarmValue" active-color="#5A7BF4" inactive-color="#9E9E9E"></u-switch>
					</view>
				</view>
				<view class="person-retention-alarm-time-box">
					<view class="person-retention-alarm-time-top">
						<view class="person-retention-alarm-time-left">
							<text>监测对象正常状况下的心率</text>
						</view>
						<view class="person-retention-alarm-time-right" @click="personRetentionAlarmTimeCustomEvent">
							<text>自定义</text>
						</view>
					</view>
					<view class="person-retention-alarm-time-bottom">
						<view class="retention-time-list-box">
							<view class="retention-time-list" v-for="(item,index) in retentionTimeList" :key="index">
								<view class="retention-time-list-top" :class="{'retentionTimeStyle' : retentionTimeIndex == index }" @click="retentionTimeClickEvent(item,index)">
									<text>{{ item }}</text>
								</view>
								<view class="retention-time-list-bottom">
									<text v-if="index == 0">50-100次/分</text>
									<text v-if="index == 1">60-100次/分</text>
									<text v-if="index == 2">60-110次/分</text>
								</view>
							</view>
						</view>	
						<view class="time-input" v-if="retentionTimeInputShow">
							<u-form ref="uForm">
								<u-form-item>
									<u-input v-model="retentionTimeMinValue" height="50" placeholder="请输入" type="number" />
								</u-form-item>
							</u-form>
							<text>-</text>
							<u-form ref="uForm">
								<u-form-item>
									<u-input v-model="retentionTimeMaxValue" height="50" placeholder="请输入" type="number" />
								</u-form-item>
							</u-form>
							<text>次/分钟</text>
						</view>
					</view>
				</view>
				<view class="set-list">
					<view class="set-list-left">
						<text>呼吸异常报警</text>
					</view>
					<view class="set-list-right">
						<u-switch v-model="noPersonAlarmValue" active-color="#5A7BF4" inactive-color="#9E9E9E"></u-switch>
					</view>
				</view>
				<view class="person-retention-alarm-time-box">
					<view class="person-retention-alarm-time-top">
						<view class="person-retention-alarm-time-left">
							<text>监测对象正常状况下的呼吸</text>
						</view>
						<view class="person-retention-alarm-time-right" @click="noPersonAlarmTimeCustomEvent">
							<text>自定义</text>
						</view>
					</view>
					<view class="person-retention-alarm-time-bottom">
						<view class="retention-time-list-box">
							<view class="retention-time-list" v-for="(item,index) in noPersonTimeList" :key="index">
								<view class="retention-time-list-top" :class="{'retentionTimeStyle' : noPersonTimeIndex == index }"  @click="noPersonTimeClickEvent(item,index)">
									<text>{{ item }}</text>
								</view>
								<view class="retention-time-list-bottom">
									<text v-if="index == 0">14-24次/分</text>
									<text v-if="index == 1">16-24次/分</text>
									<text v-if="index == 2">16-26次/分</text>
								</view>
							</view>
						</view>	
						<view class="time-input" v-if="noPersonTimeInputShow">
							<u-form ref="uForm">
								<u-form-item>
									<u-input v-model="noPersonTimeMinValue" height="50" placeholder="请输入" type="number" />
								</u-form-item>
							</u-form>
							<text>-</text>
							<u-form ref="uForm">
								<u-form-item>
									<u-input v-model="noPersonTimeMaxValue" height="50" placeholder="请输入" type="number" />
								</u-form-item>
							</u-form>
							<text>分钟</text>
						</view>
					</view>
				</view>
				<view class="set-list">
					<view class="set-list-left">
						<text>体动检测报警</text>
					</view>
					<view class="set-list-right">
						<u-switch v-model="kinesiaDetectionAlarmValue" active-color="#5A7BF4" inactive-color="#9E9E9E"></u-switch>
					</view>
				</view>
				<view class="set-list">
					<view class="set-list-left">
						<text>坐起检测报警</text>
					</view>
					<view class="set-list-right">
						<u-switch v-model="situpDetectionAlarmValue" active-color="#5A7BF4" inactive-color="#9E9E9E"></u-switch>
					</view>
				</view>
				<view class="set-list">
					<view class="set-list-left">
						<text>离床检测报警</text>
					</view>
					<view class="set-list-right">
						<u-switch v-model="leaveBedDetectionAlarmValue" active-color="#5A7BF4" inactive-color="#9E9E9E"></u-switch>
					</view>
				</view>
			</view>
			<view class="bottom-btn">
				<text>保存</text>
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
				personRetentionAlarmValue: false,
				showLoadingHint: false,
				retentionTimeMinValue: '',
				retentionTimeMaxValue: '',
				noPersonTimeMinValue: '',
				noPersonTimeMaxValue: '',
				retentionTimeList: ['较缓','正常','较急'],
				retentionTimeIndex : null,
				retentionTimeInputShow: false,
				noPersonAlarmValue: false,
				noPersonTimeList: ['较缓','正常','较急'],
				noPersonTimeIndex : null,
				noPersonTimeInputShow: false,
				kinesiaDetectionAlarmValue: false,
				situpDetectionAlarmValue: false,
				leaveBedDetectionAlarmValue: false
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
			
			// 滞留时间自定义点击事件
			personRetentionAlarmTimeCustomEvent () {
				this.retentionTimeInputShow = !this.retentionTimeInputShow
			},
			
			// 滞留时间点击事件
			retentionTimeClickEvent(item,index) {
				this.retentionTimeIndex = index
			},
			
			// 无人时间自定义点击事件
			noPersonAlarmTimeCustomEvent () {
				this.noPersonTimeInputShow = !this.noPersonTimeInputShow
			},
			
			// 无人时间点击事件
			noPersonTimeClickEvent(item,index) {
				this.nopersonTimeIndex = index
			},
			
			backTo () {
				uni.redirectTo({
					url: '/devicePackage/pages/signMonitorRadarCompleteSet/completeSet'
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
			.set-list-area {
				flex: 1;
				overflow: auto;
				.set-list {
					padding: 0 6px 0 10px;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					border-radius: 8px;
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
				};
				.person-retention-alarm-time-box {
					padding: 0 12px 10px 12px;
					box-sizing: border-box;
					.person-retention-alarm-time-top {
						display: flex;
						justify-content: space-between;
						align-items: center;
						height: 40px;
						margin-bottom: 8px;
						.person-retention-alarm-time-left {
							>text {
								font-size: 14px;
								color: #BBBBBB;
							}
						};
						.person-retention-alarm-time-right {
							>text {
								font-size: 14px;
								color: #4B97F6;
							}
						}
					};
					.person-retention-alarm-time-bottom {
						.retention-time-list-box {
							display: flex;
							justify-content: space-between;
							align-items: center;
							.retention-time-list {
								flex: 1;
								margin-right: 20px;
								&:last-child {
									margin-right: 0 !important
								};
								.retention-time-list-top {
									text-align: center;
									background: #fff;
									border-radius: 3px;
									color: #101010;
									height: 31px;
									line-height: 31px;
									>text {
										font-size: 14px;
									}
								};
								.retentionTimeStyle {
									background: #3B9DF9 !important;
									color: #fff !important
								};
								.retention-time-list-bottom {
									height: 40px;
									display: flex;
									justify-content: center;
									align-items: center;
									>text {
										font-size: 12px;
										color: #888888
									};
								}
							}
						};
						.time-input {
							display: flex;
							margin-top: 10px;
							flex: none !important;
							width: 64% !important;
							align-items: center
							::v-deep .u-form {
								flex: 1;
								background: #fff;
								.u-form-item {
									border: 1px solid #888888;
									border-radius: 4px;
									padding: 2px 8px !important
								}
							};
							>text {
								&:nth-of-type(1) {
									width: 20px;
									text-align: center;
								};
								&:last-child {
									display: inline-block;
									margin-left: 16px;
									font-size: 14px;
									color: #101010;
								}
							}
						}
					}
				}
			};
			.bottom-btn {
				height: 80px;
				background: #f5f5f5;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				>text {
					font-size: 14px;
					display: inline-block;
					border-radius: 26px;
					width: 60%;
					height: 48px;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #11D183;
					color: #fff
				}
			}
		}
	}
</style>







