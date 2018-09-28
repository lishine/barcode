import { Formik, Field } from 'formik'
import { Button, Form, Title } from 'styled'
import Link from 'redux-first-router-link'
import ProgressButton from 'react-progress-button'
import 'react-progress-button/react-progress-button.css'
import { When } from 'react-if'
import { Map } from 'utils/utils'

import { validate } from './validate'
import { formData } from './data'

import { goto } from 'router/router.actions'
import { getForm } from 'login/login.selectors'
import { forms } from 'login/login.constants'
import { gotoForm, submit, setFormikProps } from 'login/login.actions'

export default connect({ form: getForm })(props => {
	const { form } = props
	console.log('form', form)
	const { initialValues, show, schema, title } = formData(form)

	return (
		<>
			<Title>{title}</Title>
			<Formik
				initialValues={initialValues}
				validate={validate(schema)}
				onSubmit={() => dispatch(submit())}
				render={formikProps => {
					dispatch(setFormikProps(formikProps))
					const { setStatus, handleSubmit, isSubmitting, status = {} } = formikProps
					console.log('status', status)
					console.log('isSubmitting', isSubmitting)
					const { error, sendLink } = status

					return (
						<Form onSubmit={handleSubmit}>
							<Map collection={show}>
								{({ name, component }) => (
									<Field {...{ key: name, name, component }} />
								)}
							</Map>

							{form === forms.SIGN_IN && (
								<button
									onClick={() => dispatch(gotoForm(forms.FORGOT_PASSWORD))}>
									forgot password
								</button>
							)}
							{!!error && <div>{error}</div>}
							{!!sendLink && (
								<button onClick={() => setStatus('sendLinkSubmit')}>
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
		</>
	)
})
