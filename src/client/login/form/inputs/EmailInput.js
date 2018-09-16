import React from 'react'

import FormikInput from 'login/form/inputs/parts/FormikInput'

export default (props) => (
	<FormikInput {...props} autoComplete="email" type="text" placeholder="Email" />
)
