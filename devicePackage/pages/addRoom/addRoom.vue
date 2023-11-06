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
					<u-empty text="暂无数据" v-if="isShowNoRoomData"></u-empty>
					<view class="recommend-room-list" v-for="(item,index) in recommendRoomList" :key="index" @click="roomNameClick(item)">
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
	import { createUserRoom, getUserPresetsRoomList } from '@/api/user.js'
	export default {
		components: {
			navBar
		},
		data() {
			return {
				infoText: '',
				isShowNoRoomData: false,
				showLoadingHint: false,
				roomNameValue: '',
				recommendRoomList: []
			}
		},
		onLoad (object) {
			this.getPresetsRoomList()
		},
		computed: {
			...mapGetters([
				'userInfo',
				'enterAddRoomPageSource',
				'familyId'
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
		methods: {
			...mapMutations([
				'changeOverDueWay'
			]),
			
			// 取消事件
			cancelEvent () {
				this.backTo()
			},
			
			// 推荐房间名点击事件
			roomNameClick (item) {
				this.roomNameValue = item
			},
			
			// 获取预设房间
			getPresetsRoomList () {
				this.showLoadingHint = true;
				this.infoText = '加载中...';
				this.recommendRoomList = [];
				getUserPresetsRoomList().then((res) => {
					if ( res && res.data.code == 0) {
						if (res.data.data.length > 0) {
							this.isShowNoRoomData = false;
							this.recommendRoomList = res.data.data
						} else {
							this.isShowNoRoomData = true
						}
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
						title: err.message,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			// 保存事件
			saveEvent () {
				if (!this.roomNameValue) {
					this.$refs.uToast.show({
						title: '房间名称不能为空!',
						type: 'warning',
						position: 'bottom'
					});
					return
				};
				this.showLoadingHint = true;
				this.infoText = '新增中...';
				this.familyList = [];
				createUserRoom({
					userId: this.userInfo.userId,
					familyId: this.familyId,
					name: this.roomNameValue
				}).then((res) => {
					if ( res && res.data.code == 0) {
						this.$refs.uToast.show({
							title: '新增房间成功',
							type: 'success',
							position: 'bottom'
						});
						this.backTo()
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
						title: err.message,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			backTo () {
				uni.$emit('update');
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
					position: relative;
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
					};
					::v-deep .u-empty {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%,-50%)
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



