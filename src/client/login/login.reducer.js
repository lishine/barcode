import { actionTypes as t } from 'login/login.constants'
import { forms } from 'login/login.constants'

export const loginReducer = (
	state = { formikProps: {}, form: forms.SIGN_IN, alert: undefined },
	action
) => {
	const { payload } = action
	console.log('payload', payload)
	switch (action.type) {
		case t.SET_LINK_TOKEN:
			return { ...state, linkToken: payload }
		case t.GOTO_FORM:
			return { ...state, form: payload }
		case t.SET_ALERT:
			return { ...state, alert: payload }
		case t.SET_FORMIK_PROPS:
			return { ...state, formikProps: payload }
		default:
			return state
	}
}
