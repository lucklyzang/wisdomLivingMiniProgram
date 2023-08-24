<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="报警范围设置" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="set-list-area">
				<view class="set-list" v-for="(item,index) in setList" :key="index">
					<view class="set-list-left">
						<text>{{ item.name }}</text>
					</view>
					<view class="set-list-right">
						<u-switch v-model="item.checked" active-color="#5A7BF4" inactive-color="#9E9E9E"></u-switch>
					</view>
				</view>
			</view>
			<view class="bottom-btn">
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
				checked: false,
				showLoadingHint: false,
				setList: [
					{
						name: '人员进入报警',
						checked: false
					},
					{
						name: '人员离开报警',
						checked: true
					}
				]
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
				uni.redirectTo({
					url: '/devicePackage/pages/bodyDetectionRadarCompleteSet/completeSet?transmitData='+1
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
			width: 100%;
			flex: 1;
			background: #F5F5F5;
			padding: 10px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			.set-list-area {
				flex: 1;
				overflow: auto;
				.set-list {
					padding: 0 6px 0 10px;
					box-sizing: border-box;
					border-radius: 8px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 53px;
					background: #fff;
					margin-bottom: 10px;
					.set-list-left {
						font-size: 14px;
						color: #101010;
						>text {
							&:nth-child(2) {
								font-size: 12px;
								color: #888888;
								margin-left: 4px;
								vertical-align: bottom
							}
						}
					};
					.set-list-right {}
				}
			};
			.bottom-btn {
				height: 80px;
				background: #f5f5f5;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				>text {
					font-size: 14px;
					display: inline-block;
					border-radius: 26px;
					width: 60%;
					height: 48px;
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






