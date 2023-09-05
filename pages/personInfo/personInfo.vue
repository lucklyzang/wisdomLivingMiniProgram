<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="top-area-box">
			<image :src="loginBackgroundPng"></image>
			<view class="user-info">
				<view class="user-photo" @click="enterPersonMessagePageEvent">
					<image :src="personPhotoSource"></image>
				</view>
				<view class="user-nickname">
					<text>{{ niceNameValue }}</text>
					<text>{{ `${deviceNumber}个智能设备` }}</text>
				</view>
			</view>
		</view>
		<view class="center-area-box">
			<view v-for="(item,index) in functionList" :key="index">
				<image :src="item.iconImg"></image>
				<text>{{ item.name }}</text>
			</view>
		</view>
		<view class="bottom-area-box">
			<view v-for="(item,index) in bottomFunctionList" :key="index" @click="bottomFunctionClickEvent(item.name)">
				<view class="function-item-left">
					<image :src="item.iconImg"></image>
					<text>{{ item.name }}</text>
				</view>
				<view class="function-item-right">
					<u-icon name="arrow-right" color="#737373" size="36"></u-icon>
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
	import {
		setCache,
		removeAllLocalStorage
	} from '@/common/js/utils'
	import { getUserMessage, getUserDeviceCount } from '@/api/user.js'
	export default {
		data() {
			return {
				loginBackgroundPng: require("@/static/img/login-background.png"),
				defaultPersonPhotoIconPng: require("@/static/img/default-person-photo.png"),
				infoText: '',
				showLoadingHint: false,
				deviceNumber: 0,
				personPhotoSource: '',
				niceNameValue: '张三',
				functionList: [
					{
						name: '上门护理',
						iconImg: require("@/static/img/home-care.png")
					},
					{
						name: '全屋适老化改造',
						iconImg: require("@/static/img/house-reconstruction.png")
					},
					{
						name: '慢病管理',
						iconImg: require("@/static/img/chronic-care-management.png")
					}
				],
				bottomFunctionList: [
					{
						name: '通用设置',
						iconImg: require("@/static/img/common-set.png")
					},
					{
						name: '家庭管理',
						iconImg: require("@/static/img/household-operation.png")
					},
					{
						name: '帮助与反馈',
						iconImg: require("@/static/img/help-feedback.png")
					},
					{
						name: '关于APP',
						iconImg: require("@/static/img/about.png")
					}
				]
			}
		},
		computed: {
			...mapGetters([
				'userBasicInfo'
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
		onLoad() {
			// 初次进入该页面时，查询用户基本信息
			if (!this.userBasicInfo) {
				this.queryUserBasicMessage()
			} else {
				this.personPhotoSource = !this.userBasicInfo.avatar ? this.defaultPersonPhotoIconPng : this.userBasicInfo.avatar;
				this.niceNameValue = !this.userBasicInfo.nickname ? this.niceNameValue : this.userBasicInfo.nickname
			};
			// 获取用户设备数量
			this.queryUserDeviceNumber()
		},
		methods: {
			...mapMutations([
				'changeUserBasicInfo',
				'changeEnterFamilyManagementPageSource'
			]),
			
			// 头像点击事件
			enterPersonMessagePageEvent () {
				uni.redirectTo({
					url: '/generalSetPackage/pages/privateInfo/privateInfo'
				})
			},
			
			// 获取用户基本信息
			queryUserBasicMessage () {
				this.showLoadingHint = true;
				this.infoText = '加载中...';
				getUserMessage().then((res) => {
					if ( res && res.data.code == 0) {
						this.changeUserBasicInfo(res.data.data);
						this.personPhotoSource = !this.userBasicInfo.avatar ? this.defaultPersonPhotoIconPng :  this.userBasicInfo.avatar;
						this.niceNameValue = !this.userBasicInfo.nickname ? this.niceNameValue : this.userBasicInfo.nickname
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error',
							position: 'bottom'
						})
					}	
					this.showLoadingHint = false;
				})
				.catch((err) => {
					this.showLoadingHint = false;
					this.$refs.uToast.show({
						title: err,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			// 获取用户设备数量
			queryUserDeviceNumber () {
				getUserDeviceCount().then((res) => {
					if ( res && res.data.code == 0) {
						this.deviceNumber = res.data.data
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error',
							position: 'bottom'
						})
					}	
					this.showLoadingHint = false;
				})
				.catch((err) => {
					this.showLoadingHint = false;
					this.$refs.uToast.show({
						title: err,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			// 底部功能区点击事件
			bottomFunctionClickEvent (name) {
				if (name == '帮助与反馈') {
					uni.redirectTo({
						url: '/generalSetPackage/pages/generalSet/index/index'
					})
				} else if (name == '关于APP') {
					uni.redirectTo({
						url: '/generalSetPackage/pages/aboutApp/aboutApp'
					})
				} else if (name == '家庭管理') {
					uni.redirectTo({
						url: '/generalSetPackage/pages/familyManagement/familyManagement'
					});
					this.changeEnterFamilyManagementPageSource('/pages/personInfo/personInfo')
				} else if (name == '通用设置') {
					uni.redirectTo({
						url: '/generalSetPackage/pages/generalSetting/generalSetting'
					})
				}
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
			.user-info {
				width: 100%;
				height: 30vh;
				display: flex;
				align-items: center;
				color: #fff;
				font-size: 20px;
				padding-left: 10px;
				box-sizing: border-box;
				.user-photo {
					width: 76px;
					height: 76px;
					background: #fff;
					margin-right: 15px;
					border-radius: 50%;
					z-index:1;
					image {
						width: 76px;
						height: 76px;
						border-radius: 50%;
					}
				}
			};
			.user-nickname {
				display: flex;
				flex-direction: column;
				justify-content: center;
				flex: 1;
				padding-right: 10px;
				box-sizing: border-box;
				z-index: 1;
				@include no-wrap;
				>text {
					&:last-child {
						font-size: 14px;
						color: #EDEDED;
						margin-top: 10px
					}
				}
			}
		};
		.center-area-box {
			width: 90%;
			height: 131px;
			margin: 0 auto;
			border-radius: 10px;
			margin-top: 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 0px 2px 6px 0 rgba(92, 133, 136, 0.29);
			>view {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				>image {
					width: 58px;
					height: 58px;
					margin-bottom: 10px
				};
				>text {
					color: #101010;
					font-size: 14px
				}
			}
		};
		.bottom-area-box {
			width: 90%;
			margin: 0 auto;
			padding: 0 2px;
			box-sizing: border-box;
			margin-top: 20px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			// flex: 1;
			overflow: auto;
			flex-grow: 0;
			>view {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 40px;
				margin-bottom: 20px;
				.function-item-left {
					>image {
						width: 24px;
						height: 24px;
						margin-right: 6px;
						vertical-align: middle
					};
					>text {
						color: #101010;
						font-size: 14px;
						vertical-align: middle
					}
				};
				.function-item-right {
					
				}
			}
		}
	}
</style>
