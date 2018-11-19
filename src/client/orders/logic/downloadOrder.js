import { select, take, call, put } from 'redux-saga/effects'
import { ordersStore } from 'orders/logic/ordersStore'
import { DOWNLOAD_ORDER } from './actions'
import { post } from 'logic/post'

export function* downloadOrder() {
	while (true) {
		const { payload } = yield take(DOWNLOAD_ORDER)
		const { what, index } = payload
		console.log('what', what)
		console.log('index', index)
		if (ordersStore.loading) {
			continue
		}

		ordersStore.loading = `${what}Download${index}`
		const number = ordersStore.data[index].number
		console.log('self.loading', ordersStore.loading)
		console.log(`${what} download this.data[index].number`, number)

		const { body, err } = yield call(post, '/api/all', 'downloadOrder', { what, number })

		if (body) {
			const { data } = body
			console.log('data', data)
			console.log('saving')
			let blob = new Blob([data], { type: 'text/plain;charset=utf-8' })
			saveAs(blob, `${what}.txt`)
		} else {
			console.dir(err)
		}

		ordersStore.loading = false
	}
}
