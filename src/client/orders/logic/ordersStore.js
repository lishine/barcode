import { store } from 'react-easy-state'
// import { observable } from '@nx-js/observer-util'
import { post } from 'logic/post'

const self = store({
	data: [],
	loading: true,
})

export const ordersStore = self
