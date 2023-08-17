<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010"  title="关于" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="content-top">
				<image :src="logoEllipseIconPng"></image>
				<text>守望家</text>
			</view>
			<view class="content-bottom">
				<view class="version-area">
					<view class="version-left">
						<text>版本号</text>
					</view>
					<view class="version-right">
						<text @click="updateEvent">更新</text>
						<text>1.0.0</text>
					</view>
				</view>
				<view class="email-area">
					<view class="email-left">
						<text>联系邮箱</text>
					</view>
					<view class="email-right">
						1253691549@qq.com
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
				logoEllipseIconPng: require("@/static/img/logo-ellipse-icon.png"),
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
			
			// 更新事件
			updateEvent () {},
			
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
			height: 100%;
			display: flex;
			flex-direction: column;
			.content-top {
				height: 35vh;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				>image {
					width: 125px;
					height: 125px;
					margin-bottom: 10px;
				};
				>text {
					font-size: 20px;
					color: #737373
				}
			};
			.content-bottom {
				flex: 1;
				background: #F5F5F5;
				padding: 20px;
				box-sizing: border-box;
				.version-area {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.version-left {
						font-size: 14px;
						color: #101010
					};
					.version-right {
						>text {
							&:first-child {
								margin-right: 10px;
								display: inline-block;
								height: 26px;
								width: 58px;
								color: #fff;
								background: #11D183;
								border-radius: 5px;
								text-align: center;
								line-height: 26px;
							};
							&:last-child {
								font-size: 14px;
								color: #101010
							}
						}
					}
				};
				.email-area {
					margin-top: 20px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					>view {
						font-size: 14px;
						color: #101010
					}
				}
			}
		}
	}
</style>




