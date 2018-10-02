import FormikInput from 'common/form/formik/FormikInput'

export default props => (
	<FormikInput
		{...props}
		autoComplete="new-password"
		type="password"
		placeholder="Password"
	/>
)
