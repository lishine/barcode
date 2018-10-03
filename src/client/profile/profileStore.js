import { store } from 'react-easy-state'

const self = store({
	editGroup: 'contacts',
    values: { name: '#name', password: '#password', passwordConfirmation: '#passwordConfirmation',
     email: '#email', city: '#city' },
	cancel() {
		self.editGroup = ''
	},
	edit(group) {
		console.log('group', group)
		self.editGroup = group
	},
})

export const profileStore = self
