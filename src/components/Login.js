import React, { Component } from 'react'
import styled from 'styled-components'
import spotifyLogo from '../styles/Spotify_Logo_RGB_White.png'

const Container = styled.div`
  display: flex;
  align-self: center;
  width: 25%;
  height: 100%;
  flex-flow: column;
  margin: auto;
  justify-content: center;
`

const Text = styled.input`
  margin-bottom: 1rem;
  border-radius: 2px;
  padding: 1em .75em .6875em;
  border: 1px solid #dfe0e6;
  color: #1c1c1f;
  font-size: .9375em;
`

const Button = styled.div`
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
  white-space: normal;
  transition-property: background-color,border-color,color,box-shadow,filter,-webkit-box-shadow,-webkit-filter;
`

class Login extends Component {
  render() {
    return (
      <Container>
        <Text type='email' placeholder='Email' required />
        <Text type='password' placeholder='Password' required />
        <Button onClick={this.authenticate}>Login with Spotify</Button>
      </Container>
    )
  }
}

export default Login

const refreshToken = (refresh_token) => {
  // $.ajax({
  //   url: '/refresh_token',
  //   data: {
  //     'refresh_token': refresh_token
  //   }
  // }).done(function(data) {
  //   access_token = data.access_token
  //   console.log('REFRESH SUCCESS')
  // })
}

const getHashParams = () => {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while (e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

const authenticate = () => {
  let params = getHashParams()
  let access_token = params.access_token
  let refresh_token = params.refresh_token
  let error = params.error

  if (error) {
    alert('There was an error during the authentication');
  } else {
    if (access_token) {
      // render oauth info
      // $.ajax({
      //     url: 'https://api.spotify.com/v1/me',
      //     headers: {
      //       'Authorization': 'Bearer ' + access_token
      //     },
      //     success: function(response) {
      //       // route to home
      //       console.log('response', response)
      //     }
      // })
    } else {
      // reroute back to login
    }
  }
}