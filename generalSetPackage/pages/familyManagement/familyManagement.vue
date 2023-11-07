<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010"  title="家庭管理" @backClick="backTo">
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="content-top">
				<u-empty text="暂无数据" v-if="isShowNoData"></u-empty>
				<view class="family-list" v-for="(item,index) in familyList" :key="index">
					<view class="list-left">
						<text>{{ item.value }}</text>
					</view>
					<view class="list-right">
						<image :src="editGreenIconPng" @click="editEvent(item)"></image>
						<image :src="deleteRedSquareIconPng" @click="deleteEvent(item.id)"></image>
					</view>
				</view>
			</view>
			<view class="content-bottom-area">
				<view class="content-bottom" @click="addEvent">
					<u-icon name="plus" color="#11D183" size="50"></u-icon>
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
	import { deleteUserFamily } from '@/api/user.js'
	import { getUserFamilyList } from '@/api/user.js'
	import _ from 'lodash'
	export default {
		components: {
			navBar
		},
		data() {
			return {
				infoText: '加载中...',
				isShowNoData: false,
				familyList: [],
				editGreenIconPng: require("@/static/img/edit-green-icon.png"),
				deleteRedSquareIconPng: require("@/static/img/delete-red-square-icon.png"),
				showLoadingHint: false
			}
		},
		onShow(){
			// 接收uni.navigateBack返回时的参数
			uni.$on('update', (object) => {
				this.initFamilyInfo()
			})
		},
		onLoad() {
			this.initFamilyInfo()
		},
		computed: {
			...mapGetters([
				'userInfo',
				'familyMessage',
				'enterFamilyManagementPageSource'
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
		methods: {
			...mapMutations([
				'changeOverDueWay',
				'changeFamilyMessage',
				'changeFamilyId'
			]),
			
			// 初始家庭信息
			initFamilyInfo () {
				this.familyList = [];
				this.familyList = _.cloneDeep(this.familyMessage.familyMemberList)
			},
			
			// 编辑事件
			editEvent (item) {
				let mynavData = JSON.stringify(item);
				uni.navigateTo({
					url: '/generalSetPackage/pages/editFamily/editFamily?transmitData='+mynavData
				})
			},
			
			// 添加事件
			addEvent () {
				uni.navigateTo({
					url: '/generalSetPackage/pages/addFamily/addFamily'
				})
			},
			
			// 获取用户家庭列表
			queryUserFamilyList () {
				let familyMemberList = [];
				let fullFamilyMemberList = [];
				getUserFamilyList().then((res) => {
					if ( res && res.data.code == 0) {
						fullFamilyMemberList = res.data.data;
						for (let item of res.data.data) {
							familyMemberList.push({
								id: item.id,
								value: item.name
							})
						};
						this.changeFamilyId(familyMemberList[0]['id']);
						let temporaryFamilyMessage = this.familyMessage;
						temporaryFamilyMessage['familyMemberList'] = familyMemberList;
						temporaryFamilyMessage['fullFamilyMemberList'] = fullFamilyMemberList;
						this.changeFamilyMessage(temporaryFamilyMessage);
						this.initFamilyInfo()
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error',
							position: 'bottom'
						})
					}
				})
				.catch((err) => {
					this.$refs.uToast.show({
						title: err.message,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			// 删除事件
			deleteEvent (id) {
				this.showLoadingHint = true;
				this.infoText = '删除中...';
				deleteUserFamily({id}).then((res) => {
					if ( res && res.data.code == 0) {
						this.$refs.uToast.show({
							title: '删除成功',
							type: 'success',
							position: 'bottom'
						});
						this.queryUserFamilyList()
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
						title: err.message,
						type: 'error',
						position: 'bottom'
					})
				})
			},
			
			backTo () {
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
			flex: 1;
			background: #F5F5F5;
			padding: 20px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			overflow: auto;
			.content-top {
				width: 100%;
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				.family-list {
					width: 100%;
					margin-bottom: 10px;
					padding: 0 10px;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 53px;
					background: #fff;
					border-radius: 10px;
					box-shadow: 0px 2px 6px 0px rgba(92,133,136,.26);
					.list-left {
						font-size: 16px;
						color: #101010;
						vertical-align: middle;
					};
					.list-right {
						>image {
							width: 24px;
							height: 24px;
							vertical-align: middle;
							&:first-child {
								margin-right: 10px
							}
						}
					}
				}
			};
			.content-bottom-area {
				width: 100%;
				height: 100px;
				display: flex;
				align-items: center;
				justify-content: center;
				.content-bottom {
					width: 100%;
					height: 53px;
					border: 1px solid #11D183;
					border-radius: 29px;
					display: flex;
					align-items: center;
					justify-content: center
				}
			}	
		}
	}
</style>





