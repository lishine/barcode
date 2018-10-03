import { routesMap } from './routes'
import { actionToPath } from 'redux-saga-first-router'

export default class Link extends React.Component {
	_onClick = e => {
		e.preventDefault()
		if (this.props.onClick) {
			this.props.onClick()
			if (this.props.to) {
				dispatch(this.props.to)
			}
		}
	}

	render() {
		const { disabled, to, onClick, ...props } = this.props
		const href = to ? actionToPath(routesMap, to) : '#'
		return (
			<a {...props} href={href} onClick={this._onClick}>
				{this.props.children}
			</a>
		)
	}
}
