import React from 'react'
import { authorize } from '../utils'
import { FlexContainer, LoginButton } from '../styled'

const Login = () => (
  <FlexContainer style={{ flexDirection: 'column' }}>
    <div style={{ textAlign: 'center', fontSize: '2rem' }}>
      Vidify your Spotify. Pick a playlist. Get the videos.
    </div>
    <LoginButton style={{ margin: '2.5rem' }} onClick={authorize}>Request playlists from Spotify</LoginButton>
    <div style={{ textAlign: 'center', fontSize: '.75rem' }}>
      Feel free to use your account. No data is stored. Here's a demo account if you want it. <br />
      User: ctipz26m2f77but6w9nu262e1 <br />
      Pass: DemoAccount <br />
    </div >
  </FlexContainer >
)

export default Login