import { actionTypes as t } from 'login/login.constants'

export const loginReducer = (
	state = { formikProps: {}, form: undefined, alert: undefined },
	action
) => {
	const { payload } = action

	switch (action.type) {
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
