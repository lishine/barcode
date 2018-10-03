import ErrorText from 'common/form/formik/ErrorText'

export default ({
	children,
	field: { value, name, ...fieldProps }, // { name, value, onChange, onBlur }
	form: { touched, errors, ...formProps }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	readOnly,
	placeholder,
	...props
}) => {
	return (
		<>
			{children({
				border: touched[name] && errors[name] && '2px solid red',
				readOnly,
				disabled: readOnly,
				placeholder: readOnly ? '' : placeholder,
				value: value || '',
				name,
				...props,
				...fieldProps,
			})}

			{touched[name] && errors[name] && <ErrorText>{errors[name]}</ErrorText>}
		</>
	)
}
