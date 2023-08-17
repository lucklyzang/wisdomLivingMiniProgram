<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010"  title="家庭管理" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="content-top">
				<view class="family-list" v-for="(item,index) in familyList" :key="index">
					<view class="list-left">
						<text>{{ item }}</text>
					</view>
					<view class="list-right">
						<image :src="editGreenIconPng" @click="editEvent"></image>
						<image :src="deleteRedSquareIconPng" @click="deleteEvent"></image>
					</view>
				</view>
			</view>
			<view class="content-bottom-area">
				<view class="content-bottom" @click="addEvent">
					<u-icon name="plus" color="#11D183" size="50"></u-icon>
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
				familyList: ['后院','阳台','浴室','卧室','餐厅'],
				editGreenIconPng: require("@/static/img/edit-green-icon.png"),
				deleteRedSquareIconPng: require("@/static/img/delete-red-square-icon.png"),
				showLoadingHint: false
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
			
			// 编辑事件
			editEvent () {
				uni.redirectTo({
					url: '/generalSetPackage/pages/editFamily/editFamily'
				})
			},
			
			// 添加事件
			addEvent () {
				uni.redirectTo({
					url: '/generalSetPackage/pages/addFamily/addFamily'
				})
			},
			
			// 删除事件
			deleteEvent () {},
			
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
			background: #F5F5F5;
			padding: 20px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			overflow: auto;
			.content-top {
				width: 100%;
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				.family-list {
					width: 100%;
					margin-bottom: 10px;
					padding: 0 10px;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 53px;
					background: #fff;
					border-radius: 10px;
					box-shadow: 0px 2px 6px 0px rgba(92,133,136,.26);
					.list-left {
						font-size: 16px;
						color: #101010;
						vertical-align: middle;
					};
					.list-right {
						>image {
							width: 24px;
							height: 24px;
							vertical-align: middle;
							&:first-child {
								margin-right: 10px
							}
						}
					}
				}
			};
			.content-bottom-area {
				width: 100%;
				height: 100px;
				display: flex;
				align-items: center;
				justify-content: center;
				.content-bottom {
					width: 100%;
					height: 53px;
					border: 1px solid #11D183;
					border-radius: 29px;
					display: flex;
					align-items: center;
					justify-content: center
				}
			}	
		}
	}
</style>





