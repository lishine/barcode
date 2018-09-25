import * as c from './constants'

export default (state = { resendLinkWillSubmit: false }, action) => {
	const { payload } = action

	switch (action.type) {
		case c.RESEND_LINK_WILL_SUBMIT:
			return { ...state, resendLinkWillSubmit: payload.data }
		default:
			return state
	}
}
