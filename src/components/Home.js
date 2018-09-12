import React, { Component } from 'react'
import { AppWrapper, PlayerWrapper, Playlist, Row } from '../styled'
import Player from './Player'
import { authorize, getToken } from '../utils'
import { connect } from 'react-redux'
import { fetchSongs, fetchPlaylists, fetchVideos, fetchUser, setToken } from '../actions'
import { selectSongs, selectPlaylists, selectVideos, selectUser, selectToken, selectCurrentVideo } from '../selectors'
import Login from './Login'

class Home extends Component {
  componentWillMount() {
    const { token, setToken } = this.props
    if (!token) setToken(getToken())
  }

  componentDidUpdate() {
    const { songs, videos, user, fetchUser, fetchVideos, token, fetchPlaylists, playlists } = this.props
    if (!user && token) fetchUser(token)
    if (token && user && !playlists) fetchPlaylists(user, token)
    if (songs && !videos.length) fetchVideos(songs)
  }

  renderSongs = items => items.map(({ name, id, artists, album }) => (
    <Row key={id} >
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
    const { playlists, songs, user, selectedVideo } = this.props

    return (
      user ?
        (<AppWrapper>
          <PlayerWrapper>
            <Player selectedVideo={selectedVideo} />
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
  videos: selectVideos(state),
  user: selectUser(state),
  token: selectToken(state),
  selectedVideo: selectCurrentVideo(state)
})

export default connect(mapStateToProps, { fetchPlaylists, fetchSongs, fetchVideos, fetchUser, setToken })(Home)