<template>
	<view class="content-box">
		<view class="top-area-box">
			<image :src="loginBackgroundPng"></image>
			<view class="operation-area">
				<view class="operation-top-area">
					<view class="image-area">
						<image :src="messageIconPng" @click="enterMessagePageDetails"></image>
						<image :src="addDeviceIconPng" @click="addDeviceEvent"></image>
					</view>
					<view class="dropdown-area">
						<xfl-select
							:list="familyMemberList"
							:clearable="false"
							:showItemNum="8"
							 @change="familyMemberChange"
							placeholder = "请选择家庭"
							:selectHideType="'hideAll'"
						>
						</xfl-select>
					</view>
				</view>
			</view>
			<view class="cut-title-area">
				<text v-for="(item,index) in tabCutList" :class="{'activeTabStyle' : tabCutActiveIndex == index }" @click="tabCutEvent(item,index)" :key="index">{{ item }}</text>
			</view>
		</view>
		<view class="center-content-area">
			<view class="device-content-area" v-if="tabCutActiveIndex == 0">
				<view class="device-list" v-for="(item,index) in deviceList" :key="index">
					<view class="device-top">
						<view class="device-top-left">
							<image :src="item.imageUrl"></image>
							<text>{{ item.roomName }}</text>
						</view>
						<view class="device-top-right">
							<text>在线</text>
						</view>
					</view>
					<view class="device-bottom">
						<text>
							{{ item.deviceName }}
						</text>
					</view>
				</view>
			</view>
			<view class="room-content-area" v-if="tabCutActiveIndex == 1">
				<view class="room-list" v-for="(item,index) in roomList" :key="index">
					<view class="room-left">
						<view class="room-left-top">
							<text>{{ item.roomName }}</text>
							<text>4个设备</text>
						</view>
						<view class="room-left-bottom">
							<image :src="item.imageUrl"></image>
							<image :src="item.imageUrl"></image>
						</view>
					</view>
					<view class="room-right">
						<u-icon name="arrow-right" color="#737373" size="30"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import xflSelect from '@/components/xfl-select/xfl-select.vue';
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import {
		setCache,
		removeAllLocalStorage
	} from '@/common/js/utils'
	export default {
		components: {
			xflSelect
		},
		data() {
			return {
				familyMemberList: [
					{
						id: 1,
						value: '张三的家'
					},
					{
						id: 2,
						value: '李四的家'
					},
					{
						id: 3,
						value: '王强的家'
					},
					{
						iconPath: require("@/static/img/family-management-icon.png"),
						value: '家庭管理',
						isClickNoEffect: true
					}
				],
				tabCutList: ['设备','房间'],
				deviceList: [
					{
						roomName: '客厅',
						deviceName: '跌倒监测雷达',
						imageUrl: require("@/static/img/room-icon.png")
					},
					{
						roomName: '卫生间',
						deviceName: '跌倒监测雷达',
						imageUrl: require("@/static/img/room-icon.png")
					},
					{
						roomName: '主卧',
						deviceName: '人员存在感知雷达',
						imageUrl: require("@/static/img/room-icon.png")
					},
					{
						roomName: '大门',
						deviceName: '人员存在感知雷达',
						imageUrl: require("@/static/img/room-icon.png")
					},
					{
						roomName: '客厅',
						deviceName: '跌倒监测雷达',
						imageUrl: require("@/static/img/room-icon.png")
					},
					{
						roomName: '卫生间',
						deviceName: '跌倒监测雷达',
						imageUrl: require("@/static/img/room-icon.png")
					},
					{
						roomName: '主卧',
						deviceName: '人员存在感知雷达',
						imageUrl: require("@/static/img/room-icon.png")
					},
					{
						roomName: '大门',
						deviceName: '人员存在感知雷达',
						imageUrl: require("@/static/img/room-icon.png")
					},
					{
						roomName: '客厅',
						deviceName: '跌倒监测雷达',
						imageUrl: require("@/static/img/room-icon.png")
					},
					{
						roomName: '卫生间',
						deviceName: '跌倒监测雷达',
						imageUrl: require("@/static/img/room-icon.png")
					},
					{
						roomName: '主卧',
						deviceName: '人员存在感知雷达',
						imageUrl: require("@/static/img/room-icon.png")
					},
					{
						roomName: '大门',
						deviceName: '人员存在感知雷达',
						imageUrl: require("@/static/img/room-icon.png")
					}
				],
				roomList: [
					{
						roomName: '客厅',
						deviceName: '跌倒监测雷达',
						imageUrl: require("@/static/img/room-icon.png")
					},
					{
						roomName: '卫生间',
						deviceName: '跌倒监测雷达',
						imageUrl: require("@/static/img/room-icon.png")
					},
					{
						roomName: '主卧',
						deviceName: '人员存在感知雷达',
						imageUrl: require("@/static/img/room-icon.png")
					},
					{
						roomName: '大门',
						deviceName: '人员存在感知雷达',
						imageUrl: require("@/static/img/room-icon.png")
					}
				],
				tabCutActiveIndex: 0,
				loginBackgroundPng: require("@/static/img/login-background.png"),
				messageIconPng: require("@/static/img/message-icon.png"),
				addDeviceIconPng: require("@/static/img/add-device-icon.png")
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
			
			// 家庭选择下拉框下拉选择确定事件
			familyMemberChange (val) {
				console.log(val)
				if (val.orignItem.isClickNoEffect) {
					console.log('家庭管理');
				}
			},
			
			// 家庭下拉框下拉确定事件
			chooseFamilyMemberEvent () {
			},
			
			// tab切换点击事件
			tabCutEvent (item,index) {
				this.tabCutActiveIndex = index
			},
			
			// 进入消息详情页
			enterMessagePageDetails () {
				uni.redirectTo({
					url: '/devicePackage/pages/device/index/index'
				})
			},
			
			// 添加设备事件
			addDeviceEvent () {
				uni.redirectTo({
					url: '/devicePackage/pages/addDevices/addDevices'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "~@/common/stylus/variable.scss";
	page {
		width: 100%;
		height: 100vh;
	};
	.content-box {
		@include content-wrapper
		.top-area-box {
			position: relative;
			width: 100%;
			height: 230px;
			> image {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 230px
			};
			.operation-area {
				width: 90%;
				margin: 0 auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				z-index: 1;
				margin-top: 6vh;
				position: relative;
				.operation-top-area {
					width: 100%;
					display: flex;
					align-items: center;
					.image-area {
						image {
							width: 29px;
							height: 29px;
							&:first-child {
								margin-right: 20px
							}
						}
					};
					.dropdown-area {
						width: 100px;
						transform: translateX(50%);
						::v-deep .show-box {
							border: none !important;
							color: #fff !important;
							background: transparent !important;
							.input {
								@include no-wrap;
								display: inline-block;
								line-height: 42px;
								padding-right: 4px;
								box-sizing: border-box;
								text-align: center !important;
							};
							.list {
								color: #101010;
							};
							.list-container {
								width: 150px !important;
								top: -10px;
								.popper__arrow {
									display: none !important;
								}
							};
							.placeholder {
								color: #fff !important
							};
							.right-arrow {
								color: #fff !important
							}
						}
					}
				}
			};
			.cut-title-area {
				width: 30%;
				margin: 0 auto;
				font-size: 14px;
				color: #898C8C;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 40px;
				.activeTabStyle {
					font-size: 16px !important;
					color: #fff !important
				}
			}
		};
		.center-content-area {
			width: 98%;
			margin: 0 auto;
			flex: 1;
			overflow: auto;
			.device-content-area {
				width: 98%;
				padding: 10px;
				box-sizing: border-box;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.device-list {
					width: 47%;
					height: 102px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-bottom: 10px;
					border-radius: 10px;;
					box-shadow: 0px 2px 6px 0 rgba(0, 0, 9, 0.1);
					padding: 6px 10px;
					box-sizing: border-box;
					.device-top {
						display: flex;
						justify-content: space-between;
						.device-top-left {
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							>image {
								width: 34px;
								height: 42px;
							};
							>text {
								font-size: 12px;
								color: #BBBBBB
							}
						};
						.device-top-right {
							>text {
								font-size: 14px;
								color: #BBBBBB
							};
							.onLineStyle {
								coloe: #0079FF !important
							}
						}
					};
					.device-bottom {
						@include no-wrap;
						text {
							font-size: 14px;
							color: #101010
						}
					}
				}
			};
			.room-content-area {
				width: 98%;
				padding: 10px;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				margin-top: -40px;
				position: absolute;
				flex-grow: 0;
				.room-list {
					display: flex;
					height: 110px;
					justify-content: space-between;
					margin-bottom: 10px;
					border-radius: 10px;;
					box-shadow: 0px 2px 6px 0 rgba(0, 0, 9, 0.1);
					padding: 10px;
					box-sizing: border-box;
					background: #fff;
					.room-left {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.room-left-top {
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							>text {
								&:first-child {
									font-size: 14px;
									color: #101010;
									margin-bottom: 4px;
								};
								&:last-child {
									font-size: 12px;
									color: #BBBBBB
								}
							}
						};
						.room-left-bottom {
							>image {
								width: 34px;
								height: 42px;
								margin-right: 4px
							}
						}
					};
					.room-right {
						display: flex;
						align-items: center;
					}
				}
			}
		}
	}
</style>

