import * as c from './constants'

export const authReducer = (state = { email: '', token: '' }, action) => {
	const { payload } = action

	switch (action.type) {
		case c.SET_EMAIL:
			return { ...state, email: payload }
		case c.SET_TOKEN:
			return { ...state, token: payload }
		default:
			return state
	}
}
