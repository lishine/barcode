import FormikInput from 'common/form/formik/FormikInput'

export default props => (
	<FormikInput
		{...props}
		autoComplete="email"
		type="text"
		placeholder="Email"
		label="Email"
	/>
)
