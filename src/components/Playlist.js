import React, { Component } from 'react'
import { Row, Title, PlaylistButton, List, PlaylistWrapper, Header, Album, FlexContainer } from '../styled'
import { fetchSongs, fetchPlaylists, fetchVideo, fetchUser } from '../actions'
import { selectSongs, selectPlaylists, selectAuth, selectVideo } from '../selectors/selectors'
import { connect } from 'react-redux'
import Loading from './Loading'

class Playlist extends Component {
  state = {
    showSongs: false,
    currentPlaylist: null
  }

  componentDidMount() {
    const { user, fetchPlaylists, playlists } = this.props
    if (user && !playlists) fetchPlaylists()
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

  renderSongs = songs => songs.map(({ name, id, artists, album, images }, i) => {
    let style = ((!this.props.currentSong && i === 0) || (id === this.props.currentSong)) ? { backgroundColor: '#1db954' } : {}
    return (
      <Row
        style={style}
        key={id}
        onClick={() => {
          this.props.changeCurrentSong(id)
          this.searchVideo(name, artists, album)
        }}
      >
        <Album alt={`${name} album art`} src={(images && images[0].url)} />
        {`${name} by ${artists.map(({ name }) => name)}`}
      </Row>
    )
  })

  renderPlaylists = playlists => playlists.map(({ name, image, id, total }) => (
    <Row
      key={id}
      onClick={() => {
        this.setState({ currentPlaylist: name })
        this.toggleShowSongs()
        this.props.changeCurrentSong(null)
        this.props.fetchSongs(id)
      }}
    >
      <Album alt={`${name} album art`} src={image} />
      <Title>{name}</Title>
    </Row>
  ))

  toggleShowSongs = () => this.setState({ showSongs: !this.state.showSongs })

  render() {
    const { playlists, songs, isFetching = true, error = false } = this.props

    return (
      error
        ? <FlexContainer>Error loading request</FlexContainer>
        : isFetching
          ? <Loading>Loading playlists...</Loading>
          : (
            <PlaylistWrapper>
              {this.state.showSongs && (
                <Header>
                  <div style={{ paddingBottom: '1rem', textAlign: 'center', fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    {this.state.currentPlaylist}
                  </div>
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
    )
  }
}

const mapStateToProps = state => {
  const { user, isFetching: authFetching, error: authError } = selectAuth(state) // ew
  const { items: songs, isFetching: songFetching, error: songError } = selectSongs(state) // ew
  const { items: playlists, isFetching: playlistFetching, error: playlistError } = selectPlaylists(state) // ew
  const { id: video, isFetching: videoFetching, error: videoError } = selectVideo(state) // ew
  const isFetching = authFetching || songFetching || playlistFetching || videoFetching // ew
  const error = authError || songError || playlistError || videoError // ewww

  return {
    user,
    songs,
    video,
    playlists,
    isFetching,
    error
  }
}

export default connect(mapStateToProps, { fetchPlaylists, fetchSongs, fetchUser, fetchVideo })(Playlist)