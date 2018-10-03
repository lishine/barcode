import StyledInput from './StyledInput'
import StyledLabel from './StyledLabel'
import ErrorText from './ErrorText'

export default ({
	field: { value, name, ...fieldProps }, // { name, value, onChange, onBlur }
	form: { touched, errors, ...formProps }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	readOnly,
	placeholder,
	...props
}) => {
	console.log('formProps', formProps)
	console.log('fieldProps', fieldProps)
	console.log('props', props)
	console.log('value', value)
	console.log('readOnly', readOnly)
	return (
		<div>
			{
				<>
					<StyledInput
						border={touched[name] && errors[name] && '2px solid red'}
						{...{
							readOnly,
							disabled: readOnly,
							placeholder: readOnly ? '' : placeholder,
							value: value || '',
							name,
						}}
						{...props}
						{...fieldProps}
					/>
					{touched[name] && errors[name] && <ErrorText>{errors[name]}</ErrorText>}
				</>
			}
		</div>
	)
}

// export default ({
// 	field: { value, name, ...fieldProps }, // { name, value, onChange, onBlur }
// 	form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
// 	edit,
// 	...props
// }) => {
// 	return (
// 		<div>
// 			{edit ? (
// 				<>
// 					<StyledInput
// 						border={touched[name] && errors[name] && '1px solid red'}
// 						{...{ value: value || '', name, ...fieldProps }}
// 						{...props}
// 					/>
// 					{touched[name] && errors[name] && <ErrorText>{errors[name]}</ErrorText>}
// 				</>
// 			) : (
// 				<StyledLabel {...{ name }} {...props}>
// 					{value}
// 				</StyledLabel>
// 			)}
// 		</div>
// 	)
// }
