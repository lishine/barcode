// import { throwError, throwIf } from '../../server/lib/error'

export async function loadOrders({ data, db, user: { id: user_id } }) {
	console.log('loading orders')

	return [
		{
			number: 1,
			date: '1/10/1990',
			quantity: 1,
			price: '1',
			status: 'processed',
			download: 'icons',
			barcodes: [111111, 222221],
		},
		{
			number: 2,
			date: '1/10/1991',
			quantity: 2,
			price: '2',
			status: 'completed',
			download: 'icons',
			barcodes: [11112, 222222],
		},
		{
			number: 3,
			date: '1/10/1992',
			quantity: 3,
			price: '3',
			status: 'canceled',
			download: 'icons',
			barcodes: [111113, 222223],
		},
		{
			number: 4,
			date: '1/10/1993',
			quantity: 4,
			price: '4',
			status: 'processed',
			download: 'icons',
			barcodes: [111114, 222224],
		},
	]
}
