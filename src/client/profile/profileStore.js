import { store } from 'react-easy-state'

const self = store({
	values: {},
	loading: true,

	async saveValues(values) {
		Object.assign(self.values, values)
		self.clearForm()
	},
	clearForm() {
		self.editGroup = ''
		if (self.formikProps) {
			self.formikProps.resetForm()
		}
		self.setError('')
	},
	cancel: () => self.clearForm(),

	edit: group => (self.editGroup = group),
	setFormikProps: formikProps => (self.formikProps = formikProps),
	setError: bool => (self.error = bool),
	setLoading: bool => (self.loading = bool),
})

export const profileStore = self

// name: 'michael',
// password: '',
// passwordConfirmation: '',
// email: 'michael@gmail.com',
// CPF: '64345',
// phone: '062-9896733',
// address: 'Tolstogo 2d',
// city: 'Rio',
// state: 'AM',
// CEP: '552455',
// },
