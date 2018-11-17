import { cancelled, call, fork } from 'redux-saga/effects'
import { HALT } from 'utils/utils'
import { ordersStore } from 'orders/ordersStore'
import { post } from 'logic/post'

export function* ordersNavigate(_, query) {
	console.log('orders navigate')

	if (true) {
		const { body, err } = yield call(post, '/api/all', 'loadOrders')

		if (body) {
			const { data = [] } = body
			console.log('data', data)
			ordersStore.data = data
		} else {
			console.dir(err)
			ordersStore.data = []
		}
	}
	ordersStore.loading = false

	try {
		yield call(HALT)
	} finally {
		if (yield cancelled()) {
			console.log('navigate away from orders')
		}
	}
}
