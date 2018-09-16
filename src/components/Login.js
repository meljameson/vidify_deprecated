import styled from 'styled-components'
import React from 'react'
import { authorize } from '../utils'
import Icon from './Icon'
import FlexContainer from '../styled/FlexContainer'

const Button = styled.button`
text-align: center;   
background-color: #1db954;
border-radius: 500px;
padding: 16px 48px 18px;
transition-duration: .3s;
border-width: 0;
letter-spacing: 2px;
min-width: 160px;
text-transform: uppercase;
color: #fff;
transition-property: background-color, border-color, color, box-shadow, filter;
&:hover {
  background-color: #1ed760;
}
input[type="button"]:focus {
  outline: none;
}
`

const Login = () => (
  <FlexContainer style={{ flexDirection: 'column' }}>
    <div style={{ textAlign: 'center', fontSize: '2rem' }}>
      Vidify your Spotify. Pick a playlist. Get the videos.
    </div>
    <Button style={{ margin: '2.5rem' }} onClick={authorize}>Request playlists from Spotify</Button>
    <div style={{ textAlign: 'center', fontSize: '.75rem' }}>
      Feel free to use your account. No data is stored. Here's a demo account if you want it. <br />
      User: ctipz26m2f77but6w9nu262e1 <br />
      Pass: DemoAccount <br />
    </div >
  </FlexContainer >
)

export default Login