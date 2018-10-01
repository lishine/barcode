import upperFirst from 'lodash/fp/upperFirst'

import * as inputs from 'common/form/inputs'

export const showFields = fields =>
	map(({ name, label }) => ({ name, label, component: inputs[upperFirst(name)] }))(fields)
