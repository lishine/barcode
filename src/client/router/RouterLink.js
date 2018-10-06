// import matchPath from 'rudy-match-path'

import { routesMap } from 'router/routes'
import { actionToPath } from 'redux-saga-first-router'
import { getLocation } from 'router/selectors'

class Link extends React.PureComponent {
	_onClick = e => {
		e.preventDefault()
		if (this.props.onClick) {
			this.props.onClick()
			if (this.props.to) {
				dispatch(this.props.to)
			}
		}
	}

	// componentWillReceiveProps(nextProps) {
	// 	for (const index in nextProps) {
	// 		if (nextProps[index] !== this.props[index]) {
	// 			console.log(index, this.props[index], '-->', nextProps[index])
	// 		}
	// 	}
	// }

	render() {
		const {
			dispatch,
			disabled,
			to,
			onClick,
			className,
			activeClassName,
			isActive,
			location,
			...props
		} = this.props

		const path = actionToPath(routesMap, to)
		// const currentPath = window.pathname
		// const match = matchPath(currentPath, { path, exact: true, strict })
		// const active = !!(isActive ? isActive(match, location) : match)
		let active
		if (isActive) {
			active = isActive()
		}
		console.log('active', active)
		console.log('activeClassName', activeClassName)
		const combinedClassName = active
			? [className, activeClassName].filter(i => i).join(' ')
			: className
		console.log('combinedClassName', combinedClassName)
		const href = to ? path : '#'
		console.log('href', href)

		return (
			<a {...props} href={href} className={combinedClassName} onClick={this._onClick}>
				{this.props.children}
			</a>
		)
	}
}

export const RouterLink = connect({ location: getLocation })(Link)
