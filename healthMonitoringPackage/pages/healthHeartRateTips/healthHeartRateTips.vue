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
				<image src="https://blink-radar.oss-cn-chengdu.aliyuncs.com/3ce8e4adf2bebbf03044ac129c9041ada062273f57fe65603babf12902a59a2b.png"></image>
			</view>
			<view class="paragraph-two">
				<view>
					<text></text>
					<text>
						一般来说，年龄越小，心率越快，老年人的心跳比年轻慢，这是比较正常的现象。在安静的状态下，正常成人的心率也比在清醒或活动时的心率要偏慢一点。另外，经常运动的运动员，其心率也会比正常的频率要慢一点。只要没有很特殊的原因，比如胸闷、气短等症状，一般来说保持每分钟60-100次左右就可以。
					</text>
				</view>
				<view>
					<text>
						
					</text>
					<text>
						 异常的心率可能表明心脏健康问题。以下是一些需要注意的情况：
					</text>
				</view>
				<view>
					<text>
						心跳过速（心动过速）：
					</text>
					<text>
						如果您的心率持续高于正常范围，有可能出现心动过速。这可能导致心脏不正常地快速跳动，引起心悸、胸闷或头晕等症状。
					</text>
				</view>
				<view>
					<text>
						心跳过缓（心动过缓）：
					</text>
					<text>
						如果您的心率持续低于正常范围，有可能出现心动过缓。这可能导致疲劳、头晕或晕厥等症状。
					</text>
				</view>
				<view>
					<text></text>
					<text>定期测量和监测心率对于心脏健康的评估非常重要。您可以使用心率监测设备，如体征监测雷达，跟踪您的心率变化。</text>
				</view>
				<view>
					<text></text>
					<text>一些健康的生活习惯有助于保持正常的心率和心脏健康：</text>
				</view>
				<view>
					<text>
						有规律的锻炼 ：
					</text>
					<text>
						 适度的有氧运动，如慢跑、游泳或快步走，可以提高心脏健康并降低心率。
					</text>
				</view>
				<view>
					<text>
						健康饮食：
					</text>
					<text>
						均衡的膳食可以维持血液中的健康胆固醇水平，促进心脏健康。
					</text>
				</view>
				<view>
					<text>
						减轻压力 ：
					</text>
					<text>
						减轻压力和焦虑有助于维护正常的心率。尝试放松技巧，如冥想、深呼吸或瑜伽。
					</text>
				</view>
				<view>
					<text>
						戒烟和限制酒精摄入 ：
					</text>
					<text>
						吸烟和过量饮酒可能对心脏健康产生负面影响。戒烟并限制酒精摄入对于心率和整体健康非常重要。
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
		import { createVisitPageData, exitPageData } from '@/api/user.js'
	export default {
		components: {
			navBar
		},
		data() {
			return {
				infoText: '',
				showLoadingHint: false,
				visitPageId: ''
			}
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
		onShow () {
			this.createVisitPage();
		},
		destroyed () {
			if (!this.visitPageId && this.visitPageId !== 0) {
				return
			};
			this.exitPage()
		},
		methods: {
			...mapMutations([
				'changeOverDueWay'
			]),
			
			// 创建页面访问数据
			createVisitPage () {
				createVisitPageData({
					pageName: "健康-心率详情-健康小知识",
					pageKey: "healthHeartRateTips"
				}).then((res) => {
					if (res && res.data.code == 0) {
						this.visitPageId = res.data.data
					}
				})
				.catch((err) => {
				})
			},
			
			// 退出页面数据
			exitPage () {
				exitPageData(this.visitPageId).then((res) => {
					if (res && res.data.code == 0) {
					}
				})
				.catch((err) => {
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



