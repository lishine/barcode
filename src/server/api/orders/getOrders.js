import { mockedEdnResponse } from './mockedEdnResponse'

export async function getOrders(email) {
	const request = `{:query/type  :query.type/orders-by-email
		:order/owner-email "${email}"}`
	console.log('request', request)
	return mockedEdnResponse
}
