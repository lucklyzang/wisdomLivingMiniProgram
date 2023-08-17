<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010"  @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="content-title">
				<text>帮助与反馈</text>
			</view>
			<view class="specific-content">
				<text>
					非常乐意尽力解答您的疑问或处理您的反馈。您可以随时发送邮件至xxxxxxx@xx.xxx，我们的团队将会尽快回复您。
				</text>
				<text>
					我们十分重视用户的意见和建议，因为这有助于我们改进和提升服务质量，以满足用户的需求。无论是对产品功能的疑问、技术问题的反馈，还是其他任何相关主题，您的邮件都会被认真阅读和及时回复。
				</text>
				<text>
					在我们的努力下，我们希望为您提供最优质的服务，确保您在使用我们的产品或服务时获得最佳体验。感谢您对我们的支持和信任！
				</text>
				<text>
					期待收到您的来信，祝您生活愉快，工作顺利！
				</text>
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
			padding: 10px 16px 16px 16px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			.content-title {
				font-size: 24px;
				color: #101010;
				font-weight: bold;
				margin-bottom: 10px;
			};
			.specific-content {
				flex: 1;
				overflow: auto;
				font-size: 14px;
				color: #101010;
				display: flex;
				flex-direction: column;
				> text {
						line-height: 22px;
						margin-bottom: 10px
				}
			}
		}
	}
</style>



