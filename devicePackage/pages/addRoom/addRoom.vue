<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="新增房间" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="content-top-area">
				<u-input v-model="roomNameValue" type="text" placeholder="请输入房间名称" :border="true" placeholder-style="color:#101010" border-color="#BBBBBB" />
			</view>
			<view class="recommend-room-area">
				<view class="recommend-room-title">
					<text>推荐房间名称</text>
				</view>
				<view class="recommend-room-list-wrapper">
					<view class="recommend-room-list" v-for="(item,index) in recommendRoomList" :key="index">
						<text>{{ item }}</text>
					</view>
				</view>
			</view>
			<view class="operation-area">
				<text @click="cancelEvent">取消</text>
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
	export default {
		components: {
			navBar
		},
		data() {
			return {
				infoText: '',
				showLoadingHint: false,
				roomNameValue: '',
				recommendRoomList: ['后院','阳台','浴室','卧室','餐厅']
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
			
			// 取消事件
			cancelEvent () {
				uni.redirectTo({
					url: '/devicePackage/pages/roomManagement/roomManagement'
				})
			},
			
			// 保存事件
			saveEvent () {
				
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
			.content-top-area {
				width: 100%;
				margin-bottom: 14px;
				::v-deep {
					.u-input {
						background: #fff !important
					}
				}
			};
			.recommend-room-area {
				width: 100%;
				flex: 1;
				display: flex;
				flex-direction: column;
				overflow: auto;
				.recommend-room-title {
					width: 100%;
					font-size: 14px;
					color: #101010;
					margin-bottom: 14px;
				};
				.recommend-room-list-wrapper {
					width: 100%;
					flex: 1;
					overflow: auto;
					flex-wrap: wrap;
					display: flex;
					align-content: flex-start;
					.recommend-room-list {
						margin-right: 2%;
						margin-bottom: 10px;
						border-radius: 5px;
						width: 32%;
						height: 40px;
						display: flex;
						background: #fff;
						align-items: center;
						justify-content: center;
						font-size: 14px;
						color: #101010;
						&:nth-child(3n) {
							margin-right: 0 !important
						}
					}
				}
			};
			.operation-area {
				height: 80px;
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				>text {
					font-size: 18px;
					display: inline-block;
					border-radius: 26px;
					width: 45%;
					height: 48px;
					display: flex;
					align-items: center;
					justify-content: center;
					&:first-child {
						border: 1px solid #E86F50;
						color: #E86F50
					};
					&:last-child {
						background: #11D183;
						color: #fff
					}
				}
			}
		}
	}
</style>



