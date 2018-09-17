import styled from 'styled-components'

export const DefaultButton = styled.button`
text-align: center;   
background-color: #1db954;
transition-duration: .3s;
border-width: 0;
text-transform: uppercase;
color: #fff;
&:hover {
  background-color: #1ed760;
}
input[type="button"]:focus {
  outline: none;
}
`

export const LoginButton = styled(DefaultButton)` 
border-radius: 500px;
padding: 16px 48px 18px;
letter-spacing: 2px;
min-width: 160px;
`

export const ToolbarButton = styled(DefaultButton)` 
font-size: 2rem;
width: 100%;
`