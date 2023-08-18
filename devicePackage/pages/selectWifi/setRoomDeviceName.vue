<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="content-top-title">
				<text>设置房间</text>
			</view>
			<view class="content-center">
				<view class="content-center-top">
					<image :src="deviceIconPng"></image>
					<view class="room-list-wrapper">
						<view class="room-list" v-for="(item,index) in roomList" :key="index" @click="roomClickEvent(item,index)" :class="{'roomListStyle': index == currentIndex}">
							<text>{{ item }}</text>
						</view>
					</view>
					<view class="create-new-room">
						<u-icon name="plus" color="#34B9C0"></u-icon>
						<text @click="createNewRoomEvent">创建新房间</text>
					</view>
					<view class="page-area">
						<text>{{ currentPage }}</text>
						<text>/</text>
						<text>{{ totalPage }}</text>
					</view>
				</view>
			</view>
			<view class="bottom-btn">
				<text @click="stepEvent">下一步</text>
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
				currentIndex: 0,
				currentPage: 1,
				totalPage: 2,
				showLoadingHint: false,
				deviceIconPng: require("@/static/img/room-icon.png"),
				roomList: ['客厅','卧室','厨房','卫生间','主卧']
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
			
			// 下一步事件
			stepEvent () {
				uni.redirectTo({
					url: '/devicePackage/pages/selectWifi/setDeviceName'
				})
			},
			
			// 创建新房间事件
			createNewRoomEvent () {},
			
			// 房间点击事件
			roomClickEvent (item,index) {
				this.currentIndex = index
			},
			
			backTo () {
				uni.redirectTo({
					url: '/devicePackage/pages/selectWifi/connectDevice'
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
		.content-area {
			padding: 0 16px 16px 16px;
			box-sizing: border-box;
			flex: 1;
			display: flex;
			flex-direction: column;
			.content-top-title {
				height: 44px;
				display: flex;
				align-items: center;
				font-size: 22px;
				color: #101010
			};
			.content-center {
				flex: 1;
				display: flex;
				flex-direction: column;
				.content-center-top {
					flex: 1;
					display: flex;
					flex-direction: column;
					>image {
						width: 83px;
						height: 100px;
						margin-bottom: 10px;
						margin-top: 4px;
					};
					.room-list-wrapper {
						flex: 1;
						overflow: auto;
						display: flex;
						align-content: flex-start;
						flex-wrap: wrap;
						.room-list {
							height: 44px;
							padding: 0 14px;
							text-align: center;
							line-height: 44px;
							background: rgba(229, 229, 229, 0.41);
							border-radius: 10px;
							color: #101010;
							font-size: 16px;
							margin-right: 20px;
							margin-bottom: 20px;
						};
						.roomListStyle {
							background: #11D183;
							color: #fff
						}
					};
					.create-new-room {
						margin-top: 10px;
						width: 130px;
						height: 44px;
						background: rgba(229, 229, 229, 0.41);
						border-radius: 10px;
						display: flex;
						align-items: center;
						justify-content: center;
						::v-deep .u-icon {
							margin-top: 2px
						};
						>text {
							margin-left: 4px;
							color: rgba(52, 185, 192, 1);
							font-size: 16px
						}
					};
					.page-area {
						display: flex;
						justify-content: center;
						align-items: center;
						>text {
							font-size: 14px;
							color: rgba(14, 36, 66, 0.56)
						}
					}
				}
			};
			.bottom-btn {
				height: 70px;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				>text {
					font-size: 14px;
					display: inline-block;
					border-radius: 26px;
					width: 60%;
					height: 40px;
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



