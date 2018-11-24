import { Formik, FastField } from 'formik'

import { Container, Form, Title, Submit, Link, FieldRow } from './styled'
import { Map } from 'utils/utils'
import { loginStore } from 'login/store'
import { validate } from 'common/form/validate'
import { formData } from './data'
import * as forms from 'login/constants/forms'
import { submit } from 'login/logic/actions'

export default view(props => {
	const { form, error, sendLink, email } = loginStore
	const { show, schema, title } = formData(form)

	return (
		<Container key={form}>
			<Title>{title}</Title>
			<Formik
				initialValues={{ email }}
				validate={validate(schema)}
				onSubmit={(...props) => dispatch(submit(...props))}
				render={formikProps => {
					const { values, handleSubmit, submitForm, isSubmitting } = formikProps
					loginStore.setEmail(values.email)

					return (
						<Form
							onSubmit={(...props) => {
								loginStore.setSubmitSource()
								handleSubmit(...props)
							}}>
							<Map collection={show}>
								{({ name, component }) => (
									<FieldRow>
										<FastField {...{ key: name, name, component }} />
									</FieldRow>
								)}
							</Map>

							{form === forms.SIGN_IN && (
								<Link onClick={() => loginStore.gotoForm(forms.FORGOT_PASSWORD)}>
									forgot password
								</Link>
							)}
							{!!error && <div>{error}</div>}
							{sendLink && (
								<Link
									onClick={() => {
										loginStore.setSubmitSource('link')
										submitForm()
									}}>
									Resend link
								</Link>
							)}

							<Submit state={isSubmitting ? 'loading' : ''} />
						</Form>
					)
				}}
			/>
		</Container>
	)
})
