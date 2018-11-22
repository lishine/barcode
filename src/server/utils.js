import humps from 'humps'

export function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export function camelizeColumns(data) {
	var template = data[0] || data
	for (var prop in template) {
		var camel = humps.camelize(prop)
		if (!(camel in template)) {
			for (var i = 0; i < data.length; i++) {
				var d = data[i]
				d[camel] = d[prop]
				delete d[prop]
			}
		}
	}
}

export function decamelizeColumns(data) {
	var template = data[0] || data
	for (var prop in template) {
		var camel = humps.decamelize(prop)
		if (!(camel in template)) {
			for (var i = 0; i < data.length; i++) {
				var d = data[i]
				d[camel] = d[prop]
				delete d[prop]
			}
		}
	}
}
