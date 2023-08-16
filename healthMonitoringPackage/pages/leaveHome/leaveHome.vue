<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="离家和回家" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="content-top-area">
				<view class="content-top-title">
					<u-subsection :list="itemList" :current="currentItem" @change="change"></u-subsection>
				</view>
				<view class="content-top-content">
					<view class="day-data-area" v-if="currentItem == 0">
						<view class="data-top">
							<view>
								<u-icon name="arrow-left" size="40" color="#101010"></u-icon>
								<text>7月11日 周二</text>
								<u-icon name="arrow-right" size="40" color="#101010"></u-icon>
							</view>
							<view>
								<text>15:29</text>
							</view>
							<view>
								<text>89次/分钟</text>
							</view>
						</view>
						<view class="data-bottom">
							
						</view>
					</view>
					<view class="day-data-area" v-if="currentItem == 1">
						<view class="data-top">
							<view>
								<u-icon name="arrow-left" size="40" color="#101010"></u-icon>
								<text>7月3日 - 7月9日</text>
								<u-icon name="arrow-right" size="40" color="#101010"></u-icon>
							</view>
							<view>
								<text>7月3日</text>
							</view>
							<view>
								<text>49-109次/分钟</text>
							</view>
						</view>
						<view class="data-bottom"></view>
					</view>
					<view class="day-data-area" v-if="currentItem == 2">
						<view class="data-top">
							<view>
								<u-icon name="arrow-left" size="40" color="#101010"></u-icon>
								<text>7月</text>
								<u-icon name="arrow-right" size="40" color="#101010"></u-icon>
							</view>
							<view>
								<text>7月10日</text>
							</view>
							<view>
								<text>49-109次/分钟</text>
							</view>
						</view>
						<view class="data-bottom"></view>
					</view>
				</view>
			</view>
			<view class="content-bottom-area">
				<view class="data-overview-list">
					<view class="overview-list-left">
						<image :src="leaveHomeListIconPng"></image>
						<text>2023-07-10 07:58</text>
					</view>
					<view class="overview-list-right">
						<text>离家</text>
					</view>
				</view>
				<view class="data-overview-list">
					<view class="overview-list-left">
						<image :src="goHomeIconPng"></image>
						<text>2023-07-10 07:58</text>
					</view>
					<view class="overview-list-right">
						<text>回家</text>
					</view>
				</view>
				<view class="health-tips">
					<view class="health-tips-top">
						<image :src="daytimeNapIconPng"></image>
						<text>温馨提示</text>
					</view>
					<view class="health-tips-bottom" @click="healthTipsDetailsEvent">
						<text>老年人外出要警惕两件事，可大大降低心梗风险！第一是出门前记得上一次厕所，并且每次上完厕所之后要注意缓慢起身；因为憋尿的时候会让人体的交感神经.....</text>
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
	export default {
		components: {
			navBar
		},
		data() {
			return {
				infoText: '',
				showLoadingHint: false,
				daytimeNapIconPng: require("@/static/img/daytime-nap-icon.png"),
				leaveHomeListIconPng: require("@/static/img/leave-home-list-icon.png"),
				goHomeIconPng: require("@/static/img/go-home-icon.png"),
				itemList: [{
					name: '日'
				}, {
					name: '周'
				}, {
					name: '月'
				}],
				currentItem: 0
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
			
			// tab切换值改变事件
			change(index) {
				this.currentItem = index;
			},
			
			// 进入健康小知识详情事件
			healthTipsDetailsEvent () {
				uni.redirectTo({
					url: '/healthMonitoringPackage/pages/healthLeaveHomeTips/healthLeaveHomeTips'
				})
			},
			
			backTo () {
				uni.switchTab({
					url: '/pages/index/index'
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
			background: #F5F5F5;
			overflow: auto;
			display: flex;
			flex-direction: column;
			.content-top-area {
				background: #fff;
				height: 440px;
				display: flex;
				flex-direction: column;
				.content-top-title {
					width: 70%;
					height: 41px;
					margin: 0 auto;
					margin-top: 20px;
					::v-deep .u-subsection {
						.u-item-bg {
							height: 24px !important;
							bottom: 5px !important
						}
					}
				};
				.content-top-content {
					margin-top: 10px;
					flex: 1;
					.day-data-area {
						display: flex;
						flex-direction: column;
						height: 100%;
						.data-top {
							width: 70%;
							margin: 0 auto;
							height: 93px;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							>view {
								width: 100%;
								font-size: 14px;
								color: #101010;
								text-align: center;
								&:nth-child(1) {
									display: flex;
									justify-content: space-between;
								};
								&:nth-child(2) {
									margin: 6px 0
								};
								&:last-child {
									font-size: 18px
								}
							}
						};
						.data-bottom {
							flex: 1
						}
					}
				}
			};
			.content-bottom-area {
				flex: 1;
				margin-top: 8px;
				padding: 10px;
				box-sizing: border-box;
				background: #fff;
				> view {
					margin-bottom: 10px;
					border-radius: 10px;;
					box-shadow: 0px 2px 6px 0 rgba(0, 0, 9, 0.1);
					padding: 8px 12px;
					box-sizing: border-box;
					border: 1px solid #BBBBBB
				}
				.data-overview-list {
					height: 65px;
					display: flex;
					padding: 10px;
					box-sizing: border-box;
					align-items: center;
					justify-content: space-between;
					.overview-list-left {
						>image {
							width: 19px;
							height: 19px;
							vertical-align: middle;
							margin-right: 14px;
						};
						>text {
							font-size: 14px;
							color: #101010;
							vertical-align: middle;
							&:nth-of-type(1) {
								margin-right: 6px
							}
						}
					};
					.overview-list-right {
						font-size: 14px;
						color: #101010;
					};
				};
				.health-tips {
					height: 91px;
					display: flex;
					flex-direction: column;
					height: 134px;
					.health-tips-top {
						>image {
							width: 24px;
							height: 24px;
							margin-right: 10px;
							vertical-align: middle;
						};
						>text {
							font-size: 14px;
							color: #101010;
							vertical-align: middle;
						}
					};
					.health-tips-bottom {
						flex: 1;
						display: flex;
						align-items: center;
						font-size: 14px;
						color: #101010;
						text-align: justify;
						text-indent: 12px;
					};
				}
			}
		}
	}
</style>






