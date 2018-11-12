import React from 'react'
import { connect } from 'react-redux'
import { authenticate } from 'actions/user'
import { FlexContainer, LoginButton } from 'styled'

const Login = ({ authenticate }) => (
  <FlexContainer style={{ flexDirection: 'column' }}>
    <div style={{ textAlign: 'center', fontSize: '2rem' }}>
      Vidify your Spotify. Pick a playlist. Get the videos.
    </div>
    <div style={{ display: 'flex', alignItems: 'center', height: '10rem' }}>
      <LoginButton onClick={authenticate}>Request playlists from Spotify</LoginButton>
    </div>
  </FlexContainer >
)

export default connect(null, { authenticate })(Login)