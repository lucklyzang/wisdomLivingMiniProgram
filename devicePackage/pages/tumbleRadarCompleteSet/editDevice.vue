<<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="更多" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="set-list-area">
				<view class="set-list">
					<view class="set-list-left">
						<text>设备编号</text>
					</view>
					<view class="set-list-right">
						<text>65885555LA45266Y00002</text>
					</view>
				</view>
				<view class="set-list">
					<view class="set-list-left">
						<text>设备</text>
					</view>
					<view class="set-list-right">
						<text>跌倒检测雷达</text>
					</view>
				</view>
				<view class="set-list edit-device-name">
					<view class="set-list-left">
						<text>名称</text>
					</view>
					<view class="set-list-right">
						<u-form ref="uForm">
							<u-form-item>
								<u-input v-model="deviceNameValue" height="50" placeholder="请输入设备名称" />
							</u-form-item>
						</u-form>
					</view>
				</view>
				<view class="set-list">
					<view class="set-list-left">
						<text>操作手册</text>
					</view>
					<view class="set-list-right">
						<u-icon name="arrow-right" size="40" color="#0E2442"></u-icon>
					</view>
				</view>
				<view class="set-list">
					<view class="set-list-left">
						<text>解绑设备</text>
					</view>
					<view class="set-list-right">
						<u-icon name="arrow-right" size="40" color="#0E2442"></u-icon>
					</view>
				</view>
				<view class="set-list device-room">
					<view class="set-list-left">
						<text>设备房间</text>
					</view>
					<view class="set-list-right">
						<text>主卧</text>
						<u-icon name="arrow-right" size="40" color="#0E2442"></u-icon>
					</view>
				</view>
				<view class="set-list device-room">
					<view class="set-list-left">
						<text>网络状态</text>
					</view>
					<view class="set-list-right">
						<text>在线</text>
						<u-icon name="arrow-right" size="40" color="#0E2442"></u-icon>
					</view>
				</view>
			</view>
			<view class="bottom-btn">
				<text @click="saveEvent">保存</text>
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
				deviceNameValue: '',
				checked: false,
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
			
			// 保存事件
			saveEvent () {
				this.$refs.uToast.show({
					title: '保存成功!',
					type: 'error'
				})
			},
			
			backTo () {
				uni.redirectTo({
					url: '/devicePackage/pages/tumbleRadarCompleteSet/completeSet'
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
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 40px;
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
					.set-list-right {
						flex: 1;
						padding-left: 10px;
						box-sizing: border-box;
						text-align: right;
						@include no-wrap
					}
				};
				.edit-device-name {
					.set-list-right {
						flex: none !important;
						width: 70% !important;
						::v-deep .u-form {
							.u-form-item {
								border: 1px solid #BBBBBB;
								border-radius: 4px;
								padding: 2px 8px !important
							}
						}
					}
				};
				.device-room {
					.set-list-right {
						display: flex;
						justify-content: flex-end;
						align-items: center;
						>text {
							margin-right: 2px
						}
					}
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






