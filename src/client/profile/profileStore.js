import { store } from 'react-easy-state'

const self = store({
	editGroup: 'contacts',
	formikProps: undefined,
	values: {
		name: '#name',
		password: '#password',
		passwordConfirmation: '#passwordConfirmation',
		email: '#email',
		CPF: '64345',
		phone: '#phone',
		address: '#address',
		city: '#city',
		state: '#state',
		CEP: '552455',
	},
	cancel() {
		self.editGroup = ''
		self.formikProps.resetForm()
	},
	edit(group) {
		console.log('group', group)
		self.editGroup = group
	},

	setFormikProps(formikProps) {
		console.log('formikProps', formikProps)
		self.formikProps = formikProps
	},
})

export const profileStore = self
