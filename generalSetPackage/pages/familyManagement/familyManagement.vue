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
				<u-empty text="暂无数据" v-if="isShowNoData"></u-empty>
				<view class="family-list" v-for="(item,index) in familyList" :key="index">
					<view class="list-left">
						<text>{{ item.name }}</text>
					</view>
					<view class="list-right">
						<image :src="editGreenIconPng" @click="editEvent(item)"></image>
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
	import { getUserFamilyList, deleteUserFamily } from '@/api/user.js'
	export default {
		components: {
			navBar
		},
		data() {
			return {
				infoText: '加载中...',
				isShowNoData: false,
				familyList: [],
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
			this.queryUserFamilyList()
		},
		methods: {
			...mapMutations([
				'changeOverDueWay'
			]),
			
			// 获取用户家庭列表
			queryUserFamilyList () {
				this.showLoadingHint = true;
				this.infoText = '加载中...';
				this.familyList = [];
				getUserFamilyList().then((res) => {
					if ( res && res.data.code == 0) {
						if (res.data.data.length == 0) {
							this.isShowNoData = true
							return
						};
						this.familyList = res.data.data
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
			
			// 编辑事件
			editEvent (item) {
				let mynavData = JSON.stringify(item);
				uni.redirectTo({
					url: '/generalSetPackage/pages/editFamily/editFamily?transmitData='+mynavData
				})
			},
			
			// 添加事件
			addEvent () {
				uni.redirectTo({
					url: '/generalSetPackage/pages/addFamily/addFamily'
				})
			},
			
			// 删除事件
			deleteEvent () {
				this.showLoadingHint = true;
				this.infoText = '删除中...';
				deleteUserFamily().then((res) => {
					if ( res && res.data.code == 0) {
						this.$refs.uToast.show({
							title: '删除成功',
							type: 'success',
							position: 'bottom'
						});
						this.queryUserFamilyList()
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





