import { setCache, getCache } from '@/common/js/utils'
export default {	
	state: {
		userInfo: {},
		token: null, //请求token,
		overDueWay: false,
		userBasicInfo: null
	},
	getters: {
		 userInfo:(state) => {
			state.userInfo = getCache('userInfo') ? getCache('userInfo') : {};
			return state.userInfo
		},
		token:(state) => {
			state.token = getCache('token') ? getCache('token') : null;
			return state.token
		},
		userBasicInfo:(state) => {
			return state.userBasicInfo
		},
		overDueWay: state => state.overDueWay
	},
	mutations: {
		storeUserInfo(state, playLoad) {
			if (playLoad && playLoad != 'null') {
				setCache('userInfo', playLoad);
				state.userInfo = playLoad
			}
		},
		// 存储用户基本信息
		changeUserBasicInfo(state, playLoad) {
			if (playLoad && playLoad != 'null') {
				state.userBasicInfo = playLoad
			}
		},
		// 修改token状态
		changeToken(state, playLoad) {
			if (playLoad && playLoad != 'null') {
				setCache('token', playLoad);
				state.token = playLoad
			}
		},
		// 修改过期方式
		changeOverDueWay(state, playLoad) {
			state.overDueWay = playLoad
		}
	},
	actions: {}
}
