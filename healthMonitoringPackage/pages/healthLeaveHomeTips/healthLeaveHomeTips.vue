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
					大部分老年人身体素质可能稍微低于年轻人，因此外出时需要注意的事情更多，不可疏忽大意。
					以下是一些老年人外出的注意事项：
				</text>
			</view>
			<view class="paragraph-image-one">
				<image :src="healthLeaveHomeTipsOnePng"></image>
			</view>
			<view class="paragraph-two">
				<view>
					<text>
						1. 穿着舒适合适：
					</text>
					<text>
						老年人出门应选择舒适合身的衣物和鞋子，以确保行动的灵活性和舒适度。避免穿着过紧或过宽的衣物，以防止不适或容易绊倒。
					</text>
				</view>
				<view>
					<text>
						2. 注意天气和季节：
					</text>
					<text>
						老年人对天气的适应能力较弱，出门前要关注天气预报，合理选择着装，避免暴晒或受寒。在寒冷的天气里，要注意保持温暖，穿戴合适的保暖衣物。
					</text>
				</view>
				<view>
					<text>
						 3. 准备身份证明：
					</text>
					<text>
						老年人出门时，应随身携带有效的身份证明文件，如身份证、驾驶证或护照等。这样可以为必要时提供证明身份的便利。
					</text>
				</view>
				<view>
					<text>
						4. 注意交通安全：
					</text>
					<text>
						老年人在出门时要特别注意交通安全。遵守交通规则，过马路时等待绿灯或斑马线，尽量避免夜间行走或行人稀少的地方。
					</text>
				</view>
				<view>
					<text>
						 5. 包含急救用品：
					</text>
					<text>
						老年人在出门时可以随身携带一些常用的急救用品，如创口贴、退烧药、常用药物等。这样可以应对一些意外情况或突发疾病的急需。
					</text>
				</view>
				<view>
					<text>
						 6. 避免高强度活动：
					</text>
					<text>
						老年人出门时要避免高强度和高风险的活动，以防发生意外伤害。合理规划行程，避免连续长时间的步行或站立，注意休息和饮水，以保证身体的舒适和安全。
					</text>
				</view>
				<view>
					<text>
						 7. 提前规划行程：
					</text>
					<text>
						老年人出门前可以提前规划好行程，选择熟悉或易达的目的地。了解公共交通线路和时刻表，以便更方便地安排行程。
					</text>
				</view>
				<view>
					<text>
						 8. 注意随身物品安全：
					</text>
					<text>
						老年人在出门时要注意保管好随身物品，如钱包、手机、钥匙等贵重物品。尽量避免将所有物品放在一个包内，以免丢失或被盗。
					</text>
				</view>
				<view>
					<text>
						 9. 密切关注身体状况：
					</text>
					<text>
						老年人出门时应该密切关注自身身体状况，如有不适或异常情况，应立即就医或寻求帮助。
					</text>
				</view>
				<view>
					<text>
						 10. 相互照顾和保持联系：
					</text>
					<text>
						老年人出门时如果有伴，可以相互照顾和关心。如果独自外出，要与家人或亲友保持联系，及时报告行踪和动态，以便得到必要的协助和支持。
					</text>
				</view>
			</view>
			<view class="paragraph-image-two">
				<image :src="healthLeaveHomeTipsTwoPng"></image>
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
				healthLeaveHomeTipsOnePng: require("@/static/img/health-leave-home-tips-one.png"),
				healthLeaveHomeTipsTwoPng: require("@/static/img/health-leave-home-tips-two.png")
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
					url: '/healthMonitoringPackage/pages/leaveHome/leaveHome'
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
					width: 296px;
					height: 181px;
				}
			};
			.paragraph-image-two {
				margin: 0 auto;
				margin-top: 10px;
				margin-bottom: 10px;
				>image {
					width: 303px;
					height: 190px;
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
