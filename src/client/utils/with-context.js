import memoize from 'memoize-state'
import { connect as rrConnect } from 'react-redux'

const mem = o =>
	memoize((s, p) =>
		Object.entries(o).reduce((acc, [key, func]) => Object.assign(acc, { [key]: func(s, p) }), {})
	)

export const connect = selectors => rrConnect(mem(selectors))

// const wrapInDispatch = (o, dispatch) =>
// 	Object.entries(o).reduce(
// 		(acc, [key, func]) => Object.assign(acc, { [key]: dispatch(func) }),
// 		{}
// 	)

// export const withContext = ({ selectors, actions, calls, ContextProvider }) => Component =>
// 	rrConnect(mem(selectors), dispatch => Object.assign(bindActionCreators(actions, dispatch), calls))(
// 		props => {
// 			const CP = ContextProvider['Provider']
// 			return (
// 				<CP value={props}>
// 					<Component />
// 				</CP>
// 			)
// 		}
// 	)

// <ContextProvider['Provider'], { value: { ...props } }, component)
