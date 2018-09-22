const DOMAIN = 'auth'

const SET_EMAIL = `[${DOMAIN}] Set Email`
const SET_TOKEN = `[${DOMAIN}] Set Token`

export default (state = { email: '', token: '' }, action) => {
	const { payload } = action

	switch (action.type) {
		case SET_EMAIL:
			return { ...state, email: payload }
		case SET_TOKEN:
			return { ...state, token: payload }
		default:
			return state
	}
}

export const getAlert = state => state.location.payload.alert

export const getEmail = state => state[DOMAIN].email
export const getToken = state => state[DOMAIN].token
export const isAuth = state => !!state[DOMAIN].token

export const setEmail = email => ({
	type: SET_EMAIL,
	payload: email,
})

export const setToken = token => ({
	type: SET_TOKEN,
	payload: token,
})
