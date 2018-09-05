import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
display: flex;
height: 100%;
width: 75%;
margin: auto;
align-items: center;
`

const Player = styled.div`
min-width: 430px;
border: 1px white solid;
width: 75%;
height: 70%;
`

const Playlist = styled.div`
min-width: 215px;
border: 1px white solid;
width: 25%;
height: 70%;
overflow: auto;
`

const Row = styled.div`
padding: 1rem;
color: white;
/* TODO: Style rows */
`

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      renderSongs: false,
      token: this.getToken(),
      userId: null,
      playlists: {
        total: null,
        previous: null,
        offset: null,
        next: null,
        limit: null,
        items: null
      },
      songs: {
        total: null,
        previous: null,
        offset: null,
        next: null,
        limit: null,
        items: null
      }
    }
  }

  componentDidMount() {
    this.authorize()
  }

  authorize = () => {
    const { token } = this.state

    if (!token) {
      const scopes = 'playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private'
      const redirect_uri = 'http://localhost:3000/callback'
      const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&response_type=token&redirect_uri=${redirect_uri}`
      window.location.href = authorizeUrl
    } else {
      this.setState({ token })
      this.fetchUser(token)
    }
  }

  getToken = () => {
    let hashParams = {}
    let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1)
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2])
      e = r.exec(q)
    }
    const { access_token } = hashParams
    return access_token
  }

  fetchUser = token => {
    const request = new Request('https://api.spotify.com/v1/me', {
      headers: new Headers({
        'Authorization': 'Bearer ' + token
      })
    })

    fetch(request)
      .then(res => res.statusText === "Unauthorized" ? this.authorize() : res.json())
      .then(({ id }) => this.setState({ userId: id }, () => this.fetchPlaylists(this.state.userId, token)))
      .catch(err => console.error(err)) // TODO: toast on fail
  }

  fetchPlaylists = (userId, accessToken) => {
    const request = new Request(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    })

    fetch(request)
      .then(res => res.statusText === "Unauthorized" ? this.authorize() : res.json())
      .then(({ total, previous, offset, next, limit, items }) => this.setState({ playlists: { total, previous, offset, next, limit, items } }))
      .catch(err => console.error(err))
  }

  fetchSongs = (playlistId) => {
    const { userId, token } = this.state
    const request = new Request(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + token
      })
    })

    fetch(request)
      .then(res => res.json())
      .then(({ total, previous, offset, next, limit, items }) => this.setState({ songs: { total, previous, offset, next, limit, items }, renderSongs: true }))
      .catch(err => console.error(err))
  }

  play = (id) => id

  renderSongs = ({ items }) => items.map(({ track: { name, id, artists, album: { name: album } } }) => (
    <Row
      key={id}
      onClick={() => this.play(id)}
    >
      {
        `${name} by ${artists.map(({ name }) => name)}`
      }
    </Row>
  ))

  renderPlaylists = ({ items }) => items.map(({ external_urls, images, name, id }) => (
    <Row
      key={id}
      onClick={() => this.fetchSongs(id)}
    >
      {name}
    </Row>
  ))

  render() {
    const { playlists, songs, renderSongs } = this.state

    return (
      <Container>
        <Player />
        <Playlist>
          {
            renderSongs ? this.renderSongs(songs) : playlists.items && this.renderPlaylists(playlists)
          }
        </Playlist>
      </Container>
    )
  }
}

export default Home