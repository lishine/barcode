import * as forms from 'login/login.constants/forms'
import * as t from 'login/login.constants/actionTypes'

const initState = { formikProps: {}, form: forms.SIGN_IN, alert: undefined }

export const loginReducer = (state = initState, action) => {
	const { payload } = action

	switch (action.type) {
		// case t.SET_LINK_TOKEN:
		// 	return { ...state, linkToken: payload }
		case t.RESET:
			return initState
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
