<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="健康小知识" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="paragraph-one">
				<text>
					正常人的心率每分钟是60-100次，如果低于60次/分，说明是心动过缓；如果高于100次/分，说明是心动过速。老年人的心脏功能有所退化，心率的正常值要比正常人稍微低一点，在每分钟55-90次左右。
				</text>
			</view>
			<view class="paragraph-image">
				<image :src="healthTipsIconPng"></image>
			</view>
			<view class="paragraph-two">
				<text>
					 一般来说，年龄越小，心率越快，老年人的心跳比年轻慢，这是比较正常的现象。在安静的状态下，正常成人的心率也比在清醒或活动时的心率要偏慢一点。另外，经常运动的运动员，其心率也会比正常的频率要慢一点。只要没有很特殊的原因，比如胸闷、气短等症状，一般来说保持每分钟60-100次左右就可以。
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
				showLoadingHint: false,
				healthTipsIconPng: require("@/static/img/health-tips-icon.png")
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
					url: '/healthMonitoringPackage/pages/heartRate/heartRate'
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
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			.paragraph-one {
				text-indent: 12px;
				>tetx {
					font-size: 14px;
					color: #1F1F1F;
					line-height: 20px;
					text-align: justify;
				}
			};
			.paragraph-image {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 200px;
				>image {
					width: 265px;
					height: 174px;
				}
			};
			.paragraph-two {
				text-indent: 12px;
				flex: 1;
				overflow: auto;
				>tetx {
					font-size: 14px;
					color: #1F1F1F;
					line-height: 20px;
					text-align: justify;
				}
			}
		}
	}
</style>



