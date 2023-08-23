<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="房间管理" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<u-empty text="暂无数据" v-if="isShowNoData"></u-empty>
			<view class="room-list" v-for="(item,index) in roomList" :key="index">
				<text>{{ item.name }}</text>
			</view>
		</view>
		<view class="operation-area">
			<image :src="roomEditIconPng" @click="roomEditEvent"></image>
			<image :src="roomAddIconPng" @click="roomAddEvent"></image>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import navBar from "@/components/zhouWei-navBar"
	import { getUserRoomList } from '@/api/user.js'
	export default {
		components: {
			navBar
		},
		data() {
			return {
				infoText: '',
				showLoadingHint: false,
				isShowNoData: false,
				roomAddIconPng: require("@/static/img/room-add-icon.png"),
				roomEditIconPng: require("@/static/img/room-edit-icon.png")
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
			this.queryUserRoomList()
		},
		methods: {
			...mapMutations([
				'changeOverDueWay',
				'changeEnterAddRoomPageSource'
			]),
			
			// 获取用户房间列表列表
			queryUserRoomList () {
				this.showLoadingHint = true;
				this.infoText = '加载中...';
				this.roomList = [];
				getUserRoomList().then((res) => {
					if ( res && res.data.code == 0) {
						if (res.data.data.length == 0) {
							this.isShowNoData = true
							return
						};
						this.roomList = res.data.data
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error',
							position: 'bottom'
						})
					}	
					this.showLoadingHint = false;
				})
				.catch((err) => {
					this.showLoadingHint = false;
					this.$refs.uToast.show({
						title: err,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			// 房间编辑事件
			roomEditEvent () {
				uni.redirectTo({
					url: '/devicePackage/pages/roomEdit/roomEdit'
				})
			},
			
			// 房间添加事件
			roomAddEvent () {
				this.changeEnterAddRoomPageSource('/devicePackage/pages/roomManagement/roomManagement');
				uni.redirectTo({
					url: '/devicePackage/pages/addRoom/addRoom'
				})
			},
			
			backTo () {
				uni.switchTab({
					url: '/pages/device/device'
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
		.operation-area {
			position: fixed;
			right: 0;
			bottom: 10vh;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			>image {
				&:first-child {
					width: 70px;
					height: 70px;
					margin-bottom: 20px;
				};
				&:last-child {
					width: 54px;
					height: 54px;
				}
			}
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
			.room-list {
				width: 100%;
				height: 50px;
				border-radius: 5px;
				background: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 10px;
				font-size: 14px;
				color: #101010
			}
		}
	}
</style>


