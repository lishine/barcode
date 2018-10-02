import { Formik, FastField } from 'formik'
import { Form, Title } from 'styled'
import ProgressButton from 'react-progress-button'
import 'react-progress-button/react-progress-button.css'

import { Map } from 'utils/utils'
import { profileStore } from 'profile/store'
import { validate } from 'common/form/validate'
import * as groups from './groups'
import { showFields, getSchema } from 'profile/view/form/funcs'

export default view(props => {
	const { editGroup, values, submit, error } = profileStore
	return (
		<>
			<Title>Profile</Title>
			{values ? (
				<Formik
					initialValues={values}
					validate={editGroup && validate(getSchema(editGroup))}
					onSubmit={submit}
					render={formikProps => {
						const { handleSubmit, isSubmitting } = formikProps

						return (
							<Form onSubmit={handleSubmit}>
								<Map collection={groups}>
									{({ label, link, fields }, group) => (
										<div key={group}>
											{label}
											<Map collection={showFields(fields)}>
												{({ name, label, component }, key) => (
													<div key={key}>
														<div>{label}</div>
														<FastField
															{...{
																readOnly: editGroup !== group,
																name,
																component,
															}}
														/>
													</div>
												)}
											</Map>

											{error && <div>{error}</div>}

											<ProgressButton
												type="submit"
												state={isSubmitting ? 'loading' : ''}>
												Submit
											</ProgressButton>
											<button type="button">Cancel</button>
										</div>
									)}
								</Map>
							</Form>
						)
					}}
				/>
			) : (
				'Loading'
			)}
		</>
	)
})
