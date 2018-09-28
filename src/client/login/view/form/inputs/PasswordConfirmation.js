import FormikInput from './parts/FormikInput'

export default props => (
	<FormikInput
		{...props}
		autoComplete="new-password"
		type="password"
		placeholder="Password"
	/>
)
