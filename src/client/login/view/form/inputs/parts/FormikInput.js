import StyledInput from './StyledInput'
import ErrorText from './ErrorText'

export default ({
	field: { value, name, ...fieldProps }, // { name, value, onChange, onBlur }
	form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) => {
	return (
		<div>
			<StyledInput
				border={touched[name] && errors[name] && '1px solid red'}
				{...{ value: value || '', name, ...fieldProps }}
				{...props}
			/>
			{touched[name] && errors[name] && <ErrorText>{errors[name]}</ErrorText>}
		</div>
	)
}
