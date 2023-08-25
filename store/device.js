import { getDefaultDeviceState } from '@/common/js/resetStore/resetStore.js'
export default {
  state: getDefaultDeviceState(),
  getters:{
		timeMessage: state => state.timeMessage,
		ossMessage: state => state.ossMessage,
		enterAddRoomPageSource: state => state.enterAddRoomPageSource,
		enterDeviceSetPageSource: state => state.enterDeviceSetPageSource,
		enterFamilyManagementPageSource: state => state.enterFamilyManagementPageSource,
		familyId: state => state.familyId,
		beforeAddDeviceMessage: state => state.beforeAddDeviceMessage,
		beforeAddBodyDetectionDeviceMessage: state => state.beforeAddBodyDetectionDeviceMessage,
		roomDetails: state => state.roomDetails
  },
  mutations:{
		changeTimeMessage (state, playLoad) {
			state.timeMessage = playLoad
		},
		changeOssMessage (state, playLoad) {
			state.ossMessage = playLoad
		},
		changeFamilyId (state, playLoad) {
			state.familyId = playLoad
		},
		changeEnterAddRoomPageSource (state, playLoad) {
			state.enterAddRoomPageSource = playLoad
		},
		changeEnterDeviceSetPageSource (state, playLoad) {
			state.enterDeviceSetPageSource = playLoad
		},
		changeEnterFamilyManagementPageSource (state, playLoad) {
			state.enterFamilyManagementPageSource = playLoad
		},
		// 保存添加设备前选择的房间和自定义设备名称信息
		changeBeforeAddDeviceMessage (state, playLoad) {
			state.beforeAddDeviceMessage = playLoad
		},
		// 保存添加人体检测设备前选择的房间和自定义设备名称信息
		changeBeforeAddBodyDetectionDeviceMessage (state, playLoad) {
			state.beforeAddBodyDetectionDeviceMessage = playLoad
		},
		// 保存房间详情信息
		changeRoomDetails (state, playLoad) {
			state.roomDetails = playLoad
		},
		//重置设备的状态
		resetDeviceInfoState(state) {
				Object.assign(state, getDefaultDeviceState())
		}
  },
  actions: {
		resetDeviceState({ commit }) {
				commit('resetDeviceInfoState')
		}
	}
}