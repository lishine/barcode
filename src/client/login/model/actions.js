import * as c from './constants'

export const resendLinkWillSubmit = boolean => ({
	type: c.RESEND_LINK_WILL_SUBMIT,
	payload: { data: boolean },
})

export const submit = (values, formikBag) => ({
	type: c.SUBMIT,
	payload: { data: { values, formikBag } },
})
