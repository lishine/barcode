import { store } from 'react-easy-state'
import * as forms from 'login/constants/forms'

const init = {
	email: '',
	error: false,
	sendLink: false,
	alert: undefined,
	form: forms.SIGN_IN,
	submitSource: undefined,
}

const self = store({
	reset() {
		Object.assign(self, init)
	},

	gotoForm(form) {
		self.setForm(form)
		self.setSendLink(false)
		self.setError(false)
	},
	onChange(values) {
		if (values !== self.values) {
			if (self.error) {
				self.setError(false)
			}
			if (self.sendLink) {
				self.setSendLink(false)
			}
			self.values = values
		}
	},
	setSubmitSource(submitSource) {
		self.submitSource = submitSource
	},
	setForm(form) {
		self.form = form
	},
	setAlert(alert, extend) {
		self.alert = Object.assign({}, alert, extend)
	},
	setSendLink(bool) {
		self.sendLink = bool
	},
	setError(bool) {
		self.error = bool
	},
	setEmail(email) {
		self.email = email
	},
})

export const loginStore = self
