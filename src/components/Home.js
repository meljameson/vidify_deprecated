import React, { Component } from 'react'
import { AppWrapper, PlayerWrapper, Playlist, Row } from '../styled'
import Player from './Player'
import { authorize, getToken } from '../utils'
import { connect } from 'react-redux'
import { fetchSongs, fetchPlaylists, fetchVideo, fetchUser, setToken } from '../actions'
import { selectSongs, selectPlaylists, selectUser, selectToken, selectVideo } from '../selectors'
import Login from './Login'

class Home extends Component {
  componentWillMount() {
    console.log('mounting')
    const { token, setToken } = this.props
    if (!token) setToken(getToken())
  }

  componentDidUpdate() {
    const { user, fetchUser, token, fetchPlaylists, playlists, video, songs } = this.props
    if (!user && token) fetchUser(token)
    if (token && user && !playlists) fetchPlaylists(user, token)
    if (!video && songs) {
      const { name, artists, album } = songs[0]
      this.searchVideo(name, artists, album)
    }
  }

  searchVideo = (name, artists, album) => {
    const query = `${name} ${artists.map(({ name }) => name).join(' ')} ${album}`
    const result = query.split('undefined').filter(item => !!item).join(' ')
    this.props.fetchVideo(result)
  }

  renderSongs = items => items.map(({ name, id, artists, album }) => (
    <Row
      key={id}
      onClick={() => this.searchVideo(name, artists, album)}
    >
      {`${name} by ${artists.map(({ name }) => name)}`}
    </Row>
  ))

  renderPlaylists = playlists => (playlists.map(({ name, image, id, total }) => (
    <Row
      key={id}
      onClick={() => {
        this.props.fetchSongs(this.props.userId, this.props.token, id)
      }}
    >
      <img style={{ height: '3rem', width: '3rem' }} src={image} /> {/* TODO: style */}
      {name} ({total})
    </Row>
  )))


  render() {
    const { playlists, songs, user, video } = this.props
    return (
      user ?
        (<AppWrapper>
          <PlayerWrapper>
            <Player selectedVideo={video} />
          </PlayerWrapper>
          <Playlist>
            {(songs && this.renderSongs(songs)) || (playlists && this.renderPlaylists(playlists))}
          </Playlist>
        </AppWrapper>) :
        <Login onClick={authorize}>Log in to load Spotify playlists</Login>
    )
  }
}

const mapStateToProps = state => ({
  songs: selectSongs(state),
  playlists: selectPlaylists(state),
  video: selectVideo(state),
  user: selectUser(state),
  token: selectToken(state)
})

export default connect(mapStateToProps, { fetchPlaylists, fetchSongs, fetchVideo, fetchUser, setToken })(Home)