import React from 'react'
import { authorize } from '../utils'
import { FlexContainer, LoginButton } from '../styled'

const Login = () => (
  <FlexContainer style={{ flexDirection: 'column' }}>
    <div style={{ textAlign: 'center', fontSize: '2rem' }}>
      Vidify your Spotify. Pick a playlist. Get the videos.
    </div>
    <div style={{ display: 'flex', alignItems: 'center', height: '10rem' }}>
      <LoginButton onClick={authorize}>Request playlists from Spotify</LoginButton>
    </div>
    <div style={{ textAlign: 'center', fontSize: '.75rem' }}>
      Here's a demo account if you don't want to use your own <br />
      User: ctipz26m2f77but6w9nu262e1 <br />
      Pass: DemoAccount <br />
    </div >
  </FlexContainer >
)

export default Login