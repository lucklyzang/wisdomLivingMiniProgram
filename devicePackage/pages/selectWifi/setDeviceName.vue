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
				<text>设置名称</text>
			</view>
			<view class="content-center">
				<view class="content-center-top">
					<image :src="deviceIconPng"></image>
					<view class="input-area">
						<u-form ref="uForm">
							<u-form-item>
								<u-input v-model="deviceNameValue" height="80" placeholder="请输入设备名称"/>
							</u-form-item>
						</u-form>
					</view>
					<view class="page-area">
						<text>{{ currentPage }}</text>
						<text>/</text>
						<text>{{ totalPage }}</text>
					</view>
				</view>
			</view>
			<view class="bottom-btn">
				<text @click="startExperienceEvent">开始体验</text>
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
				currentPage: 2,
				deviceNameValue: '',
				totalPage: 2,
				showLoadingHint: false,
				deviceIconPng: require("@/static/img/room-icon.png")
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
			
			// 开始体验事件
			startExperienceEvent () {
				uni.redirectTo({
					url: '/devicePackage/pages/tumbleRadarCompleteSet/completeSet'
				})
			},
			
			backTo () {
				uni.redirectTo({
					url: '/devicePackage/pages/selectWifi/setRoomDeviceName'
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
					.input-area {
						flex: 1;
						::v-deep .u-form {
							.u-form-item {
								background: rgba(229, 229, 229, 0.41);
								border-radius: 13px;
								padding: 2px 8px !important
							}
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




