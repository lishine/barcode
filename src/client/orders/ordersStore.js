import { store } from 'react-easy-state'
// import { observable } from '@nx-js/observer-util'

const self = store({
	data: [],
	loading: true,
	async saveData(data) {
		// Object.assign(self.data, data)
	},
	onInvoiceDownload(index) {
		console.log('index', index)
		console.log('invoice download this.data[index].number', self.data[index].number)
	},
	onPackageDownload(index) {
		console.log('index', index)
		console.log('package download this.data[index].number', self.data[index].number)
	},
})

export const ordersStore = self
