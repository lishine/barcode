import React from 'react'
import memoize from 'memoize-state'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export function miniConnect({ selectors, actions, render }) {
	connect(
		mem(selectors),
		actions
	)(render)
}

const mem = o =>
	memoize((s, p) =>
		Object.entries(o).reduce(
			(acc, [key, func]) => Object.assign(acc, { [key]: func(s, p) }),
			{}
		)
	)

const wrapInDispatch = (o, dispatch) =>
	Object.entries(o).reduce(
		(acc, [key, func]) => Object.assign(acc, { [key]: dispatch(func) }),
		{}
	)

export const withContext = ({
	selectors,
	actions,
	calls,
	ContextProvider,
}) => component =>
	connect(
		mem(selectors),
		dispatch => Object.assign(bindActionCreators(actions, dispatch), calls)
	)(props => {
		const el = React.createElement(
			ContextProvider['Provider'],
			{ value: { ...props } },
			component
		)
		console.log('el', el)
		return el
	})
