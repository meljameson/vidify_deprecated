import React, { Component } from 'react'
import { Row, Title, ToolbarButton, List, PlaylistWrapper } from '../styled'
import { fetchSongs, fetchPlaylists, fetchVideo, fetchUser } from '../actions'
import { selectSongs, selectPlaylists, selectUser, selectToken, selectVideo } from '../selectors'
import { connect } from 'react-redux'

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
    const { playlists, songs } = this.props

    return (
      <PlaylistWrapper>
        {this.state.showSongs && (
          <header>
            <ToolbarButton onClick={this.toggleShowSongs}>
              &larr;
            </ToolbarButton>
          </header>
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
}

const mapStateToProps = state => ({
  songs: selectSongs(state),
  playlists: selectPlaylists(state),
  user: selectUser(state),
  token: selectToken(state),
  video: selectVideo(state),
})

export default connect(mapStateToProps, { fetchPlaylists, fetchSongs, fetchUser, fetchVideo })(Playlist)