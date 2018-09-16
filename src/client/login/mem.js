import memoize from 'memoize-state'

export const mem = (o) => {
	return memoize((s, p) =>
		Object.entries(o).reduce(
			(acc, [key, func]) => Object.assign(acc, { [key]: func(s, p) }),
			{}
		)
	)
}
