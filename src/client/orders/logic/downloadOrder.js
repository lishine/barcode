import { select, take, call, put } from 'redux-saga/effects'
import { ordersStore } from 'orders/logic/ordersStore'
import { DOWNLOAD_ORDER } from './actions'
import { post } from 'logic/post'
import saveAs from 'file-saver'
import set from 'lodash/set'

export function* downloadOrder() {
	while (true) {
		const { payload } = yield take(DOWNLOAD_ORDER)
		const { what, index } = payload
		console.log('what', what)
		console.log('index', index)
		if (ordersStore.loading) {
			continue
		}

		set(ordersStore.data[index], `download.${what}Loading`, true)
		ordersStore.data = ordersStore.data.slice(0)
		console.log('ordersStore.data[index]', ordersStore.data[index])
		console.log('ordersStore.data', ordersStore.data)
		const number = ordersStore.data[index].number
		console.log('self.loading', ordersStore.loading)
		console.log(`${what} download this.data[index].number`, number)

		const { body, err } = yield call(
			post,
			'/api/all',
			'downloadOrder',
			{ what, number },
			{ download: true }
		)

		if (body) {
			console.log('body blob', body)
			console.log('saving')
			// let blob = new Blob([data], { type: '' })
			saveAs(body, `${what}-${number}${what === 'invoice' ? '.pdf' : '.zip'}`)
		} else {
			console.dir(err)
		}

		set(ordersStore.data[index], `download.${what}Loading`, false)
		ordersStore.data = ordersStore.data.slice(0)
	}
}
