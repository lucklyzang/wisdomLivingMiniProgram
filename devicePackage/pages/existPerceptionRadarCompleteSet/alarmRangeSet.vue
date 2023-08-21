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
						<text>人员滞留报警</text>
					</view>
					<view class="set-list-right">
						<u-switch v-model="personRetentionAlarmValue" active-color="#5A7BF4" inactive-color="#9E9E9E"></u-switch>
					</view>
				</view>
				<view class="person-retention-alarm-time-box">
					<view class="person-retention-alarm-time-top">
						<view class="person-retention-alarm-time-left">
							<text>请先择滞留多长时间开始报警</text>
						</view>
						<view class="person-retention-alarm-time-right" @click="personRetentionAlarmTimeCustomEvent">
							<text>自定义</text>
						</view>
					</view>
					<view class="person-retention-alarm-time-bottom">
						<view class="retention-time-list-box">
							<view class="retention-time-list" :class="{'retentionTimeStyle': retentionTimeIndex === index }" v-for="(item,index) in retentionTimeList" :key="index" @click="retentionTimeClickEvent(item,index)">
								<text>{{ item }}</text>
							</view>
						</view>	
						<view class="time-input" v-if="retentionTimeInputShow">
							<u-form ref="uForm">
								<u-form-item>
									<u-input v-model="retentionTimeValue" height="50" placeholder="请输入" type="number" />
								</u-form-item>
							</u-form>
							<text>分钟</text>
						</view>
					</view>
				</view>
				<view class="set-list">
					<view class="set-list-left">
						<text>无人报警</text>
					</view>
					<view class="set-list-right">
						<u-switch v-model="noPersonAlarmValue" active-color="#5A7BF4" inactive-color="#9E9E9E"></u-switch>
					</view>
				</view>
				<view class="person-retention-alarm-time-box">
					<view class="person-retention-alarm-time-top">
						<view class="person-retention-alarm-time-left">
							<text>请先择无人多长时间开始报警</text>
						</view>
						<view class="person-retention-alarm-time-right" @click="noPersonAlarmTimeCustomEvent">
							<text>自定义</text>
						</view>
					</view>
					<view class="person-retention-alarm-time-bottom">
						<view class="retention-time-list-box">
							<view class="retention-time-list" :class="{'retentionTimeStyle': noPersonTimeIndex === index }" v-for="(item,index) in noPersonTimeList" :key="index" @click="noPersonTimeClickEvent(item,index)">
								<text>{{ item }}</text>
							</view>
						</view>	
						<view class="time-input" v-if="noPersonTimeInputShow">
							<u-form ref="uForm">
								<u-form-item>
									<u-input v-model="retentionTimeValue" height="50" placeholder="请输入" type="number" />
								</u-form-item>
							</u-form>
							<text>分钟</text>
						</view>
					</view>
				</view>
				<view class="set-list">
					<view class="set-list-left">
						<text>人员进入报警</text>
					</view>
					<view class="set-list-right">
						<u-switch v-model="personEnterAlarmValue" active-color="#5A7BF4" inactive-color="#9E9E9E"></u-switch>
					</view>
				</view>
				<view class="set-list">
					<view class="set-list-left">
						<text>人员离开报警</text>
					</view>
					<view class="set-list-right">
						<u-switch v-model="personLeaveAlarmValue" active-color="#5A7BF4" inactive-color="#9E9E9E"></u-switch>
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
				retentionTimeValue: '',
				retentionTimeList: ['1分钟','5分钟','10分钟','30分钟'],
				retentionTimeIndex : null,
				retentionTimeInputShow: false,
				noPersonAlarmValue: false,
				noPersonTimeList: ['1分钟','5分钟','10分钟','30分钟'],
				noPersonTimeIndex : null,
				noPersonTimeInputShow: false,
				personEnterAlarmValue: false,
				personLeaveAlarmValue: false
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
				this.nopersonTimeIndex = index;
				console.log(this.nopersonTimeIndex)
			},
			
			backTo () {
				uni.redirectTo({
					url: '/devicePackage/pages/existPerceptionRadarCompleteSet/completeSet'
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
								height: 31px;
								margin-right: 20px;
								text-align: center;
								line-height: 31px;
								background: #fff;
								color: #101010;
								border-radius: 3px;
								>text {
									font-size: 14px;
								};
								&:last-child {
									margin-right: 0 !important
								}
							};
							.retentionTimeStyle {
								background: #11D183 !important;
								color: #fff !important
							}
						};
						.time-input {
							display: flex;
							margin-top: 20px;
							flex: none !important;
							width: 46% !important;
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
								display: inline-block;
								margin-left: 16px;
								font-size: 14px;
								color: #101010
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






