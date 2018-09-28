import upperFirst from 'lodash/fp/upperFirst'
import * as yup from 'yup'
import * as inputs from './inputs'
import schema from './schema'
import { mapToObject } from 'utils/utils'

const allFields = {
	SignUp: ['name', 'email', 'password', 'passwordConfirmation'],
	SignIn: ['email', 'password'],
	ForgotPassword: ['email'],
	NewPassword: ['password', 'passwordConfirmation'],
}

const titles = {
	SignUp: 'Sign Up',
	SignIn: 'Sign In',
	ForgotPassword: 'Forgot password',
	NewPassword: 'New password',
}

export const formData = page => {
	const fields = allFields[page]
	const title = titles[page]
	return {
		title,
		initialValues: mapToObject(field => ({ [field]: '' }))(fields),
		show: map(field => ({ name: field, component: inputs[upperFirst(field)] }))(fields),
		schema: values => {
			const sch = schema(values)
			return yup.object().shape(mapToObject(field => ({ [field]: sch[field] }))(fields))
		},
	}
}

export const alerts = {
	SignUp: {
		success: {
			message: 'Sign up in process. Check your mail for email confirmation link',
		},
	},
	SignIn: {
		success: { message: 'You are signed in', btnContinueToSite: true },
		confirmLinkSent: { message: 'Please check your mail for email confirmation link' },
		emailConfirmed: {
			message: 'Email confirmed. You are signed in',
			btnContinueToSite: true,
		},
	},
	ForgotPassword: {
		success: { message: 'Please check your mail for new password confirmation link' },
	},
	NewPassword: {
		success: { message: 'Password changed. You are signed in', btnContinueToSite: true },
	},
}
