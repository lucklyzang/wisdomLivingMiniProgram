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
					老人跌倒是一种常见的意外事件，对老年人的健康和生活质量造成严重影响。以下是一些与老人跌倒相关的健康小知识：
				</text>
			</view>
			<view class="paragraph-image-one">
				<image src="https://blink-radar.oss-cn-chengdu.aliyuncs.com/db6a80ded8207573f244a4a5f6cbf6a2b59e01e3262513c8546c4f34a9450c1e.png"></image>
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
						老年人可以通过适度的锻炼来加强肌肉力量和平衡能力，以减少跌倒的风险。推荐进行有氧运动、力量训练、平衡训练和柔韧性训练等多种形式的运动。
					</text>
				</view>
				<view>
					<text>
						3. 增加家居安全：
					</text>
					<text>
						 老年人在家中可以采取一些措施，如安装扶手、防滑地毯、扶手椅、浴室抓杆等，以减少家庭中的跌倒风险。定期检查家中的电线、地毯和家具等，确保没有阻碍、松动或危险的物品。
					</text>
				</view>
				<view>
					<text>
						4. 使用辅助设备：
					</text>
					<text>
						有需要的老人可以使用辅助设备，如拐杖、助行器或轮椅等，提供额外的稳定性和支持，减少跌倒风险。然而，使用这些设备时也要确保正确使用和保养。
					</text>
				</view>
				<view>
					<text>
						5. 鞋子的选择：
					</text>
					<text>
						整齐、稳固和舒适的鞋子对于老年人的跌倒预防很重要。选择具有良好支撑和防滑功能的鞋子，并避免高跟鞋或松脱的鞋带。
					</text>
				</view>
				<view>
					<text>
						6. 视力和听力保健：
					</text>
					<text>
						定期进行视力和听力检查，及时矫正视力或获取合适的助听设备，可以帮助老年人在行动中更好地感知周围环境，减少跌倒的风险。
					</text>
				</view>
				<view>
					<text>
						7. 谨慎用药：
					</text>
					<text>
						 一些药物有可能引起老年人头晕或平衡问题，增加跌倒的风险。老年人在使用药物时应遵医嘱，了解药物的副作用，并与医生讨论减少跌倒的风险措施。
					</text>
				</view>
				<view>
					<text>
						8. 定期体检和药物管理：
					</text>
					<text>
						经常进行全面体检和定期复查，及时处理慢性疾病和疾病风险，以预防或控制潜在的身体问题，减少跌倒的风险。同时，按医嘱规范管理药物的用量和时间。
					</text>
				</view>
				<view>
					<text>
						9. 定期眼睛检查：
					</text>
					<text>
						眼睛问题是老年人跌倒的一个重要因素，定期去眼科进行检查，确保视力正常，并纠正可能的视力问题。
					</text>
				</view>
				<view>
					<text>
						10. 定期进行平衡训练：
					</text>
					<text>
						 老年人可以通过参加专门的平衡训练或康复课程来提高平衡和步态的稳定性，
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
					pageName: "健康-跌倒详情-健康小知识",
					pageKey: "healthTumbleTips"
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
