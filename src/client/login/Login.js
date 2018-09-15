import React, { Component, Fragment } from 'react'
import Link from 'redux-first-router-link'
import styled from 'styled-components'

import Modal from './Modal'
import SignUp from './form/sign-up/SignUp'

export default ({ children }) => (
	<Modal isOpen>
		<SignUp />
	</Modal>
)
