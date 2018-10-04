import styled, { css } from 'styled-components'

export default styled.input.attrs({
	className: props => (props.line ? 'line' : 'text'),
})`
	&.line {
		color: blue;
	}
	border: 0px;
	border-bottom: 6px solid red;
	width: ${props => props.width || '300'};
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
