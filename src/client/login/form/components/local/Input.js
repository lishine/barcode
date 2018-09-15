import React, { Component, Fragment } from 'react'

import StyledInput from './StyledInput'
import ErrorText from './ErrorText'

export default ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) => {
	console.log('props', props)
	console.log('field', field)
	return (
		<div>
			<StyledInput
				border={touched[field.name] && errors[field.name] && '1px solid red'}
				{...field}
				{...props}
			/>
			{touched[field.name] && errors[field.name] && <ErrorText>{errors[field.name]}</ErrorText>}
		</div>
	)
}
