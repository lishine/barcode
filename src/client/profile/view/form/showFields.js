import upperFirst from 'lodash/fp/upperFirst'

import * as inputs from 'common/form/inputs'
import * as groups from 'profile/view/form/groups'
import { mapToObject } from 'utils/utils'

export const showFields = group =>
	map(field => ({ name: field, component: inputs[upperFirst(field)] }))(fields)
