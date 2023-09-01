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
					通常情况下，成年人排便时间大约在3~10分钟左右，但每个人的情况，差异很大，特别在老年人，可能排便时间会更长一点，但是如果排便时间大于30分钟，可能是存在肠道方面的疾病所引起的，还需要及时就医治疗。
				</text>
			</view>
			<view class="paragraph-image-one">
				<image src="https://blink-radar.oss-cn-chengdu.aliyuncs.com/5602cdaef5290c5cefb8e287411bb10d3a9c235c34379cd371a2a070eb6c40c3.png"></image>
			</view>
			<view class="paragraph-two">
				<view>
					<text>
						1. 跌倒风险因素：
					</text>
					<text>
						老人跌倒的风险因素很多，包括年龄增长、肌肉力量减弱、平衡能力下降、视力和听力受损、服用部分药物副作用、低血压等。了解并识别这些风险因素是预防跌倒的重要一步。
					</text>
				</view>
				<view>
					<text>
						2. 锻炼和保持肌肉力量：
					</text>
					<text>
						老年人可以通过适度的锻炼来加强肌肉力量和平衡能力，以减少跌倒的风险。推荐进行有氧运动、力量训练、平衡训练和柔韧。
					</text>
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
				uni.redirectTo({
					url: '/healthMonitoringPackage/pages/toilet/toilet'
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
				>text {
					font-size: 14px;
					color: #898C8C;
					line-height: 20px;
					text-align: justify;
				}
			};
			.paragraph-image-one {
				margin: 0 auto;
				margin-top: 10px;
				margin-bottom: 10px;
				>image {
					width: 298px;
					height: 198px;
				}
			};
			.paragraph-two {
				text-indent: 12px;
				flex: 1;
				overflow: auto;
				>view {
					margin-bottom: 6px;
					>text {
						font-size: 14px;
						color: #898C8C;
						line-height: 20px;
						text-align: justify;
						&:first-child {
							font-size: 16px;
							color: #898C8C;
							font-weight: bold;
						}
					}
				}
			}
		}
	}
</style>
