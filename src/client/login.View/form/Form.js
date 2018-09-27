import { Formik, Field } from 'formik'
import { Button, Form, Title } from 'styled'
import Link from 'redux-first-router-link'
import ProgressButton from 'react-progress-button'
import 'react-progress-button/react-progress-button.css'
import { When } from 'react-if'
import { Map } from 'utils'

import { validate } from './validate'
import { formData } from './data'

import { goToForgotPasswordForm } from '../../store/model/router/router.actions'
import { getPage } from '../../store/model/router/router.selectors'
import { submit, setFormikProps } from '../model/login.actions'
import * as routes from 'store/model/router/router.constants/routes'

export default connect({ page: getPage })(props => {
	const { page } = props
	console.log('page', page)
	const { initialValues, show, schema, title } = formData(page)

	return (
		<>
			<Title>{title}</Title>
			<Formik
				initialValues={initialValues}
				validate={validate(schema)}
				onSubmit={props => dispatch(submit(props))}
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
							<When condition={page === routes.SIGN_IN}>
								<Link to={goToForgotPasswordForm()}>forgot password</Link>
							</When>
							<When condition={!!error}>{error}</When>
							<When condition={!!sendLink}>
								<button onClick={() => setStatus('sendLinkSubmit')}>
									Resend link
								</button>
							</When>
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
