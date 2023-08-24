import { getDefaultDeviceState } from '@/common/js/resetStore/resetStore.js'
export default {
  state: getDefaultDeviceState(),
  getters:{
		timeMessage: state => state.timeMessage,
		ossMessage: state => state.ossMessage,
		enterAddRoomPageSource: state => state.enterAddRoomPageSource,
		enterDeviceSetPageSource: state => state.enterDeviceSetPageSource,
		enterFamilyManagementPageSource: state => state.enterFamilyManagementPageSource,
		familyId: state => state.familyId
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