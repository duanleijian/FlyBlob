/* eslint-disable import/no-anonymous-default-export */
export default {    
    namespace: 'user',
    state: {
			curUser: null,
			curAuthor: null,
			isLogin: false,
	},
    reducers: {
        updateUser (state, action) {      
            const { payload: { user } } = action
			state.curUser = user
			return state
        },
		updateAuthor (state, action) {
			const { payload: { author } } = action
			state.curAuthor = author
			return state
		},
		updateLoginStatus (state, action) {
			const { payload: { isLogin } } = action
			state.isLogin = isLogin
			return state
		}
    }
}