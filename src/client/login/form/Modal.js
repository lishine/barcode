import React, { Component, Fragment } from 'react'
import Link from 'redux-first-router-link'
import Modal from 'react-modal'
import styled from 'styled-components'

const style = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0)',
	},
	content: {
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		border: '1px solid #ccc',
		color: 'yellow',
		background: '#222',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch',
		borderRadius: '4px',
		outline: 'none',
		padding: '0px',
		width: 320,
		height: 300,
	},
}

Modal.setAppElement('#root')

export default (props) => (
	<Modal {...props} style={style}>
		{props.children}
	</Modal>
)
