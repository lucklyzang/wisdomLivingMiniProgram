<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010"  title="个人信息" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="edit-top">
				<image :src="defaultPersonPhotoIconPng"></image>
				<text @click="changePhotoEvent">更换头像</text>
			</view>
			<view class="edit-bottom">
				<view class="input-area">
					<view class="nice-name-area">
						<text>昵称</text>
						<u-input v-model="niceNameValue" type="text" height="50" placeholder="请输入昵称" border-color="#BBBBBB" :border="true" placeholder-style="color:#101010" />
					</view>
					<view class="birthday-area">
						<text>出生年月</text>
					</view>
					<view class="gender-area">
						<text>性别</text>
						<u-radio-group v-model="gendervalue" @change="radioGroupChange">
							<u-radio
							 active-color="#11D183"
								v-for="(item, index) in genderList" :key="index" 
								:name="item.name"
							>
								{{item.name}}
							</u-radio>
					  </u-radio-group>
					</view>
				</view>
				<view class="btn-area">
					<text @click="completeEvent">完成</text>
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
				niceNameValue: '',
				gendervalue: '男',
				genderList: [
					{
						name: '男'
					},
					{
						name: '女'
					},
					{
						name: '其他'
					}
				],
				defaultPersonPhotoIconPng: require("@/static/img/default-person-photo.png")
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
			
			radioGroupChange(e) {
				// console.log(e);
			},
					
			// 完成事件
			completeEvent () {
				uni.switchTab({
					url: '/pages/personInfo/personInfo'
				})
			},
			
			// 更改头像事件
			changePhotoEvent () {
				
			},
			
			backTo () {
				uni.switchTab({
					url: '/pages/personInfo/personInfo'
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
			flex: 1;
			display: flex;
			flex-direction: column;
			.edit-top {
				height: 30vh;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				>image {
					width: 89px;
					height: 89px;
				};
				>text {
					width: 91px;
					height: 32px;
					display: flex;
					justify-content: center;
					align-items: center;
					border: 1px solid #11D183;
					font-size: 14px;
					margin-top: 6px;
					color: #11D183
				}
			};
			.edit-bottom {
				width: 100%;
				flex: 1;
				background: #F5F5F5;
				padding: 10px;
				box-sizing: border-box;
				width: 100%;
				height: 200px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.input-area {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					>view {
						width: 100%;
						height: 41px;
						background: #fff;
						padding: 0 4px;
						margin-bottom: 10px;
						display: flex;
						padding-left: 10px;
						box-sizing: border-box;
						justify-content: space-between;
						align-items: center;
						>text {
							width: 120px;
							display: inline-block;
							font-size: 14px;
							color: #A7A7A3
						}
					};
					.nice-name-area {
						::v-deep {
							.u-input {
								flex: 1;
								padding-left: 6px !important;
								box-sizing: border-box;
								.u-input__input {
								}
							}
						}
					};
					.gender-area {
						::v-deep {
							.u-radio-group {
								flex: 1;
								.u-radio {
									width: 30% !important
								}
							}
						}
					}
				};
				.btn-area {
					height: 120px;
					display: flex;
					align-items: center;
					justify-content: center;
					>text {
						width: 90%;
						display: inline-block;
						height: 42px;
						text-align: center;
						line-height: 37px;
						border-radius: 4px;
						background: #11D183;
						font-size: 12px;
						color: #fff
					}
				}
			}
		}
	}
</style>





