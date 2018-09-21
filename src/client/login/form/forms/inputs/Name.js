import React from 'react'

import FormikInput from 'login/form/inputs/parts/FormikInput'

export default props => (
	<FormikInput
		{...props}
		autoComplete="name"
		type="text"
		placeholder="Name"
		label="Name"
	/>
)
