import upperFirst from 'lodash/fp/upperFirst'
import { mapToObject } from 'utils/utils'
import * as yup from 'yup'

import * as inputs from 'common/form/inputs'
import * as groups from 'profile/view/form/groups'
import { schemas } from 'profile/view/form/schemas'

export const showFields = fields =>
	map(({ name, label }) => ({ name, label, component: inputs[upperFirst(name)] }))(fields)

export const getSchema = group => values => {
	console.log('group', group)
	console.log('values', values)
	console.log('groups[group].fields', groups[group].fields)
	const sch = schemas(values)
	return yup
		.object()
		.shape(mapToObject(({ name }) => ({ [name]: sch[name] }))(groups[group].fields))
}
