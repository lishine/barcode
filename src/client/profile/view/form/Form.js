import { Formik, FastField } from 'formik'
import { Form, Title } from 'styled'
import ProgressButton from 'react-progress-button'
import 'react-progress-button/react-progress-button.css'

import { Map } from 'utils/utils'
import { profileStore } from 'profile/store'
import { validate } from 'common/form/validate'
import * as groups from './groups'
import { showFields } from 'profile/view/form/showFields'
import { submit } from 'profile/logic/actions'

export default view(props => {
	const { editGroup, values, submit, error } = profileStore
	return (
		<>
			<Title>Profile</Title>
			{values ? (
				<Formik
					initialValues={values}
					validate={validate(groups(editGroup).schema)}
					onSubmit={submit}
					render={formikProps => {
						const { values, handleSubmit, submitForm, isSubmitting } = formikProps

						return (
							<Form onSubmit={handleSubmit}>
								<Map collection={groups}>
									{({ label, link, fields }) => (
										<>
											<Map collection={showFields(fields)}>
												{({ name, component }) => (
													<FastField
														{...{ key: name, name, component }}
													/>
												)}
											</Map>

											{!!error && <div>{error}</div>}

											<ProgressButton
												type="submit"
												state={isSubmitting ? 'loading' : ''}>
												Submit
											</ProgressButton>
										</>
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
