import { setCache, getCache } from '@/common/js/utils'
export default {	
	state: {
		userInfo: null,
		token: null, //请求token,
		overDueWay: false
	},
	getters: {
		 userInfo:(state) => {
			state.userInfo = JSON.parse(getCache('userInfo')) ? JSON.parse(getCache('userInfo')) : null;
			return state.userInfo
		},
		token:(state) => {
			state.userInfo = getCache('token') ? getCache('token') : null;
			return state.token
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
