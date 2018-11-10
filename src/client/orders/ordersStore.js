import { store } from 'utils/utils'

export const ordersStore = store(
	{
		data: {},
		loading: true,
	},
	{
		async saveData(data) {
			// Object.assign(self.data, data)
		},
	}
)
