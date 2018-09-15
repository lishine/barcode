import React, { Component } from 'react'
import Link from 'redux-first-router-link'
import { connect } from 'react-redux'
import styled, { injectGlobal } from 'styled-components'

export const LinkButton = styled(Link)`
	border-radius: 3px;
	padding: 0.25em 1em;
	margin: 0 1em;
	background: transparent;
	color: palevioletred;
	border: 2px solid palevioletred;
`
export const Button = styled.button`
	border-radius: 3px;
	padding: 0.25em 1em;
	margin: 0 1em;
	background: transparent;
	color: palevioletred;
	border: 2px solid palevioletred;
`
