import * as c from './constants'

export const resendLinkWillSubmit = boolean => ({
	type: c.RESEND_LINK_WILL_SUBMIT,
	payload: { data: boolean },
})

export const submit = boolean => ({
	type: c.SUBMIT,
	payload: { data: boolean },
})
