import * as yup from 'yup'

export const title = 'Sign In'

export const initialValues = {
	email: '',
	password: '',
}

const MIN_PASSWORD_LENGTH = 6
export function schema(values) {
	return yup.object().shape({
		email: yup
			.string()
			.email('E-mail is not valid!')
			.required('E-mail is required!'),
		password: yup
			.string()
			.min(
				MIN_PASSWORD_LENGTH,
				`Password has to be longer than ${MIN_PASSWORD_LENGTH} characters!`
			)
			.required('Password is required!'),
	})
}
