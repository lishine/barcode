import path from 'path'

export async function downloadOrder({ data, db, user: { id: user_id } }) {
	const { what, number } = data
	console.log('downloading what number', what, number)
	console.log('what number', `${what}-${number}${what === 'invoice' ? '.pdf' : '.zip'}`)
	const pathname = path.resolve(
		__dirname,
		'../../../../public/files',
		`${what}-${number}${what === 'invoice' ? '.pdf' : '.zip'}`
	)
	return pathname
}
