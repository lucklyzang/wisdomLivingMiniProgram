<template>
	<view class="content-box">
		<u-toast ref="uToast" />
		<y-toast ref="ytoast"></y-toast>
		<ourLoading isFullScreen :active="showLoadingHint"  :translateY="50" :text="infoText" color="#fff" textColor="#fff" background-color="rgb(143 143 143)"/>
		<view class="nav">
			<nav-bar :home="false" backState='3000' bgColor="none" fontColor="#101010" title="编辑数据卡片">
				<view slot="left" @click="backTo">
					<text>取消</text>
				</view>
			</nav-bar> 
		</view>
		<view class="content-area">
			<view class="show-home-content">
				<view class="show-title">
					<text>显示在首页</text>
					<text>点击右侧按钮即可对场景进行删除、复制和排序</text>
				</view>
				<view class="show-list-wrapper">
					<u-empty text="暂无数据" v-if="isShowHomeNoData"></u-empty>
					<view class="show-list" v-else v-for="(item,index) in showHomeList" :key="index">
						<view class="list-left">
							<image :src="showImage(item.type)"></image>
							<text class="scene">{{ item.name }}</text>
							<text class="small-bridge" v-if="item.mold == 1">-</text>
							<u-input v-model="item.subtitle"  v-if="item.mold == 1" @click="suffixClickEvent(item,index)" type="text" placeholder="" :disabled="item.disabled" />
						</view>
						<view class="list-right">
							<view class="delete-box" @click="deleteEvent(item,index)" v-if="item.mold == 1"><image :src="deleteIconPng"></image></view>
							<view class="copy-box" @click="copyEvent(item,index)" v-if="item.mold == 0"><image :src="copyIconPng"></image></view>
							<view class="move-box"><image :src="menuMoveIconPng"></image></view>
						</view>
					</view>
				</view>
			</view>
			<view class="show-home-content no-show-home-content">
				<view class="show-title">
					<text>不显示在首页</text>
				</view>
				<view class="show-list-wrapper">
					<u-empty text="暂无数据" v-if="isShowNoHomeNoData"></u-empty>
					<view class="show-list" v-else v-for="(item,index) in noShowHomeList" :key="index">
						<view class="list-left">
							<image :src="showImage(item.type)"></image>
							<text class="scene">{{ item.name }}</text>
							<text class="small-bridge" v-if="item.mold == 1">-</text>
							<u-input v-if="item.mold == 1" v-model="item.subtitle"  @click="suffixClickEvent(item,index)" type="text" placeholder="" :disabled="item.disabled" />
						</view>
						<view class="list-right">
							<view class="delete-box"  @click="deleteEvent(item,index)" v-if="item.mold == 1"><image :src="deleteIconPng"></image></view>
							<view class="copy-box" @click="copyEvent(item,index)" v-if="item.mold == 0"><image :src="copyIconPng"></image></view>
							<view class="move-box"><image :src="menuMoveIconPng"></image></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-area">
			<view class="btn-area" @click="saveEvent">
				<text>保存</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import yToast from "@/components/y-toast/y-toast.vue"
	import { getHomePageList, deleteHomePage, saveOrUpdateHomePage } from '@/api/home.js'
	import navBar from "@/components/zhouWei-navBar"
	export default {
		components: {
			navBar,
			yToast
		},
		data() {
			return {
				infoText: '',
				showLoadingHint: false,
				isShowHomeNoData: false,
				isShowNoHomeNoData: false,
				value: '',
				delIds: [],
				noShowHomeList: [],
				showHomeList: [],
				sleepIconPng: require("@/static/img/sleep-icon.png"),
				toiletIconPng: require("@/static/img/toilet-icon.png"),
				tumbleIconPng: require("@/static/img/tumble-icon.png"),
				leaveHomeIconPng: require("@/static/img/leave-home-icon.png"),
				copyIconPng: require("@/static/img/copy-icon.png"),
				deleteIconPng: require("@/static/img/delete-icon.png"),
				menuMoveIconPng: require("@/static/img/menu-move-icon.png")
			}
		},
		onLoad() {
			this.queryHomePageList(this.familyId)
		},
		computed: {
			...mapGetters([
				'userInfo',
				'familyId'
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
				'changeOverDueWay'
			]),
			
			backTo () {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			
			showImage (num) {
				if (num == 0) {
					return this.sleepIconPng
				} else if (num == 1) {
					return this.toiletIconPng
				} else if (num == 2) {
					return this.tumbleIconPng
				} else if (num == 3) {
					return this.leaveHomeIconPng
				}
			},
			
			// 后缀名点击事件
			suffixClickEvent(item,index) {
				item.disabled = item.disabled
			},
			
			// 获取首页配置列表
			queryHomePageList (familyId) {
				this.showLoadingHint = true;
				this.infoText = '加载中...';
				this.showHomeList = [];
				this.noShowHomeList = [];
				getHomePageList({familyId}).then((res) => {
					if ( res && res.data.code == 0) {
						this.showHomeList = res.data.data.filter((item) => { return item.status == 0 });
						this.showHomeList.forEach((el) => { el.disabled = false });
						if (this.showHomeList.length == 0) {
							this.isShowHomeNoData = true
						} else {
							this.isShowHomeNoData = false
						};
						this.noShowHomeList = res.data.data.filter((item) => { return item.status == 1 });
						this.noShowHomeList.forEach((el) => { el.disabled = false });
						if (this.noShowHomeList.length == 0) {
							this.isShowNoHomeNoData = true
						} else {
							this.isShowNoHomeNoData = false
						};
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error',
							position: 'bottom'
						})
					};
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
			
			// 创建或更新首页配置列表
			saveOrUpdateHomePageEvent (familyId) {
				this.showLoadingHint = true;
				this.infoText = '保存中...';
				this.familyList = [];
				let temporaryData = this.showHomeList.concat(this.noShowHomeList);
				let neenParams = {
					updateReqVOS: temporaryData,
					delIds: this.delIds
				};
				saveOrUpdateHomePage(neenParams).then((res) => {
					if ( res && res.data.code == 0) {
						this.queryHomePageList(this.familyId);
						this.delIds = [];
						this.$refs['ytoast'].show({ message: '保存成功!', type: 'success' })
					} else {
						this.$refs['ytoast'].show({ message: '保存失败!', type: 'error' })
					};
					this.showLoadingHint = false
				})
				.catch((err) => {
					this.showLoadingHint = false;
					this.$refs['ytoast'].show({ message: '保存失败!', type: 'error' })
				})
			},
			
			// 复制事件
			copyEvent (item,index) {
				// status: 0-正常 1-停用
				console.log('打印数据',item);
				if (item.status == 0) {
					let insertMessage = {
						createTime: new Date().getTime(),
						disabled: false,
						familyId: this.familyId,
						id: 0,
						mold: 1,
						name: item.name,
						sort: index + 1,
						status: 0,
						subtitle: '',
						type: item.type,
						userId: this.userInfo.userId
					};
					let temporaryLength = this.showHomeList.filter((el) => { return el.name == item.name}).length;
					insertMessage['subtitle'] = `场景${temporaryLength}`;
					this.showHomeList.splice(index + 1, 0, insertMessage);
				} else if (item.status == 1) {
					let insertMessage = {
						createTime: new Date().getTime(),
						disabled: false,
						familyId: this.familyId,
						id: 0,
						mold: 1,
						name: item.name,
						sort: index + 1,
						status: 1,
						subtitle: '',
						type: item.type,
						userId: this.userInfo.userId
					};
					let temporaryLength = this.noShowHomeList.filter((el) => { return el.name == item.name}).length;
					insertMessage['subtitle'] = `场景${temporaryLength}`;
					this.noShowHomeList.splice(index + 1, 0, insertMessage);
				}
				// this.saveOrUpdateHomePageEvent(id)
			},
			
			// 删除首页数据卡片事件
			deleteEvent (item,index) {
				if (item.status == 0) {
					this.showHomeList.splice(index,1)
				} else if (item.status == 1) {
					this.noShowHomeList.splice(index,1)
				};
				this.delIds.push(item.id)
				// this.showLoadingHint = true;
				// this.infoText = '删除中...';
				// deleteHomePage({id}).then((res) => {
				// 	if ( res && res.data.code == 0) {
				// 		this.$refs.uToast.show({
				// 			title: '删除成功',
				// 			type: 'success',
				// 			position: 'bottom'
				// 		});
				// 		this.queryHomePageList(this.familyId)
				// 	} else {
				// 		this.$refs.uToast.show({
				// 			title: res.data.msg,
				// 			type: 'error',
				// 			position: 'bottom'
				// 		})
				// 	}	
				// 	this.showLoadingHint = false;
				// })
				// .catch((err) => {
				// 	this.showLoadingHint = false;
				// 	this.$refs.uToast.show({
				// 		title: err,
				// 		type: 'error',
				// 		position: 'bottom'
				// 	})
				// })
			},
			
			
			// 数据类型转换
			dataTypeTransition (num) {
				switch(num) {
					case '睡眠' :
						return 0
						break;
					case '入厕' :
						return 1
						break;
					case '跌倒' :
						return 2
						break;
					case '离/回家' :
						return 3
						break
				}
			},
			
			// 数据类型转换文本
			dataTypeTransitionText(num) {
				let temporaryNum = num.toString();
				switch(temporaryNum) {
					case 0 :
						return '睡眠'
						break;
					case 1 :
						return '入厕'
						break;
					case 2 :
						return '跌倒'
						break;
					case 3 :
						return '离/回家'
						break
				}
			},
			
			// 保存事件
			saveEvent () {
				this.saveOrUpdateHomePageEvent()
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
			.header_content {
				.header_left_box {
					>view {
						width: 100px;
						padding-left: 16px;
						box-sizing: border-box;
						font-size: 16px;
						color: #101010
					}
				}
			}
		};
		.content-area {
			padding: 10px;
			background: #f5f5f5;
			box-sizing: border-box;
			flex: 1;
			overflow: auto;
			.show-home-content {
				.show-title {
					display: flex;
					flex-direction: column;
					>text {
						&:first-child {
							font-size: 18px;
							color: #101010
						};
						&:last-child {
							font-size: 14px;
							color: #101010;
							margin: 10px 0
						}
					}
				};
				.show-list-wrapper {
					min-height: 200px;
					position: relative;
					::v-deep .u-empty {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%,-50%)
					};
					.show-list {
						display: flex;
						padding: 0 6px;
						align-items: center;
						justify-content: space-between;
						background: #fff;
						margin-bottom: 8px;
						width: 100%;
						height: 46px;
						&:last-child {
							margin-bottom: 0 !important;
						};
						.list-left {
							display: flex;
							flex: 1;
							align-items: center;
							::v-deep .u-input {
								padding-right: 10px !important;
								box-sizing: border-box;
								.u-input__input {
									font-size: 16px !important;
									color: #898C8C;
								}
							};
							>image {
								width: 24px;
								height: 24px;
								vertical-align: middle;
								margin-right: 10px;
							};
							.scene {
								color: #101010;
							};
							>text {
								font-size: 16px;
								vertical-align: middle
							}
						};
						.list-right {
							display: flex;
							justify-content: flex-end;
							>view {
								margin-right: 24px;
								position: relative;
								image {
									width: 20px;
									height: 20px;
									vertical-align: middle
								}
							};
							.delete-box::after {
								content: "";
								position: absolute;
								top: 2px;
								right: -13px;
								width: 1px;
								height: 22px;
								background: #BBBBBB
							};
							.copy-box::after {
								content: "";
								position: absolute;
								top: 2px;
								right: -13px;
								width: 1px;
								height: 22px;
								background: #BBBBBB
							};
							.move-box {
								margin-right: 0 !important
							}
						}
					}
				}
			};
			.no-show-home-content {
				.show-title {
					display: flex;
					flex-direction: column;
					>text {
						&:first-child {
							font-size: 18px;
							color: #101010
						}
					}
				}
			}
		};
		.bottom-area {
			background: #f5f5f5;
			height: 120px;
			display: flex;
			justify-content: center;
			align-items: center;
			.btn-area {
				border-radius: 26px;
				width: 266px;
				height: 48px;
				background: #11D183;
				box-shadow: 0px 2px 6px 0 rgba(92, 133, 136, 0.29);
				font-size: 16px;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
			}	
		}
	}
</style>


