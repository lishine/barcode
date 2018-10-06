import * as yup from 'yup'
import upperFirst from 'lodash/fp/upperFirst'

import * as inputs from 'common/form/inputs'
import { mapToObject } from 'utils/utils'
import { extractSchemas } from 'common/form/schemas'

const _groups = {
	password: {
		label: 'Password',
		link: 'change',
		fields: [
			{ name: 'password', label: 'Password', hiddenInViewMode: true },
			{ name: 'passwordConfirmation', label: 'Password Confirmation', hiddenInViewMode: true },
		],
	},
	contacts: {
		label: 'Contacts',
		link: 'edit',
		fields: [
			{ name: 'email', label: 'Email', viewOnly: true },
			{ name: 'name', label: 'Full Name' },
			{ name: 'cep', label: 'CEP' },
			{ name: 'phone', label: 'Phone' },
		],
	},
	address: {
		label: 'Address',
		link: 'edit',
		fields: [
			{ name: 'city', label: 'City' },
			{ name: 'cpf', label: 'CPF/CPNJ' },
			{ name: 'address', label: 'Address' },
			{ name: 'state', label: 'State' },
		],
	},
}

const addComponent = fields =>
	map(({ name, ...props }) => ({ name, component: inputs[upperFirst(name)], ...props }))(fields)

const addSchema = fields => values => {
	const fieldNames = map('name')(fields)
	const schemas = extractSchemas(fieldNames, values)
	return yup.object().shape(mapToObject(({ name }) => ({ [name]: schemas[name] }))(fields))
}

export const groups = mapToObject(({ fields, ...group }, groupName) => ({
	[groupName]: {
		fields: addComponent(fields),
		schema: addSchema(fields),
		...group,
	},
}))(_groups)
