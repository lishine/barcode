import React from 'react'

import FormikInput from './parts/FormikInput'

export default props => (
	<FormikInput
		{...props}
		autoComplete="email"
		type="text"
		placeholder="Email"
		label="Email"
	/>
)
