import { store } from 'react-easy-state'
import { submit } from './submit'

const self = store({
	error: '',
	editGroup: '',
	formikProps: undefined,
	values: {
		name: 'michael',
		password: '',
		passwordConfirmation: '',
		email: 'michael@gmail.com',
		CPF: '64345',
		phone: '062-9896733',
		address: 'Tolstogo 2d',
		city: 'Rio',
		state: 'AM',
		CEP: '552455',
	},

	saveValues(apiValues) {
		Object.assign(self.values, apiValues)
	},
	submit,
	clearForm() {
		self.editGroup = ''
		self.formikProps.resetForm()
		self.setError('')
	},
	cancel() {
		self.clearForm()
	},
	edit(group) {
		console.log('group', group)
		self.editGroup = group
	},

	setFormikProps(formikProps) {
		console.log('formikProps', formikProps)
		self.formikProps = formikProps
	},
	setError(bool) {
		self.error = bool
	},
})

export const profileStore = self
