import * as c from './auth.constants'

export default (state = { email: '', token: '' }, action) => {
	const { payload } = action

	switch (action.type) {
		case c.SET_EMAIL:
			return { ...state, email: payload.data }
		case c.SET_TOKEN:
			return { ...state, token: payload.data }
		default:
			return state
	}
}
