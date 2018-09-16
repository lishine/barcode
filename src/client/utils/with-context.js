import React from 'react'
import memoize from 'memoize-state'
import { connect } from 'react-redux'

const mem = (o) => {
	return memoize((s, p) =>
		Object.entries(o).reduce(
			(acc, [key, func]) => Object.assign(acc, { [key]: func(s, p) }),
			{}
		)
	)
}

export const withContext = ({ selectors, actions, ContextProvider }) => (
	component
) =>
	connect(
		mem(selectors),
		actions
	)((props) => {
		const el = React.createElement(
			ContextProvider['Provider'],
			{ value: { ...props } },
			component
		)
		console.log('el', el)
		return el
	})
