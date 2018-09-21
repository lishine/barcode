import * as yup from 'yup'
import * as inputs from './inputs'
import { MIN_PASSWORD_LENGTH } from 'fixed'

export default {
	title: 'Sign Up',

	initialValues: {
		name: '',
		email: '',
		password: '',
		passwordConfirmation: '',
	},

	show: {
		email: inputs.Email,
		password: inputs.Password,
		passwordConfirmation: inputs.PasswordConfirmation,
		name: inputs.name,
	},

	schema: function schema(values) {
		return yup.object().shape({
			name: yup.string().required('Name is required!'),
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
			passwordConfirmation: yup
				.string()
				.oneOf([values.password], 'Passwords are not the same!')
				.required('Password confirmation is required!'),
		})
	},
}
