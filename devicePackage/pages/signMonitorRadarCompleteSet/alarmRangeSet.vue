<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<y-toast ref="ytoast"></y-toast>
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
						<u-switch v-model="heartRateAbnormalAlarmValue" active-color="#11D183" inactive-color="#9E9E9E"></u-switch>
					</view>
				</view>
				<view class="person-retention-alarm-time-box">
					<view class="person-retention-alarm-time-top">
						<view class="person-retention-alarm-time-left">
							<text>监测对象正常状况下的心率</text>
						</view>
						<view class="person-retention-alarm-time-right" @click="heartRateAbnormalAlarmTimeCustomEvent">
							<text>自定义</text>
						</view>
					</view>
					<view class="person-retention-alarm-time-bottom">
						<view class="retention-time-list-box">
							<view class="retention-time-list" v-for="(item,index) in heartRateTimeList" :key="index">
								<view class="retention-time-list-top" :class="{'retentionTimeStyle' : heartRateTimeIndex === index }" @click="heartRateTimeClickEvent(item,index)">
									<text>{{ item }}</text>
								</view>
								<view class="retention-time-list-bottom">
									<text v-if="index == 0">{{`${heartRateValueList[0]}次/分钟`}}</text>
									<text v-if="index == 1">{{`${heartRateValueList[1]}次/分钟`}}</text>
									<text v-if="index == 2">{{`${heartRateValueList[2]}次/分钟`}}</text>
								</view>
							</view>
						</view>	
						<view class="time-input" v-if="heartRateInputShow">
							<u-form ref="uForm">
								<u-form-item>
									<u-input v-model="heartRateMinValue" height="50" placeholder="请输入" type="number" />
								</u-form-item>
							</u-form>
							<text>-</text>
							<u-form ref="uForm">
								<u-form-item>
									<u-input v-model="heartRateMaxValue" height="50" placeholder="请输入" type="number" />
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
						<u-switch v-model="breatheAbnormalAlarmValue" active-color="#11D183" inactive-color="#9E9E9E"></u-switch>
					</view>
				</view>
				<view class="person-retention-alarm-time-box">
					<view class="person-retention-alarm-time-top">
						<view class="person-retention-alarm-time-left">
							<text>监测对象正常状况下的呼吸</text>
						</view>
						<view class="person-retention-alarm-time-right" @click="breatheAbnormalAlarmTimeCustomEvent">
							<text>自定义</text>
						</view>
					</view>
					<view class="person-retention-alarm-time-bottom">
						<view class="retention-time-list-box">
							<view class="retention-time-list" v-for="(item,index) in breatheTimeList" :key="index">
								<view class="retention-time-list-top" :class="{'retentionTimeStyle' : breatheTimeIndex === index }"  @click="breatheTimeClickEvent(item,index)">
									<text>{{ item }}</text>
								</view>
								<view class="retention-time-list-bottom">
									<text v-if="index == 0">{{`${breatheValueList[0]}次/分钟`}}</text>
									<text v-if="index == 1">{{`${breatheValueList[1]}次/分钟`}}</text>
									<text v-if="index == 2">{{`${breatheValueList[2]}次/分钟`}}</text>
								</view>
							</view>
						</view>	
						<view class="time-input" v-if="breatheInputShow">
							<u-form ref="uForm">
								<u-form-item>
									<u-input v-model="breatheMinValue" height="50" placeholder="请输入" type="number" />
								</u-form-item>
							</u-form>
							<text>-</text>
							<u-form ref="uForm">
								<u-form-item>
									<u-input v-model="breatheMaxValue" height="50" placeholder="请输入" type="number" />
								</u-form-item>
							</u-form>
							<text>次/分钟</text>
						</view>
					</view>
				</view>
				<!-- <view class="set-list">
					<view class="set-list-left">
						<text>体动检测报警</text>
					</view>
					<view class="set-list-right">
						<u-switch v-model="kinesiaDetectionAlarmValue" active-color="#11D183" inactive-color="#9E9E9E"></u-switch>
					</view>
				</view>
				<view class="set-list">
					<view class="set-list-left">
						<text>坐起检测报警</text>
					</view>
					<view class="set-list-right">
						<u-switch v-model="situpDetectionAlarmValue" active-color="#11D183" inactive-color="#9E9E9E"></u-switch>
					</view>
				</view> -->
				<view class="set-list">
					<view class="set-list-left">
						<text>离床检测报警</text>
					</view>
					<view class="set-list-right">
						<u-switch v-model="leaveBedDetectionAlarmValue" active-color="#11D183" inactive-color="#9E9E9E"></u-switch>
					</view>
				</view>
			</view>
			<view class="bottom-btn">
				<text @click="saveEvent">保存</text>
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
	import yToast from "@/components/y-toast/y-toast.vue"
	export default {
		components: {
			navBar,
			yToast
		},
		data() {
			return {
				infoText: '',
				showLoadingHint: false,
				heartRateAbnormalAlarmValue: false,
				heartRateMinValue: '',
				heartRateMaxValue: '',
				heartRateTimeList: ['较缓','正常','较急'],
				heartRateValueList: ['50-100','60-100','60-110'],
				heartRateTimeIndex : null,
				heartRateInputShow: false,
				heartRateRanage: '',
				breatheRanage: '',
				breatheAbnormalAlarmValue: false,
				breatheMinValue: '',
				breatheMaxValue: '',
				breatheTimeList: ['较缓','正常','较急'],
				breatheValueList: ['14-24','16-24','16-26'],
				breatheTimeIndex : null,
				breatheInputShow: false,
				kinesiaDetectionAlarmValue: false,
				situpDetectionAlarmValue: false,
				leaveBedDetectionAlarmValue: false
			}
		},
		
		onLoad(options) {
			if (options.transmitData == '{}') { return };
			this.receiveData = JSON.parse(options.transmitData);
			// 回显报警范围信息
			this.heartRateAbnormalAlarmValue = this.receiveData['heart'];
			this.breatheAbnormalAlarmValue = this.receiveData['breathe'];
			this.kinesiaDetectionAlarmValue = this.receiveData['move'];
			this.situpDetectionAlarmValue = this.receiveData['sitUp'];
			this.leaveBedDetectionAlarmValue = this.receiveData['outBed'];
			this.heartRateRanage = this.receiveData['heartRange'];
			this.breatheRanage =  this.receiveData['breatheRange'];
			// let heartRateRanageArr = this.receiveData['heartRange'].split('-');
			// this.heartRateMinValue = heartRateRanageArr.length > 0 ? Number(heartRateRanageArr[0]) : '';
			// this.heartRateMaxValue = heartRateRanageArr.length > 0 ? Number(heartRateRanageArr[1]) : '';
			// let breatheRanageArr = this.receiveData['breatheRange'].split('-');
			// this.breatheMinValue = breatheRanageArr.length > 0 ? Number(breatheRanageArr[0]) : '';
			// this.breatheMaxValue = breatheRanageArr.length > 0 ? Number(breatheRanageArr[1]) : '';
			this.echoRange()
		},
		computed: {
			...mapGetters([
				'userInfo',
				'beforeAddSignMonitorRadarCompleteSet'
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
				'changeBeforeAddSignMonitorRadarCompleteSet'
			]),
			
			// 回显保存的呼吸和心率范围
			echoRange () {
				if (this.heartRateAbnormalAlarmValue) {
					let heartIndex = this.heartRateValueList.indexOf(this.heartRateRanage);
					let heartRateRanageArr = this.heartRateRanage.split('-');
					if (heartIndex != -1) {
						this.heartRateTimeIndex = heartIndex;
						this.heartRateMinValue = heartRateRanageArr.length > 0 ? Number(heartRateRanageArr[0]) : '';
						this.heartRateMaxValue = heartRateRanageArr.length > 0 ? Number(heartRateRanageArr[1]) : ''
					} else {
						this.heartRateInputShow = true;
						this.heartRateMinValue = heartRateRanageArr.length > 0 ? Number(heartRateRanageArr[0]) : '';
						this.heartRateMaxValue = heartRateRanageArr.length > 0 ? Number(heartRateRanageArr[1]) : ''
					}
				};
				if (this.breatheAbnormalAlarmValue) {
					let breathIndex = this.breatheValueList.indexOf(this.breatheRanage);
					let breatheRanageArr = this.breatheRanage.split('-');
					if (breathIndex != -1) {
						this.breatheTimeIndex = breathIndex;
						this.breatheMinValue = breatheRanageArr.length > 0 ? Number(breatheRanageArr[0]) : '';;
						this.breatheMaxValue = breatheRanageArr.length > 0 ? Number(breatheRanageArr[1]) : '';
					} else {
						this.breatheInputShow = true;
						this.breatheMinValue = breatheRanageArr.length > 0 ? Number(breatheRanageArr[0]) : '';;
						this.breatheMaxValue = breatheRanageArr.length > 0 ? Number(breatheRanageArr[1]) : '';
					}
				}	
			},
			
			// 心率次数点击事件
			heartRateTimeClickEvent(item,index) {
				this.heartRateTimeIndex = index;
				let heartValue = this.heartRateValueList[index].split('-');
				this.heartRateMinValue = Number(heartValue[0]);
				this.heartRateMaxValue = Number(heartValue[1])
			},
			
			// 心率自定义点击事件
			heartRateAbnormalAlarmTimeCustomEvent () {
				this.heartRateInputShow = !this.heartRateInputShow;
				this.heartRateTimeIndex = '';
				this.heartRateMinValue = '';
				this.heartRateMaxValue = ''
			},
			
			// 呼吸次数点击事件
			breatheTimeClickEvent(item,index) {
				this.breatheTimeIndex = index;
				let breatheValue = this.breatheValueList[index].split('-');
				this.breatheMinValue = Number(breatheValue[0]);
				this.breatheMaxValue = Number(breatheValue[1])
			},
			
			// 呼吸自定义点击事件
			breatheAbnormalAlarmTimeCustomEvent () {
				this.breatheInputShow = !this.breatheInputShow;
				this.breatheTimeIndex = '';
				this.breatheMinValue = '';
				this.breatheMaxValue = ''
			},
			
			// 保存事件
			saveEvent () {
				if (this.heartRateAbnormalAlarmValue) {
					if (!this.heartRateMinValue) {
						this.$refs.uToast.show({
							title: '心率最小值不能为空,请重新输入!',
							type: 'error',
							position: 'bottom'
						});
						return
					};
					if (!this.heartRateMaxValue) {
						this.$refs.uToast.show({
							title: '心率最大值不能为空,请重新输入!',
							type: 'error',
							position: 'bottom'
						});
						return
					};
					if (Number(this.heartRateMaxValue) < Number(this.heartRateMinValue)) {
						this.$refs.uToast.show({
							title: '心率最大值不能小于最小值,请重新输入!',
							type: 'error',
							position: 'bottom'
						});
						return
					}
				};
				if (this.breatheAbnormalAlarmValue) {
					console.log('呼吸最小值',this.breatheMinValue);
					if (!this.breatheMinValue) {
						this.$refs.uToast.show({
							title: '呼吸最小值不能为空,请重新输入!',
							type: 'error',
							position: 'bottom'
						});
						return
					};
					if (!this.breatheMaxValue) {
						this.$refs.uToast.show({
							title: '呼吸最大值不能为空,请重新输入!',
							type: 'error',
							position: 'bottom'
						});
						return
					};
					if (Number(this.breatheMaxValue) < Number(this.breatheMinValue)) {
						this.$refs.uToast.show({
							title: '呼吸最大值不能小于最小值,请重新输入!',
							type: 'error',
							position: 'bottom'
						});
						return
					}
				};
				this.$refs['ytoast'].show({ message: '保存成功!', type: 'success' });
				// 保存进入设备设置界面的报警范围信息
				let temporaryMessage = this.beforeAddSignMonitorRadarCompleteSet;
				temporaryMessage['heart'] = this.heartRateAbnormalAlarmValue;
				temporaryMessage['breathe'] = this.breatheAbnormalAlarmValue;
				temporaryMessage['move'] = this.kinesiaDetectionAlarmValue;
				temporaryMessage['sitUp'] = this.situpDetectionAlarmValue;
				temporaryMessage['outBed'] = this.leaveBedDetectionAlarmValue;
				temporaryMessage['isSaveAlarmRanageInfo'] = true;
				temporaryMessage['heartRange'] = this.heartRateAbnormalAlarmValue ? `${this.heartRateMinValue}-${this.heartRateMaxValue}` : '';
				temporaryMessage['breatheRange'] = this.breatheAbnormalAlarmValue ? `${this.breatheMinValue}-${this.breatheMaxValue}` : '';
				this.changeBeforeAddSignMonitorRadarCompleteSet(temporaryMessage);
				uni.$emit('update', { transmitData: 1 });
				uni.$off('update');
				uni.navigateBack()
			},
			
			backTo () {
				let temporaryMessage = this.beforeAddSignMonitorRadarCompleteSet;
				temporaryMessage['isSaveAlarmRanageInfo'] = false;
				this.changeBeforeAddSignMonitorRadarCompleteSet(temporaryMessage);
				uni.$emit('update', { transmitData: 1 });
				uni.$off('update');
				uni.navigateBack()
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
									line-height: 0 !important;
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







