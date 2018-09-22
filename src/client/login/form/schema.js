import * as yup from 'yup'
import { MIN_PASSWORD_LENGTH } from 'fixed'
export default values => ({
	Name: yup.string().required('Name is required!'),
	Email: yup
		.string()
		.email('E-mail is not valid!')
		.required('E-mail is required!'),
	Password: yup
		.string()
		.min(
			MIN_PASSWORD_LENGTH,
			`Password has to be longer than ${MIN_PASSWORD_LENGTH} characters!`
		)
		.required('Password is required!'),
	PasswordConfirmation: yup
		.string()
		.oneOf([values.password], 'Passwords are not the same!')
		.required('Password confirmation is required!'),
})
