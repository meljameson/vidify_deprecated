import React, { Component } from 'react'
import { Row, Title, PlaylistButton, List, PlaylistWrapper, Header } from '../styled'
import { fetchSongs, fetchPlaylists, fetchVideo, fetchUser } from '../actions/actions'
import { selectSongs, selectPlaylists, selectAuth, selectVideo } from '../selectors/selectors'
import { connect } from 'react-redux'
import Loading from './Loading'

class Playlist extends Component {
  state = {
    showSongs: false
  }

  componentDidMount() {
    const { user, token, fetchPlaylists, playlists } = this.props
    if (token && user && !playlists) fetchPlaylists(user, token)
  }

  componentDidUpdate({ songs: prevSongs }) {
    const { video, songs } = this.props
    if (!prevSongs && songs) this.setState({ showSongs: true })
    if (!video && songs) {
      const { name, artists, album } = songs[0]
      this.searchVideo(name, artists, album)
    }
  }

  searchVideo = (song, artists, album) => {
    this.props.fetchVideo({ song, artists, album })
  }

  renderSongs = songs => songs.map(({ name, id, artists, album, images }) => (
    <Row
      key={id}
      onClick={() => this.searchVideo(name, artists, album)}
    >
      <img style={{ margin: '.5rem', height: '3rem', width: '3rem' }} alt={`${name} album art`} src={(images && images[0].url)} />
      {`${name} by ${artists.map(({ name }) => name)}`}
    </Row>
  ))

  renderPlaylists = playlists => playlists.map(({ name, image, id, total }) => (
    <Row
      key={id}
      onClick={() => {
        this.toggleShowSongs()
        this.props.fetchSongs(this.props.userId, this.props.token, id)
      }}
    >
      <img style={{ margin: '.5rem', height: '3rem', width: '3rem' }} alt={`${name} album art`} src={image} />
      <Title>{name}</Title>
    </Row>
  ))

  toggleShowSongs = () => this.setState({ showSongs: !this.state.showSongs })

  render() {
    const { playlists, songs, isFetching = true, error = false } = this.props

    return (
      <div>
        {
          error ? 'Error loading request' : isFetching ? <Loading /> : (
            <PlaylistWrapper>
              {this.state.showSongs && (
                <Header>
                  <PlaylistButton onClick={this.toggleShowSongs}>
                    &larr;
              </PlaylistButton>
                </Header>
              )}
              <List>
                {
                  this.state.showSongs
                    ? songs && this.renderSongs(songs)
                    : playlists && this.renderPlaylists(playlists)
                }
              </List>
            </PlaylistWrapper>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { user, token, isFetching: authFetching, error: authError } = selectAuth(state) // ew
  const { items: songs, isFetching: songFetching, error: songError } = selectSongs(state) // ew
  const { items: playlists, isFetching: playlistFetching, error: playlistError } = selectPlaylists(state) // ew
  const { id: video, isFetching: videoFetching, error: videoError } = selectVideo(state) // ew
  const isFetching = authFetching || songFetching || playlistFetching || videoFetching // ew
  const error = authError || songError || playlistError || videoError // ewww

  return {
    user,
    token,
    songs,
    video,
    playlists,
    isFetching,
    error
  }
}

export default connect(mapStateToProps, { fetchPlaylists, fetchSongs, fetchUser, fetchVideo })(Playlist)