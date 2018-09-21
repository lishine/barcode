import React, { Component, Fragment } from 'react'

import StyledInput from 'login/form/inputs/parts/StyledInput'
import ErrorText from 'login/form/inputs/parts/ErrorText'

export default ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) => {
	return (
		<div>
			<StyledInput
				border={touched[field.name] && errors[field.name] && '1px solid red'}
				{...field}
				{...props}
			/>
			{touched[field.name] &&
				errors[field.name] && <ErrorText>{errors[field.name]}</ErrorText>}
		</div>
	)
}
