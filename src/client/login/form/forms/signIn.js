import * as yup from 'yup'

const MIN_PASSWORD_LENGTH = 6

export default {
	title: 'Sign In',

	initialValues: {
		email: '',
		password: '',
	},

	show: {
		email: true,
		password: true,
	},

	schema: function schema(values) {
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
	},
}
