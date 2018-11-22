import axios from 'axios'
import path from 'path'
import fs from 'fs'

export async function downloadFile(url, filename) {
	const pathname = path.resolve(__dirname, '../../../../public/files', filename)

	const response = await axios({
		method: 'GET',
		url: url,
		responseType: 'stream',
	})

	response.data.pipe(fs.createWriteStream(pathname))

	return new Promise((resolve, reject) => {
		response.data.on('end', () => {
			resolve()
		})

		response.data.on('error', err => {
			reject(err)
		})
	})
}
