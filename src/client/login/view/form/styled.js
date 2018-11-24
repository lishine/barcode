import styled from 'styled-components'
import { Submit as BaseSubmit } from 'common/form/Submit'
import { RouterLink } from 'router/RouterLink'
import * as inputs from 'common/form/inputs'

export const Email = styled(inputs.Email)`
	margin-bottom: 10px;
`
export const Password = styled(inputs.Password)`
	margin-bottom: 10px;
`
export const PasswordConfirmation = styled(inputs.PasswordConfirmation)`
	margin-bottom: 10px;
`
export const Name = styled(inputs.Name)`
	margin-bottom: 10px;
`

export const Link = styled(RouterLink)`
	margin-top: -5px;
	color: blue;
	font-size: 1.1em;
`
export const Container = styled.div`
	width: 320px;
	height: 100%;
	padding-right: 20px;
	padding-left: 20px;
	padding-bottom: 20px;
`
export const FieldRow = styled.div`
	margin-bottom: 15px;
	display: flex;
	flex-direction: column;
`

export const Form = styled.form`
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
	justify-content: space-between;
	align-items: space-between;
	align-content: space-between;
`

export const Title = styled.h1`
	text-align: center;
	padding-top: 20px;
	padding-bottom: 30px;
	margin: auto;
	font-family: 'Raleway', sans-serif;
	font-weight: 600;
	color: #4d4d4d;
	font-size: 1.2em;
`

export const Submit = styled(BaseSubmit)`
	margin-top: 20px;
	&.pb-container {
		text-align: center;
		width: 100%;
	}
	&.pb-container .pb-button {
		height: 60;
	}
	&.pb-container .pb-button span {
		color: #ffffff;
		font-size: 1.7em;
		font-weight: 400;
	}
`
