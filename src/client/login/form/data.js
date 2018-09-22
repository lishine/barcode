import * as yup from 'yup'
import * as inputs from './inputs'
import schema from './schema'
import { mapToObject } from 'utils'

const allFields = {
	SignUp: ['Name', 'Email', 'Password', 'PasswordConfirmation'],
	SignIn: ['Email', 'Password'],
	ForgotPassword: ['Email'],
	NewPassword: ['Password', 'PasswordConfirmation'],
}

const titles = {
	SignUp: 'Sign Up',
	SignIn: 'Sign In',
	ForgotPassword: 'Forgot password',
	NewPassword: 'New password',
}

export const formData = page => {
	const fields = allFields[page]
	console.log('fields', fields)
	const title = titles[page]
	console.log(
		'mapToObject(field => ({ [field]: schema[field] }))(fields)',
		mapToObject(field => ({ [field]: schema[field] }))(fields)
	)
	return {
		title,

		initialValues: mapToObject(field => ({ [field]: '' }))(fields),

		show: map(field => ({ name: field, component: inputs[field] }))(fields),

		schema: values => {
			const sch = schema(values)
			return yup.object().shape(mapToObject(field => ({ [field]: sch[field] }))(fields))
		},
	}
}

export const alerts = {
	success: {
		SignUp: { message: 'Sign Up success', btnContinueToSite: true },
		SignIn: { message: 'Sign In success', btnContinueToSite: true },
		ForgotPassword: { message: 'Forgot password success' },
		NewPassword: { message: 'New password success', btnContinueToSite: true },
	},
	failure: {
		SignUp: { message: 'Sign Up failure' },
		SignIn: { message: 'Sign In failure' },
		ForgotPassword: { message: 'Forgot password failure' },
		NewPassword: { message: 'New password failure' },
	},
}
