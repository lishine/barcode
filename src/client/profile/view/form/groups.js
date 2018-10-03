import * as yup from 'yup'
import upperFirst from 'lodash/fp/upperFirst'

import * as inputs from 'common/form/inputs'
import { mapToObject } from 'utils/utils'
import { schemas } from 'profile/view/form/schemas'

const _groups = {
	password: {
		label: 'Password',
		link: 'change',
		fields: [
			{ name: 'password', label: 'Password', hiddenInViewMode: true },
			{ name: 'password', label: 'Password Confirmation', hiddenInViewMode: true },
		],
	},
	contacts: {
		label: 'Contacts',
		link: 'edit',
		fields: [
			{ name: 'email', label: 'Email', viewOnly: true },
			{ name: 'name', label: 'Full Name' },
		],
	},
	address: {
		label: 'Address',
		link: 'edit',
		fields: [{ name: 'city', label: 'City' }],
	},
}

const addComponent = fields =>
	map(({ name, ...props }) => ({ name, component: inputs[upperFirst(name)], ...props }))(fields)

const addSchema = fields => values => {
	const sch = schemas(values)
	return yup.object().shape(mapToObject(({ name }) => ({ [name]: sch[name] }))(fields))
}

export const groups = mapToObject(({ fields, ...group }, groupName) => ({
	[groupName]: {
		fields: addComponent(fields),
		schema: addSchema(fields),
		...group,
	},
}))(_groups)
