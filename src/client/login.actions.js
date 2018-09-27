import * as c from './login.model/login.constants'

export const submit = (page, values, formikBag) => {
	return {
		type: c.SUBMIT,
		payload: { data: { page, values, formikBag } },
	}
}

export const setFormikProps = formikProps => {
	return {
		type: c.SET_FORMIK_PROPS,
		payload: { data: formikProps },
	}
}
