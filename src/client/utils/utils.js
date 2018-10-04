import { call, cancelled, fork, select, put } from 'redux-saga/effects'
import { default as lodashSome } from 'lodash/fp/some'
import { default as fpmap } from 'lodash/fp/map'
import { default as freduce } from 'lodash/fp/reduce'

export const map = fpmap.convert({ cap: false })
export const reduce = freduce.convert({ cap: false })

export const some = (value, array) => lodashSome(v => v === value)(array)

export const mapToObject = func => array =>
	reduce((acc, value, key) => {
		return Object.assign(acc, func(value, key))
	}, {})(array)

export const Map = ({ collection, children, visible = true }) =>
	visible && <>{map(children)(collection)}</>

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

export function toto(p, t) {
	const promise = get('promise')(p) || p
	const timeOut = get('timeOut')(p) || t
	console.log('timeOut', timeOut)
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

export const HALT = async () => new Promise(() => {})

export function* waitForCancel() {
	try {
		yield call(HALT)
	} finally {
		return yield cancelled()
	}
}
