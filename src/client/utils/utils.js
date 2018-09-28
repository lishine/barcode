import { default as lodashSome } from 'lodash/fp/some'

export const some = (value, array) => lodashSome(v => v === value)(array)

export const mapToObject = func => array =>
	reduce((acc, value) => Object.assign(acc, func(value)), {})(array)

export const Map = ({ collection, children }) => <>{map(children)(collection)}</>

export function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

/// ////// Functional switch
const resolve = resolvedValue => ({
	then: () => resolve(resolvedValue),
	is: () => resolve(resolvedValue),
	else: () => resolvedValue,
})

export const when = expr => ({
	is: (constExpr, value) => (expr === constExpr ? resolve(value) : when(expr)),
	else: defaultValue => defaultValue,
})
//// !!!!! MUST USE ELSE !!!!
// export const whenTrue = expr => {
// 	then: value => (expr ? value : when(expr)),
// 	else: defaultValue => defaultValue,
// }

/// ////////////////
