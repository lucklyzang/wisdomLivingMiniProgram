<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="编辑数据卡片">
				<view slot="left" @click="backTo">
					<text>取消</text>
				</view>
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="show-home-content">
				<view class="show-title">
					<text>显示在首页</text>
					<text>点击右侧按钮即可对场景进行删除、复制和排序</text>
				</view>
				<view class="show-list-wrapper">
					<view class="show-list">
						<view class="list-left">
							<image :src="sleepIconPng"></image>
							<text class="scene">睡眠</text>
							<text class="scene-box">-</text>
						</view>
						<view class="list-right">
							<view class="delete-box"><image :src="deleteIconPng"></image></view>
							<view class="copy-box"><image :src="copyIconPng"></image></view>
							<view class="move-box"><image :src="menuMoveIconPng"></image></view>
						</view>
					</view>
					<view class="show-list">
						<view class="list-left">
							<image :src="sleepIconPng"></image>
							<text class="scene">睡眠</text>
							<text class="scene-box">-场景二</text>
						</view>
						<view class="list-right">
							<view class="delete-box"><image :src="deleteIconPng"></image></view>
							<view class="copy-box"><image :src="copyIconPng"></image></view>
							<view class="move-box"><image :src="menuMoveIconPng"></image></view>
						</view>
					</view>
					<view class="show-list">
						<view class="list-left">
							<image :src="toiletIconPng"></image>
							<text class="scene">入厕</text>
							<text class="scene-box"></text>
						</view>
						<view class="list-right">
							<view class="delete-box"><image :src="deleteIconPng"></image></view>
							<view class="copy-box"><image :src="copyIconPng"></image></view>
							<view class="move-box"><image :src="menuMoveIconPng"></image></view>
						</view>
					</view>
					<view class="show-list">
						<view class="list-left">
							<image :src="tumbleIconPng"></image>
							<text class="scene">跌倒</text>
							<text class="scene-box"></text>
						</view>
						<view class="list-right">
							<view class="delete-box"><image :src="deleteIconPng"></image></view>
							<view class="copy-box"><image :src="copyIconPng"></image></view>
							<view class="move-box"><image :src="menuMoveIconPng"></image></view>
						</view>
					</view>
					<view class="show-list">
						<view class="list-left">
							<image :src="leaveHomeIconPng"></image>
							<text class="scene">离家和回家</text>
							<text class="scene-box"></text>
						</view>
						<view class="list-right">
							<view class="delete-box"><image :src="deleteIconPng"></image></view>
							<view class="copy-box"><image :src="copyIconPng"></image></view>
							<view class="move-box"><image :src="menuMoveIconPng"></image></view>
						</view>
					</view>
				</view>
			</view>
			<view class="show-home-content no-show-home-content">
				<view class="show-title">
					<text>不显示在首页</text>
				</view>
				<view class="show-list-wrapper">
					<view class="show-list">
						<view class="list-left">
							<image :src="sleepIconPng"></image>
							<text class="scene">睡眠</text>
							<text class="scene-box">-</text>
						</view>
						<view class="list-right">
							<view class="delete-box"><image :src="sleepIconPng"></image></view>
							<view class="copy-box"><image :src="sleepIconPng"></image></view>
							<view class="move-box"><image :src="sleepIconPng"></image></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-area">
			<view class="btn-area" @click="saveEvent">
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
				showLoadingHint: false,
				sleepIconPng: require("@/static/img/sleep-icon.png"),
				toiletIconPng: require("@/static/img/toilet-icon.png"),
				tumbleIconPng: require("@/static/img/tumble-icon.png"),
				leaveHomeIconPng: require("@/static/img/leave-home-icon.png"),
				copyIconPng: require("@/static/img/copy-icon.png"),
				deleteIconPng: require("@/static/img/delete-icon.png"),
				menuMoveIconPng: require("@/static/img/menu-move-icon.png")
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
			
			backTo () {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			
			// 保存事件
			saveEvent () {}
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
			.header_content {
				.header_left_box {
					>view {
						width: 100px;
						padding-left: 16px;
						box-sizing: border-box;
						font-size: 16px;
						color: #101010
					}
				}
			}
		};
		.content-area {
			padding: 10px;
			background: #f5f5f5;
			box-sizing: border-box;
			flex: 1;
			.show-home-content {
				.show-title {
					display: flex;
					flex-direction: column;
					>text {
						&:first-child {
							font-size: 18px;
							color: #101010
						};
						&:last-child {
							font-size: 14px;
							color: #101010;
							margin: 10px 0
						}
					}
				};
				.show-list-wrapper {
					.show-list {
						display: flex;
						padding: 0 6px;
						align-items: center;
						justify-content: space-between;
						background: #fff;
						margin-bottom: 8px;
						width: 100%;
						height: 46px;
						&:last-child {
							margin-bottom: 0 !important;
						};
						.list-left {
							>image {
								width: 24px;
								height: 24px;
								vertical-align: middle;
								margin-right: 10px;
							};
							.scene {
								color: #101010;
							};
							.scene-box {
								color: #898C8C;
							}
							>text {
								font-size: 16px;
								vertical-align: middle
							}
						};
						.list-right {
							display: flex;
							justify-content: flex-end;
							>view {
								margin-right: 24px;
								position: relative;
								image {
									width: 20px;
									height: 20px;
									vertical-align: middle
								}
							};
							.delete-box::after {
								content: "";
								position: absolute;
								top: 2px;
								right: -13px;
								width: 1px;
								height: 22px;
								background: #BBBBBB
							};
							.copy-box::after {
								content: "";
								position: absolute;
								top: 2px;
								right: -13px;
								width: 1px;
								height: 22px;
								background: #BBBBBB
							};
							.move-box {
								margin-right: 0 !important
							}
						}
					}
				}
			};
			.no-show-home-content {}
		};
		.bottom-area {
			background: #f5f5f5;
			height: 120px;
			display: flex;
			justify-content: center;
			align-items: center;
			.btn-area {
				border-radius: 26px;
				width: 266px;
				height: 48px;
				background: #11D183;
				box-shadow: 0px 2px 6px 0 rgba(92, 133, 136, 0.29);
				font-size: 16px;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
			}	
		}
	}
</style>


