import React, { Component, Fragment } from 'react'
import Link from 'redux-first-router-link'
import styled from 'styled-components'

import Modal from './Modal'
import Form from './Form'

export default ({ children }) => (
	<Modal isOpen>
		<Form />
	</Modal>
)
