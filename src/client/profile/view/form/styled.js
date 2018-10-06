import styled from 'styled-components'

import { RouterLink } from 'router/Link'

export const Link = styled(RouterLink)`
	font-size: 1em;
	font-weight: 100;
	color: ${({ disabled }) => (disabled ? '#ccc' : '#00f')};
`

export const Button = styled.button`
	font-size: 0.8em;
	font-weight: 100;
	width: 80px;
	height: 25px;
	background-color: #5995ef;
	color: #fff;
	border-radius: 3px;
`

export const Row = styled.div`
	display: flex;
	flex-grow: 1;
`
export const FieldRow = styled(Row)`
	padding-bottom: 10px;
`
export const SubmitRow = styled(Row)`
	// padding-top: 20px;
	// padding-bottom: 20px;
`
export const GroupHeaderRow = styled(Row)`
	min-height: 30px;
	font-size: 1.2em;
	font-weight: 600;
	padding-top: 20px;
	padding-bottom: 20px;
`

export const ErrorRow = styled.div`
	text-align: center;
	padding-bottom: 20px;
	margin: auto;
	font-size: 1.2em;
	font-weight: 600;
	color: red;
`

export const Col = styled.div`
	display: flex;
	flex-grow: 0;
	width: 100%;
	margin: auto;
	justify-content: flex-start;
`

// justify-content="flex-start"
// align-content="flex-start"
// align-self="flex-start"
// align-items="flex-start">

export const Container = styled.div`
	width: 500px;
	margin: auto;
	height: 100%;
`

export const Form = styled.form`
	// flex-direction: column;
	// justify-content: space-between;
	// align-items: space-between;
	// align-content: space-between;
`

export const Title = styled.h1`
	text-align: center;
	padding-bottom: 20px;
	margin: auto;
	font-family: 'Raleway', sans-serif;
	font-weight: 600;
	color: #4d4d4d;
	font-size: 1.2em;
`
