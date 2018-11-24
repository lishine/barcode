import styled, { css } from 'styled-components'

export default styled.select`
	width: 200px;
	height: 35px;
	background: transparent;
	text-align: left;
	color: darkgreen;
	border: ${props => props.border || '1px solid #ccc'};
	${({ readOnly }) =>
		readOnly &&
		css`
			margin-left: -5px;
			border: none;
			width: 250px;
			// border: 1px solid rgba(0, 0, 0, 0);
		`};
`
