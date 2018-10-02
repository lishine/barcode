import { store } from 'react-easy-state'

const self = store({
	editGroup: 'contacts',
	values: { name: 'nnname', password: 'nnnpassword' },
})

export const profileStore = self
