import * as yup from 'yup'
import { MIN_PASSWORD_LENGTH } from 'utils/constants'

const schemas = {
	cep: yup
		.number()
		.typeError('Must be a number')
		.integer('Must be an integer number')
		.positive('Must be an positive number')
		.required('CEP is required!'),
	cpf: yup
		.number()
		.typeError('Must be a number')
		.integer('Must be an integer number')
		.positive('Must be an positive number')
		.required('CPF is required!'),
	address: yup.string().required('Address is required!'),
	state: yup.string().required('State is required!'),
	phone: yup.string().required('Phone is required!'),
	name: yup.string().required('Name is required!'),
	city: yup.string().required('City is required!'),
	email: yup
		.string()
		.email('E-mail is not valid!')
		.required('E-mail is required!'),
	password: yup
		.string()
		.min(MIN_PASSWORD_LENGTH, `Password has to be longer than ${MIN_PASSWORD_LENGTH} characters!`)
		.required('Password is required!'),
	passwordConfirmation: values =>
		yup
			.string()
			.oneOf([values.password], 'Passwords are not the same!')
			.required('Password confirmation is required!'),
}

export const extractSchemas = (names, values) =>
	reduce((acc, name) => {
		const schema = schemas[name]
		if (typeof schema === 'function') {
			acc[name] = schema(values)
		} else {
			acc[name] = schema
		}
		return acc
	}, {})(names)
