import { default as lodashSome } from 'lodash/fp/some'

const resolve = resolvedValue => ({
	is: () => resolve(resolvedValue),
	else: () => resolvedValue,
})

export const some = (value, array) => lodashSome(v => v === value)(array)

export const mapToObject = func => array =>
	reduce((acc, value) => Object.assign(acc, func(value)), {})(array)

export const Map = ({ collection, children }) => <>{map(children)(collection)}</>

export function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

/// ////// Functional switch
export const when = expr => ({
	is: (constExpr, value) => (expr === constExpr ? resolve(value) : when(expr)),
	else: defaultValue => defaultValue,
})

/// ////////////////
