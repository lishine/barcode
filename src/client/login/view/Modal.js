import Link from 'redux-first-router-link'
import Modal from 'react-modal'
import styled from 'styled-components'

const style = {
	overlay: {
		backgroundColor: 'gba(0, 0, 0, 0)',
	},
	content: {
		marginRight: '-50%',
		transform: 'translate(-50%, -180px)',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		border: '1px solid #ccc',
		color: 'yellow',
		background: '#f4f6f8',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch',
		borderRadius: '4px',
		outline: 'none',
		padding: '0px',
		// width: 320,
		// height: 420,
	},
}

Modal.setAppElement('#root')

export default props => (
	<Modal {...props} style={style}>
		{props.children}
	</Modal>
)
