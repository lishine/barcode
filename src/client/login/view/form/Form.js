import { Formik, FastField } from 'formik'
import { Form, Title } from 'styled'
import ProgressButton from 'react-progress-button'
import 'react-progress-button/react-progress-button.css'
import { Map } from 'utils/utils'
import { loginStore } from 'login/store'

import { validate } from './validate'
import { formData } from './data'

import * as forms from 'login/constants/forms'
import { gotoForm, submit } from '../../actions'

export default view(props => {
	const { form } = loginStore
	console.log('form', form)
	const { show, schema, title } = formData(form)
	// Object.assign(initialValues, { email: '' })

	// console.log('initialValues', initialValues)
	const { email } = loginStore
	return (
		<div key={form}>
			<Title>{title}</Title>
			<Formik
				// enableReinitialize
				initialValues={{ email }}
				validate={validate(schema)}
				onSubmit={(...props) => dispatch(submit(...props))}
				render={formikProps => {
					// dispatch(setFormikProps(formikProps))
					const {
						values,
						handleSubmit,
						submitForm,
						setStatus,
						isSubmitting,
						status = {},
					} = formikProps
					console.log('status', status)
					if (status.error && status.values !== values) {
						setStatus({})
					}
					loginStore.email = values.email
					console.log('values', values)
					// console.log('isSubmitting', isSubmitting)
					const { error, sendLink } = loginStore

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
