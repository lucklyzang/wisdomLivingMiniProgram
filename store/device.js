import { getDefaultDeviceState } from '@/common/js/resetStore/resetStore.js'
export default {
  state: getDefaultDeviceState(),
  getters:{
		timeMessage: state => state.timeMessage,
		ossMessage: state => state.ossMessage,
		enterAddRoomPageSource: state => state.enterAddRoomPageSource,
		enterDeviceSetPageSource: state => state.enterDeviceSetPageSource
  },
  mutations:{
		changeTimeMessage (state, playLoad) {
			state.timeMessage = playLoad
		},
		changeOssMessage (state, playLoad) {
			state.ossMessage = playLoad
		},
		changeEnterAddRoomPageSource (state, playLoad) {
			state.enterAddRoomPageSource = playLoad
		},
		changeEnterDeviceSetPageSource (state, playLoad) {
			state.enterDeviceSetPageSource = playLoad
		},
		//重置质量管理的状态
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