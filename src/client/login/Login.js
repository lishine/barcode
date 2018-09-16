import React, { Component, Fragment, createContext } from 'react'
import * as forms from './form'
import LoginContainer, { LoginContext } from './LoginContainer'

export default LoginContainer(
	<LoginContext.Consumer>
		{({ page }) => page && forms[page] && React.createElement(forms[page])}
	</LoginContext.Consumer>
)
