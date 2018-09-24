import styled from 'styled-components'

export const DefaultButton = styled.button`
text-align: center;   
background-color: pink;
transition-duration: .3s;
border-width: 0;
text-transform: uppercase;
color: #000;
cursor: pointer;
&:hover {
  background-color: pink;
}
&:focus {
  outline: none;
}
`

export const LoginButton = styled(DefaultButton)` 
border-radius: 500px;
padding: 16px 48px 18px;
min-width: 160px;
`

export const PlaylistButton = styled(DefaultButton)` 
font-size: 2rem;
width: 100%;
`