import { Formik, FastField } from 'formik'
import ProgressButton from 'react-progress-button'
import 'react-progress-button/react-progress-button.css'

import { Form, Title } from './styled'
import { Map } from 'utils/utils'
import { loginStore } from 'login/store'
import { validate } from 'common/form/validate'
import { formData } from './data'
import * as forms from 'login/constants/forms'
import { submit } from 'login/logic/actions'

export default view(props => {
	const { form, error, sendLink } = loginStore
	console.log('form', form)
	const { show, schema, title } = formData(form)
	const { email } = loginStore

	return (
		<div key={form}>
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
									<FastField {...{ key: name, name, component }} />
								)}
							</Map>

							{form === forms.SIGN_IN && (
								<button
									type="button"
									onClick={() => loginStore.gotoForm(forms.FORGOT_PASSWORD)}>
									forgot password
								</button>
							)}
							{!!error && <div>{error}</div>}
							{sendLink && (
								<button
									type="button"
									onClick={() => {
										loginStore.setSubmitSource('link')
										submitForm()
									}}>
									Resend link
								</button>
							)}

							<ProgressButton
								type="submit"
								state={isSubmitting ? 'loading' : ''}>
								Submit
							</ProgressButton>
						</Form>
					)
				}}
			/>
		</div>
	)
})
