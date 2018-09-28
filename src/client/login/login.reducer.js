import * as c from 'login/login.constants'

export const loginReducer = (
	state = { formikProps: {}, form: undefined, alert: undefined },
	action
) => {
	const { payload } = action

	switch (action.type) {
		case c.GOTO_FORM:
			return { ...state, form: payload }
		case c.SET_ALERT:
			return { ...state, alert: payload }
		case c.SET_FORMIK_PROPS:
			return { ...state, formikProps: payload }
		default:
			return state
	}
}
