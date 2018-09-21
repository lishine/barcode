import * as yup from 'yup'
import * as inputs from './inputs'
import { MIN_PASSWORD_LENGTH } from 'fixed'

export default {
	title: 'Sign In',

	initialValues: {
		email: '',
		password: '',
	},

	show: {
		email: inputs.Email,
		password: inputs.Password,
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
