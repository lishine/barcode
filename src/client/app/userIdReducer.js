import { NOT_FOUND } from 'redux-first-router'

export default (state = null, action = {}) => {
	switch (action.type) {
		case 'HOME':
		case NOT_FOUND:
			return null
		case 'USER':
			return action.payload.id
		default:
			return state
	}
}
