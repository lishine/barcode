import { throwError, throwIf } from '../../../server/lib/error'
import edn from 'jsedn'
import map from 'lodash/fp/map'
import { downloadFile } from './downloadFile'
import { getOrders } from './getOrders'

export async function loadOrders({ data, db, user: { id: user_id } }) {
	console.log('loading orders')

	const user = await db.users
		.findOne({ id: user_id })
		.then(throwIf(user => !user, 400, 'No user'))
		.catch(throwError(400, 'No user'))
	console.log('user', user)
	const { email } = user

	const ednOrders = await getOrders(email)
	const parsed = edn.parse(ednOrders)
	console.log('edn.toJS(parsed)', JSON.stringify(edn.toJS(parsed), null, 2))
	const jsOrders = edn.toJS(parsed)[1][':query/rows']

	const mappedOrders = map(order => {
		const number = order[':order/reference']
		downloadFile(order[':order/invoice-download'], `invoice-${number}.pdf`)
		downloadFile(order[':order/package-download'], `package-${number}.zip`)
		return {
			number: number,
			date: order[':order/date'],
			status: order[':order/status'],
			price: order[':order/amount'],
			barcodes: order[':order/barcodes'],
			quantity: order[':order/quantity'],
		}
	})(jsOrders)
	console.log('mappedOrders', mappedOrders)

	return mappedOrders
}
