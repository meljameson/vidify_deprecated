import React from 'react'
import { authenticate } from '../actions'
import { FlexContainer, LoginButton } from '../styled'
import { connect } from 'react-redux'

const Login = ({ authenticate }) => (
  <FlexContainer style={{ flexDirection: 'column' }}>
    <div style={{ textAlign: 'center', fontSize: '2rem' }}>
      Vidify your Spotify. Pick a playlist. Get the videos.
    </div>
    <div style={{ display: 'flex', alignItems: 'center', height: '10rem' }}>
      <LoginButton onClick={authenticate}>Request playlists from Spotify</LoginButton>
    </div>
    <div style={{ textAlign: 'center', fontSize: '.75rem' }}>
      Feel free to use this demo account if you don't have a Spotify account to test it out <br />
      User: ctipz26m2f77but6w9nu262e1 Pass: DemoAccount
    </div >
  </FlexContainer >
)

export default connect(null, { authenticate })(Login)