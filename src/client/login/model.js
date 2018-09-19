const LOGIN = '[Login]'

const ON_EMAIL_CHANGE = `${LOGIN} On Email Change`

export default (state = { email: '' }, action) => {
	const { payload } = action
	console.log('111111action', action)
	console.log('state', state)
	switch (action.type) {
		case ON_EMAIL_CHANGE:
			return { ...state, email: payload }
		default:
			return state
	}
}

export const onEmailChange = (email) => ({
	type: ON_EMAIL_CHANGE,
	payload: email,
})
export const getEmail = (state) => state.login.email
