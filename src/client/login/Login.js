import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'
import styled from 'styled-components'

import memoize from 'memoize-state'

import Modal from './Modal'
import SignUp from './form/sign-up/SignUp'
import { page, location } from 'store/router'
import { mem } from './mem'

export default connect(
	mem({
		location,
		page,
	})
)(({ page, location }) => {
	console.log('page', page)
	console.log('location', location)
	return (
		<Modal isOpen>
			<SignUp />
		</Modal>
	)
})
