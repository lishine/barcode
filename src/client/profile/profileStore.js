import { store } from 'react-easy-state'

const self = store({
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
