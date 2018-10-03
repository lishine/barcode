import styled, { css } from 'styled-components'

export default styled.input`
	border: 0px;
	border-bottom: 6px solid red;
	width: 200px;
	height: 35px;
	background: rgba(0, 0, 0, 0);
	text-align: left;
	color: yellow;
	border: ${props => props.border || '1px solid #ccc'};
	${({ readOnly }) =>
		readOnly &&
		css`
			background: rgba(0, 0, 0, 0);
			border: 1px solid rgba(0, 0, 0, 0);
		`};
`
