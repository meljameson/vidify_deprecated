import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-self: center;
  width: 25%;
  height: 100%;
  flex-flow: column;
  margin: auto;
  justify-content: center;
`

const Button = styled.a`
  text-align: center;   
  color: #fff;
  background-color: #1db954;
  border-radius: 500px;
  padding: 1.5rem;
  border-width: 0;
  letter-spacing: 2px;
  min-width: 160px;
  text-transform: uppercase;
`

class Login extends Component {
  refreshToken = (refresh_token) => {
    fetch('/refresh_token', {
      body: JSON.stringify(refresh_token: refresh_token)
    })
      .then(response => console.log(response))
      .catch(error => console.error(error))
  }

  getHashParams = () => {
    let hashParams = {}
    let e
    let r = /([^&;=]+)=?([^&;]*)/g
    let q = window.location.hash.substring(1)
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2])
    }
    return hashParams
  }

  authenticate = () => {
    let params = this.getHashParams()
    let access_token = params.access_token
    let refresh_token = params.refresh_token
    let error = params.error

    if (error) {
      alert('There was an error during the authentication');
    } else {
      if (access_token) {
        fetch('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': 'Bearer ' + access_token
          }
        })
          .then(response => console.log(response))
          .catch(error => console.error(error))
      } else {
        // reroute back to login
      }
    }
  }

  login = () => {
    window.location.href = 'http://localhost:4000/login'
  }

  render() {
    return (
      <Container>
        <Button onClick={this.login}>Log in with Spotify</Button>
      </Container>
    )
  }
}

export default Login