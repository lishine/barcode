import styled from 'styled-components'

export default styled.input`
	width: 300px;
	height: 35px;
	background: #222;
	text-align: left;
	color: yellow;
	border: ${props => props.border || '1px solid #ccc'};
`
