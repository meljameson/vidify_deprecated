import styled from 'styled-components'
import React from 'react'
import { authorize } from '../utils'
import FlexContainer from './FlexContainer'

const Button = styled.button`
text-align: center;   
color: #fff;
background-color: #1db954;
border-radius: 500px;
padding: 16px 48px 18px;
transition-duration: .3s;
border-width: 0;
letter-spacing: 2px;
min-width: 160px;
text-transform: uppercase;
transition-property: background-color, border-color, color, box-shadow, filter;
&:hover {
  background-color: #1ed760;
}
input[type="button"]:focus {
  outline: none;
}
`

const Login = () => (
  <FlexContainer>
    <Button onClick={authorize}>Request playlists from Spotify</Button>
    U: ctipz26m2f77but6w9nu262e1
    P: DemoAccount
  </FlexContainer>
)

export default Login