<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="房间管理" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="recommend-room-area">
				<view class="recommend-room-list-wrapper">
					<view class="recommend-room-list" v-for="(item,index) in recommendRoomList" :key="index">
						<text>{{ item }}</text>
						<image :src="deleteRedIconPng" @click="deleteEvent"></image>
					</view>
				</view>
			</view>
			<view class="operation-area">
				<text @click="completeEvent">完成</text>
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
				roomNameValue: '',
				recommendRoomList: ['后院','阳台','浴室','卧室','餐厅'],
				deleteRedIconPng: require("@/static/img/delete-red-icon.png"),
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
			
			// 完成事件
			completeEvent () {
				uni.redirectTo({
					url: '/devicePackage/pages/roomManagement/roomManagement'
				})
			},
			
			// 删除事件
			deleteEvent () {
				
			},
			
			backTo () {
				uni.redirectTo({
					url: '/devicePackage/pages/roomManagement/roomManagement'
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
			padding: 16px;
			background: #f5f5f5;
			box-sizing: border-box;
			flex: 1;
			overflow: auto;
			display: flex;
			align-items: center;
			flex-direction: column;
			.recommend-room-area {
				width: 100%;
				flex: 1;
				.recommend-room-list-wrapper {
					width: 100%;
					flex: 1;
					overflow: auto;
					display: flex;
					flex-direction: column;
					align-items: center;
					.recommend-room-list {
						width: 100%;
						margin-bottom: 10px;
						border-radius: 5px;
						height: 40px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						>text {
							margin-right: 20px;
							flex: 1;
							padding-left: 20px;
							line-height: 40px;
							border-radius: 5px;
							box-sizing: border-box;
							display: inline-block;
							background: #fff;
							height: 40px;
							font-size: 14px;
							color: #101010;
						};
						>image {
							width: 20px;
							height: 20px
						}
					}
				}
			};
			.operation-area {
				height: 80px;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				>text {
					font-size: 18px;
					display: inline-block;
					border-radius: 26px;
					width: 70%;
					height: 48px;
					display: flex;
					align-items: center;
					justify-content: center;
					&:first-child {
						background: #11D183;
						color: #fff
					}
				}
			}
		}
	}
</style>




