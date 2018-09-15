import React, { Component, Fragment } from 'react'
import { Field } from 'formik'

import Input from './local/Input'

export default (props) => {
	console.log('props', props)
	return <Input {...props} autoComplete="email" type="text" placeholder="Email" />
}
