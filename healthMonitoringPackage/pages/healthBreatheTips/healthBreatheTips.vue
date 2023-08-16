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
					正常人通常呼吸频率在16-24次/分，低于10次/分，通常提示患者的呼吸频率减慢，超过24次/分，通常提示患者有呼吸急促。然而，孩子和年幼儿童的呼吸频率可能会更快，而运动、情绪激动或热天气等情况下也可能稍微加快呼吸速度。
				</text>
			</view>
			<view class="paragraph-image-one">
				<image :src="healthBreathePng"></image>
			</view>
			<view class="paragraph-two">
				<view>
					<text>
						以下是一些与上厕所相关的健康小知识：
					</text>
				</view>
				<view>
					<text>
						1. 注意呼吸异常：
					</text>
					<text>
						注意以下呼吸异常状况，如果您或他人出现以下情况，应及时就医：
					</text>
				</view>
				<view>
					<text>
						气短或呼吸困难：
					</text>
					<text>
						感到呼吸困难、不能正常呼吸、需用力才能呼吸或无法深吸气。
					</text>
				</view>
				<view>
					<text>
						快速呼吸：
					</text>
					<text>
						 呼吸频率远高于正常范围，而无明显原因。
					</text>
				</view>
				<view>
					<text>
						缓慢呼吸：
					</text>
					<text>
						呼吸频率明显低于正常范围，可能伴有昏迷或其他症状。
					</text>
				</view>
				<view>
					<text>
						呼吸不规律：
					</text>
					<text>
						呼吸节奏不正常、间隔不规则或突然变化。
					</text>
				</view>
				<view>
					<text>
						呼吸嘶哑、喘息或伴有咳嗽：
					</text>
					<text>
						持续嘶哑、喘息或咳嗽，尤其是伴有其他症状时，需要关注。
					</text>
				</view>
				<view>
					<text>
						胸痛或胸闷：
					</text>
					<text>
						呼吸时出现胸闷或胸痛感。
					</text>
				</view>
				<view>
					<text>
						2. 技巧性呼吸方法：
					</text>
					<text>
						有些呼吸技巧可以帮助您保持呼吸健康：
					</text>
				</view>
				<view>
					<text>
						腹式呼吸：
					</text>
					<text>
						通过深吸气，让腹部扩张，然后缓慢、完全地呼气。
					</text>
				</view>
				<view>
					<text>
						深呼吸：
					</text>
					<text>
						慢慢地吸入更多的空气，然后缓慢呼出，以促进放松和心理平衡。
					</text>
				</view>
				<view>
					<text>
						冥想和瑜伽呼吸练习：
					</text>
					<text>
						通过正念冥想和瑜伽练习的深呼吸可以帮助放松身心，减轻焦虑和压力。
					</text>
				</view>
				<view>
					<text>
						3. 注意呼吸健康的生活方式：
					</text>
					<text>
						保持健康的生活方式有助于维护良好的呼吸健康：
					</text>
				</view>
				<view>
					<text>
						不吸烟：
					</text>
					<text>
						避免吸烟，远离二手烟，以保护呼吸系统的健康。
					</text>
				</view>
				<view>
					<text>
						维持适当的体重：
					</text>
					<text>
						控制体重可以减轻呼吸系统的负担。
					</text>
				</view>
				<view>
					<text>
						适量的运动：
					</text>
					<text>
						规律的体育活动有助于增强肺部功能和呼吸肌力。
					</text>
				</view>
				<view>
					<text>
						良好的室内空气质量：
					</text>
					<text>
						确保室内空气流通，减少室内空气污染。
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
				showLoadingHint: false,
				healthBreathePng: require("@/static/img/health-breathe-tips.png")
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
					url: '/healthMonitoringPackage/pages/breathe/breathe'
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
					width: 326px;
					height: 173px;
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
