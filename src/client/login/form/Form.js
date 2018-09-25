import { Formik, Field } from 'formik'
import { Button, Form, Title } from 'styled'
import Link from 'redux-first-router-link'
import ProgressButton from 'react-progress-button'
import 'react-progress-button/react-progress-button.css'

import { When } from 'react-if'
import { Map } from 'utils'

import { validate } from './validate'
import { formData } from './data'

import { goToForgotPasswordForm } from 'store/auth/actions'
import { resendLinkWillSubmit, submit } from 'login/model/actions'
import { page } from 'store/auth/selectors'
import * as routes from 'store/router/constants/routes'

export default connect({ page })(props => {
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
					const {
						setStatus,
						handleSubmit,
						isSubmitting,
						status,
						values,
						submitForm,
					} = formikProps
					console.log('status', status)
					console.log('isSubmitting', isSubmitting)
					const error = get('data.error')(status)
					const sendLink = get('data.sendLink')(status)
					if (error && values !== status.values) {
						setStatus(Object.assign({}, status, { data: undefined }))
					}

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
								<div>
									<Link
										to="#"
										onClick={() => {
											dispatch(resendLinkWillSubmit())
											submitForm()
										}}>
										Resend link
									</Link>
								</div>
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
