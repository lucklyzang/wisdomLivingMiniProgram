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
					年龄和个体差异会影响每个人的睡眠需求。一般成人每晚需要约7到9小时的睡眠，而儿童和青少年可能需要更多。
				</text>
			</view>
			<view class="paragraph-image-one">
				<image src="https://blink-radar.oss-cn-chengdu.aliyuncs.com/53d334cd889a0e00585e3e714aceed2b1dcd041d3ef84548b98dba994f1cf86a.png"></image>
			</view>
			<view class="paragraph-two">
				<view>
					<text>
						
					</text>
					<text>
						睡前和起床时间的规律有助于建立健康的睡眠习惯，并使您的身体保持正常的生物钟。
						 睡眠质量同样重要。深度睡眠和快速眼动（REM）睡眠都是促进身体和大脑恢复的重要阶段。创建一个安静、舒适、黑暗、凉爽的睡眠环境有助于提高睡眠质量。
					</text>
				</view>
				<view>
					<text>
						
					</text>
					<text>
						 长时间熬夜和过度午睡可能破坏正常的睡眠周期，导致晚上难以入睡或难以保持良好的睡眠质量。
					</text>
				</view>
				<view>
					<text>
						
					</text>
					<text>
						一些常见的睡眠障碍包括失眠、睡眠呼吸暂停和睡眠中的肌肉活动障碍。如果您经常感到疲劳、睡眠不足、及时醒来或存在其他睡眠问题，请咨询医生以获取专业建议。
					</text>
				</view>
				<view>
					<text>
						
					</text>
					<text>
						 一个健康的生活方式对于良好的睡眠至关重要。合理规划您的饮食、适度锻炼、避免过度糖、咖啡因和酒精的摄入，并采取放松活动来减轻压力和焦虑。
					</text>
				</view>
				<view>
					<text>
						
					</text>
					<text>
						创建一个睡前放松的例行程序，例如沐浴、阅读或冥想。避免蓝光（来自电子设备如手机和电脑屏幕）对睡眠质量的干扰。
					</text>
				</view>
				<view>
					<text>
					
					</text>
					<text>
						 长期依赖药物来帮助入睡可能不利于建立健康的睡眠习惯。如果您感到需要使用药物来改善睡眠，请咨询医生的建议。
					</text>
				</view>
				<view>
					<text>
						
					</text>
					<text>
						保持卧室安静、凉爽、暗幕和舒适。使用舒适的床垫和枕头，以促进更好的睡眠。
					</text>
				</view>
				<view>
					<text>
						
					</text>
					<text>
						适度的锻炼可以促进更好的睡眠。但请注意，避免在就寝前进行剧烈运动，因为这可能会提高身体的兴奋度。
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
		onShow() {
			this.createVisitPage();
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
					pageName: "健康-睡眠详情-健康小知识",
					pageKey: "healthSleepTips"
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
