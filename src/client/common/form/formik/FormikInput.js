import StyledInput from './StyledInput'
import StyledLabel from './StyledLabel'
import ErrorText from './ErrorText'
import { TextField } from 'reactackle-text-field'

export default ({
	field: { value, name, ...fieldProps }, // { name, value, onChange, onBlur }
	form: { touched, errors, setFieldTouched, setFieldValue, ...formProps }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	readOnly,
	...props
}) => {
	console.log('formProps', formProps)
	console.log('fieldProps', fieldProps)
	console.log('props', props)
	console.log('value', value)
	return (
		<div>
			{
				<>
					<TextField
						// border={touched[name] && errors[name] && '1px solid red'}

						{...{
							disabled: readOnly,
							onBlur: ({ value }) => setFieldTouched(name, value),
							onChange: ({ value }) => setFieldValue(name, value),
							value: value || '',
							name,
						}}
						{...props}
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
