<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010"  title="个人信息" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="edit-top">
				<image :src="defaultPersonPhotoIconPng"></image>
				<text @click="changePhotoEvent">更换头像</text>
			</view>
			<view class="edit-bottom">
				<view class="input-area">
					<view class="nice-name-area">
						<text>昵称</text>
						<u-input v-model="niceNameValue" type="text" height="50" placeholder="请输入昵称" border-color="#BBBBBB" :border="true" placeholder-style="color:#101010" />
					</view>
					<view class="birthday-area">
						<text>出生年月</text>
						<view class="date-box">
							<view class="year-area" @click="yearAreaClickEvent">
								<text>{{ selectYear }}</text>
								<u-icon :name="isShowYearDropDown ? 'arrow-down' : 'arrow-up'" color="#BBBBBB" size="20"></u-icon>
								<view class="year-list-box" v-if="isShowYearDropDown">
									<view class="year-list" :class="{'yearListStyle': selectYear == item }" v-for="(item,index) in yearList" :key="index" @click="yearItemClickEvent(item,index)">
										<text>{{ item }}</text>
									</view>
								</view>
							</view>
							<view class="month-area" @click="monthAreaClickEvent">
								<text>{{ selectMonth }}</text>
								<u-icon :name="isShowMonthDropDown ? 'arrow-down' : 'arrow-up'" color="#BBBBBB" size="20"></u-icon>
								<view class="month-list-box" v-if="isShowMonthDropDown">
									<view class="month-list" :class="{'monthListStyle': selectMonth == item }" v-for="(item,index) in monthList" :key="index" @click="monthItemClickEvent(item,index)">
										<text>{{ item }}</text>
									</view>
								</view>
							</view>
							<view class="day-area" @click="dayAreaClickEvent">
								<text>{{ selectDay }}</text>
								<u-icon :name="isShowDayDropDown ? 'arrow-down' : 'arrow-up'" color="#BBBBBB" size="20"></u-icon>
								<view class="day-list-box" v-if="isShowDayDropDown">
									<view class="day-list" :class="{'dayListStyle': selectDay == item }" v-for="(item,index) in dayList" :key="index" @click="dayItemClickEvent(item,index)">
										<text>{{ item }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="gender-area">
						<text>性别</text>
						<u-radio-group v-model="gendervalue" @change="radioGroupChange">
							<u-radio
							 active-color="#11D183"
								v-for="(item, index) in genderList" :key="index" 
								:name="item.name"
							>
								{{item.name}}
							</u-radio>
					  </u-radio-group>
					</view>
				</view>
				<view class="btn-area">
					<text @click="completeEvent">完成</text>
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
	export default {
		components: {
			navBar
		},
		data() {
			return {
				infoText: '',
				showLoadingHint: false,
				niceNameValue: '',
				isShowYearDropDown: false,
				isShowMonthDropDown: false,
				isShowDayDropDown: false,
				yearList: [],
				monthList: [1,2,3,4,5,6,7,8,9,10,11,12],
				dayList: [],
				selectYear: 1970,
				selectMonth: 1,
				selectDay: 1,
				gendervalue: '男',
				genderList: [
					{
						name: '男'
					},
					{
						name: '女'
					},
					{
						name: '其他'
					}
				],
				defaultPersonPhotoIconPng: require("@/static/img/default-person-photo.png")
			}
		},
		onReady() {
			this.generateYears(this.selectYear,new Date().getFullYear());
			this.generateDays(new Date(this.selectYear, this.selectMonth, 0).getDate());
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
			
			radioGroupChange(e) {
				// console.log(e);
			},
			
			// 生成年份
			generateYears (startYear,endYear) {
				this.yearList = [];
				for (let i = startYear; i <= endYear; i++) {
					this.yearList.push(i)
				}
			},
			
			// 生成天数
			generateDays (endDay) {
				this.dayList = [];
				for (let i = 1; i <= endDay; i++) {
					this.dayList.push(i)
				}
			},
			
			// 年区域点击事件
			yearAreaClickEvent () {
				this.isShowYearDropDown = !this.isShowYearDropDown
			},
			
			// 年份点击事件
			yearItemClickEvent (item,index) {
				this.selectYear = item;
				this.selectDay = 1;
				if (item == new Date().getFullYear()) {
					this.monthList = this.monthList.slice(0,this.monthList.indexOf(new Date().getMonth()) + 2);
					this.selectMonth = 1
				} else {
					this.monthList = [1,2,3,4,5,6,7,8,9,10,11,12]
				};
				this.generateDays(new Date(this.selectYear, this.selectMonth, 0).getDate())
			},
			
			// 月区域点击事件
			monthAreaClickEvent () {
				this.isShowMonthDropDown = !this.isShowMonthDropDown
			},
			
			// 月份点击事件
			monthItemClickEvent (item,index) {
				this.selectMonth = item;
				this.selectDay = 1;
				this.generateDays(new Date(this.selectYear, this.selectMonth, 0).getDate());
				if (this.selectYear == new Date().getFullYear() && this.selectMonth == new Date().getMonth() + 1) {
					this.dayList = this.dayList.slice(0,this.dayList.indexOf(new Date().getDate()) + 1)
				}
			},
			
			
			// 日区域点击事件
			dayAreaClickEvent () {
				this.isShowDayDropDown = !this.isShowDayDropDown
			},
			
			// 天点击事件
			dayItemClickEvent (item,index) {
				this.selectDay = item
			},
					
			// 完成事件
			completeEvent () {
				uni.switchTab({
					url: '/pages/personInfo/personInfo'
				})
			},
			
			// 更改头像事件
			changePhotoEvent () {
				
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
			display: flex;
			flex-direction: column;
			.edit-top {
				height: 30vh;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				>image {
					width: 89px;
					height: 89px;
				};
				>text {
					width: 91px;
					height: 32px;
					display: flex;
					justify-content: center;
					align-items: center;
					border: 1px solid #11D183;
					font-size: 14px;
					margin-top: 6px;
					color: #11D183
				}
			};
			.edit-bottom {
				width: 100%;
				flex: 1;
				background: #F5F5F5;
				padding: 10px;
				box-sizing: border-box;
				width: 100%;
				height: 200px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.input-area {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					>view {
						width: 100%;
						height: 41px;
						background: #fff;
						padding: 0 4px;
						margin-bottom: 10px;
						display: flex;
						padding-left: 10px;
						box-sizing: border-box;
						justify-content: space-between;
						align-items: center;
						>text {
							width: 120px;
							display: inline-block;
							font-size: 14px;
							color: #A7A7A3
						}
					};
					.nice-name-area {
						::v-deep {
							u-input {
								flex: 1;
								padding-left: 6px !important;
								box-sizing: border-box;
								.u-input__input {
								}
							}
						}
					};
					.birthday-area {
						.date-box {
							flex: 1;
							display: flex;
							align-items: center;
							justify-content: space-between;
							>view {
								flex: 1;
								position: relative;
								margin-right: 6px;
								height: 30px;
								display: flex;
								justify-content: space-between;
								align-items: center;
								border: 1px solid #BBBBBB;
								border-radius: 6px;
								padding: 4px;
								box-sizing: border-box;
								>text {
									font-size: 12px;
									color: #101010
								};
								&:last-child {
									margin-right: 0 !important
								}
							};
							.year-area {
								.year-list-box {
									position: absolute;
									width: 70px;
									top: 36px;
									left: 0;
									border-radius: 4px;
									background: #fff;
									height: 250px;
									padding: 4px;
									overflow: auto;
									box-sizing: border-box;
									.year-list {
										padding: 4px;
										text-align: center;
										box-sizing: border-box;
									};
									.yearListStyle {
										color: #11D183
									}
								}
							};
							.month-area {
								.month-list-box {
									position: absolute;
									width: 70px;
									top: 36px;
									left: 0;
									border-radius: 4px;
									background: #fff;
									height: 250px;
									overflow: auto;
									padding: 4px;
									box-sizing: border-box;
									.month-list {
										padding: 4px;
										text-align: center;
										box-sizing: border-box;
									};
									.monthListStyle {
										color: #11D183
									}
								}
							};
							.day-area {
								.day-list-box {
									position: absolute;
									width: 70px;
									top: 36px;
									left: 0;
									border-radius: 4px;
									background: #fff;
									height: 250px;
									overflow: auto;
									padding: 4px;
									box-sizing: border-box;
									.day-list {
										padding: 4px;
										text-align: center;
										box-sizing: border-box;
									};
									.dayListStyle {
										color: #11D183
									}
								}
							}
						}
					};
					.gender-area {
						::v-deep {
							u-radio-group {
								flex: 1;
								.u-radio {
									width: 30% !important
								}
							}
						}
					}
				};
				.btn-area {
					height: 120px;
					display: flex;
					align-items: center;
					justify-content: center;
					>text {
						width: 90%;
						display: inline-block;
						height: 42px;
						text-align: center;
						line-height: 37px;
						border-radius: 4px;
						background: #11D183;
						font-size: 12px;
						color: #fff
					}
				}
			}
		}
	}
</style>





