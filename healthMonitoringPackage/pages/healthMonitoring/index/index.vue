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
					<HM-dragSorts ref="dragSorts" v-if="isDataLoadComplete" :list="showHomeList" :longTouch="true" :autoScroll="true" :feedbackGenerator="true" :listHeight="320" :rowHeight="45" @change="change" @confirm="confirm" @onclick="clickItem" >
						<template #rowContent="{rowData}">
							<view class="list-left">
								<image v-if="rowData.content.type == 0" src="@/static/img/sleep-icon.png"></image>
								<image v-if="rowData.content.type == 1" src="@/static/img/toilet-icon.png"></image>
								<image v-if="rowData.content.type == 2" src="@/static/img/tumble-icon.png"></image>
								<image v-if="rowData.content.type == 3" src="@/static/img/leave-home-icon.png"></image>
								<text class="scene">{{ rowData.content.name }}</text>
								<text class="small-bridge" v-if="rowData.content.mold == 1">-</text>
								<u-input v-model="rowData.content.subtitle"  v-if="rowData.content.mold == 1" @input="suffixClickEvent(rowData.content,rowData.index,true)" type="text" placeholder="请输入场景后缀" :disabled="rowData.content.disabled" />
							</view>
							<view class="list-right">
								<view class="delete-box" @click.stop="deleteEvent(rowData.content,rowData.index,true)" v-if="rowData.content.mold == 1"><image src="@/static/img/delete-icon.png"></image></view>
								<view class="copy-box" @click.stop="copyEvent(rowData.content,rowData.index,true)" v-if="rowData.content.mold == 0"><image src="@/static/img/copy-icon.png"></image></view>
							</view>
						</template>
					</HM-dragSorts>  
				<!-- 	<view class="show-list" v-for="(item,index) in showHomeList" :key="index">
						<view class="list-left">
							<image :src="showImage(item.type)"></image>
							<text class="scene">{{ item.name }}</text>
							<text class="small-bridge" v-if="item.mold == 1">-</text>
							<u-input v-model="item.subtitle"  v-if="item.mold == 1" @input="suffixClickEvent(item,index)" type="text" placeholder="请输入场景后缀" :disabled="item.disabled" />
						</view>
						<view class="list-right">
							<view class="delete-box" @click="deleteEvent(item,index)" v-if="item.mold == 1"><image :src="deleteIconPng"></image></view>
							<view class="copy-box" @click="copyEvent(item,index)" v-if="item.mold == 0"><image :src="copyIconPng"></image></view>
							<view class="move-box"><image :src="menuMoveIconPng"></image></view>
						</view>
					</view> -->
				</view>
			</view>
			<view class="show-home-content no-show-home-content">
				<view class="show-title">
					<text>不显示在首页</text>
				</view>
				<view class="show-list-wrapper">
					<u-empty text="暂无数据" v-if="isShowNoHomeNoData"></u-empty>
					<view class="show-list" v-for="(item,index) in noShowHomeList" :key="index">
						<view class="list-left">
							<image :src="showImage(item.type)"></image>
							<text class="scene">{{ item.name }}</text>
							<text class="small-bridge" v-if="item.mold == 1">-</text>
							<u-input v-if="item.mold == 1" v-model="item.subtitle"  @click="suffixClickEvent(item,index,false)" type="text" placeholder="请输入场景后缀" :disabled="item.disabled" />
						</view>
						<view class="list-right">
							<view class="delete-box"  @click="deleteEvent(item,index,false)" v-if="item.mold == 1"><image :src="deleteIconPng"></image></view>
							<view class="copy-box" @click="copyEvent(item,index,false)" v-if="item.mold == 0"><image :src="copyIconPng"></image></view>
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
	import dragSorts from '@/components/HM-dragSorts/HM-dragSorts.vue'
	import _ from 'lodash'
	export default {
		components: {
			navBar,
			yToast,
			dragSorts
		},
		data() {
			return {
				infoText: '',
				showLoadingHint: false,
				isDataLoadComplete: false,
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
				menuMoveIconPng: require("@/static/img/menu-move-icon.png"),
				list:[
						{"text": "跌倒", "icon": require("@/static/img/tumble-icon.png")},
						{"text": "入厕","icon": require("@/static/img/toilet-icon.png")},
						{"text": "离家回家","icon": require("@/static/img/leave-home-icon.png")},
						{"text": "睡眠","icon": require("@/static/img/sleep-icon.png")}
				]
			}
		},
		onLoad() {
			this.queryHomePageList(this.familyId);
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
				uni.navigateBack()
				// uni.switchTab({
				// 	url: '/pages/index/index'
				// })
			},
			
			showImage (num) {
				console.log('type',num);
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
			suffixClickEvent(item,index,flag) {
				this.showHomeList[index]['subtitle'] = item.subtitle;
				this.showHomeList[index]['disabled'] = item.disabled
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
						this.isDataLoadComplete = true;
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
						title: err.message,
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
			copyEvent (item,index,flag) {
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
			},
			
			// 删除首页数据卡片事件
			deleteEvent (item,index,flag) {
				if (item.status == 0) {
					this.showHomeList.splice(index,1)
				} else if (item.status == 1) {
					this.noShowHomeList.splice(index,1)
				};
				this.delIds.push(item.id)
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
			},
			
			 push(){
					// 和数组的push使用方法一致，可以push单行，也可以push多行
					this.$refs.dragSorts.push({
									"name": "push行",
									"icon": "/static/img/2.png"
							});
			},
			unshit(){
					// 和数组的unshit使用方法一致，可以unshit单行，也可以unshit多行
					this.$refs.dragSorts.unshit({
									"name": "unshit行",
									"icon": "/static/img/2.png"
							});
			},
			splice(){
					// 和数组的unshit使用方法一致 下标1开始删除1个并在下标1位置插入行
					this.$refs.dragSorts.splice(1,1,{
									"name": "splice行",
									"icon": "/static/img/2.png"
							});
			},
			clickItem(e){
					console.log('===  start ===');
					console.log("被点击行: " + JSON.stringify(e.value));
					console.log("被点击下标: " + JSON.stringify(e.index));
					console.log('===  end ===');
			},
			change(e){
					console.log('=== change start ===');
					console.log("被拖动行: " + JSON.stringify(e.moveRow));
					console.log('原始下标：',e.index);
					console.log('移动到：',e.moveTo);
					console.log('=== change end ===');
			},
			confirm(e){
					console.log('=== confirm start ===');
					console.log("被拖动行: " + JSON.stringify(e.moveRow));
					console.log('原始下标：',e.index);
					console.log('移动到：',e.moveTo);
						console.log("整列数据: " + JSON.stringify(e.list));
					console.log('=== confirm end ===');
					this.showHomeList = _.cloneDeep(e.list)
			}
		}
	}
</script>

<style lang="scss">
	@import "~@/common/stylus/variable.scss";
	page {
		width: 100%;
		height: 100%
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
					::v-deep h-m-drag-sorts {
						.HM-drag-sort {
							.modules {
								.scoped-ref {
									display: flex;
									align-items: center;
									justify-content: space-between;
									background: #fff;
									width: 100%;
									height: 45px;
									.list-left {
										display: flex;
										flex: 1;
										align-items: center;
										width: 0;
										::v-deep .u-input {
											padding-right: 10px !important;
											box-sizing: border-box;
										};
										u-input {
											flex: 1;
											font-size: 16px !important;
											color: #898C8C;
										};
										::v-deep .u-input__input {
											flex: 1;
											font-size: 16px !important;
											color: #898C8C;
										};
										>image {
											width: 24px;
											height: 24px;
											vertical-align: middle;
											margin-right: 6px;
										};
										.scene {
											min-width: 40px;
											text-align: center;
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
							width: 0;
							::v-deep .u-input {
								padding-right: 10px !important;
								box-sizing: border-box;
							};
							::v-deep u-input__input {
								flex: 1;
								font-size: 16px !important;
								color: #898C8C;
							};
							>image {
								width: 24px;
								height: 24px;
								vertical-align: middle;
								margin-right: 6px;
							};
							.scene {
								min-width: 40px;
								text-align: center;
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


