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
		beforeAddExistPerceptionRadarCompleteSet: state => state.beforeAddExistPerceptionRadarCompleteSet,
		beforeAddSignMonitorRadarCompleteSet: state => state.beforeAddSignMonitorRadarCompleteSet,
		roomDetails: state => state.roomDetails,
		warningMessagePhoneNumber: state => state.warningMessagePhoneNumber,
		currentNeedBindDevicesMessage: state => state.currentNeedBindDevicesMessage,
		deviceNoticeDetails: state => state.deviceNoticeDetails,
		familyMessage: state => state.familyMessage
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
		// 保存添加人员存在感知设备前选择的房间和自定义设备名称信息
		changeBeforeAddExistPerceptionRadarCompleteSet (state, playLoad) {
			state.beforeAddExistPerceptionRadarCompleteSet = playLoad
		},
		// 保存体征监测设备前选择的房间和自定义设备名称信息
		changeBeforeAddSignMonitorRadarCompleteSet (state, playLoad) {
			state.beforeAddSignMonitorRadarCompleteSet = playLoad
		},
		// 保存房间详情信息
		changeRoomDetails (state, playLoad) {
			state.roomDetails = playLoad
		},
		// 保存报警手机号信息
		changeWarningMessagePhoneNumber (state, playLoad) {
			state.warningMessagePhoneNumber = playLoad
		},
		// 保存当前需要绑定设备的信息
		changeCurrentNeedBindDevicesMessage (state, playLoad) {
			state.currentNeedBindDevicesMessage = playLoad
		},
		// 保存设备通知信息
		changeDeviceNoticeDetails (state, playLoad) {
			state.deviceNoticeDetails = playLoad
		},
		// 保存家庭信息
		changeFamilyMessage (state, playLoad) {
			state.familyMessage = playLoad
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