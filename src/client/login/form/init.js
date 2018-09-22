import * as yup from 'yup'
import * as inputs from './inputs'
import schema from './schema'

const fields = {
	signUp: ['name', 'email', 'password', 'passwordConfirmation'],
	signIn: ['email', 'password'],
	forgotPassword: ['email'],
	newPassword: ['password', 'passwordConfirmation'],
}

const titles = {
	signUp: 'Sign Up',
	signIn: 'Sign In',
	forgotPassword: 'Forgot password',
	newPassword: 'New password',
}

export default page => ({
	title: titles[page],

	initialValues: reduce((acc, field) => ({ [field]: '' }), {})(fields),

	show: map(name => ({ name, component: inputs[name.toUpperCase()] }))(fields),

	schema: values =>
		yup.object().shape(reduce((acc, field) => ({ [field]: schema[field] }), {})(fields)),
})
