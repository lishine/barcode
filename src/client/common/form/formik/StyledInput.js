import styled, { css } from 'styled-components'

export default styled.input`
	border-bottom: 6px solid red;
	width: 200px;
	height: 35px;
	background: #222;
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
