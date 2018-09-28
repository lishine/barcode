import { default as lodashSome } from 'lodash/fp/some'
import axios from 'axios'

export const some = (value, array) => lodashSome(v => v === value)(array)

export const mapToObject = func => array =>
	reduce((acc, value) => Object.assign(acc, func(value)), {})(array)

export const Map = ({ collection, children }) => <>{map(children)(collection)}</>

export function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

/// ////// Functional switch
const resolve = resolvedValue => ({
	is: () => resolve(resolvedValue),
	else: () => resolvedValue,
})

export const when = expr => ({
	is: (constExpr, value) => (expr === constExpr ? resolve(value) : when(expr)),
	else: defaultValue => defaultValue,
})
/// / !!!!! MUST USE ELSE !!!!
// export const whenTrue = expr => {
// 	then: value => (expr ? value : when(expr)),
// 	else: defaultValue => defaultValue,
// }

/// ////////////////

export function toto(p) {
	const promise = get('promise')(p) || p
	const timeOut = get('timeOut')(p)
	return timeOutPromise({ promise, timeOut })
		.then(data => ({ data }))
		.catch(err => {
			if (err.message === 'timeOut') {
				return { timeOut: true }
			} else {
				return { err }
			}
		})
}

function timeOutPromise({ timeOut, promise }) {
	let handle
	if (!timeOut) {
		return promise
	}

	return Promise.race([
		promise,
		new Promise((resolve, reject) => {
			handle = setTimeout(() => {
				reject(new Error('timeOut'))
			}, timeOut)
		}),
	]).then(
		v => {
			clearTimeout(handle)
			return v
		},
		err => {
			clearTimeout(handle)
			throw err
		}
	)
}

export const post = async (route, data) => {
	const { data: response, err } = await toto(axios.post(route, data))
	console.log('response', response)
	console.log('err', err)

	return { response, err }
}
