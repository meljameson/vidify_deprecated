import React, { Component } from 'react'
import { Row, Title, ToolbarButton } from '../styled'
import { fetchSongs, fetchPlaylists, fetchVideo, fetchUser } from '../actions'
import { selectSongs, selectPlaylists, selectUser, selectToken, selectVideo } from '../selectors'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Content = styled.div`
  flex: 1;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background-color: #f0f0f0;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: var(--black-transparent-20,rgba(0,0,0,0.2));
}
::-webkit-scrollbar-thumb:hover {
    background: #888; 
}
`

const Wrapper = styled.div`
box-sizing: border-box;
align-self: center;
display: flex;
flex-flow: column;
max-height: 100%;
`

const PlaylistWrapper = styled.div`
border: 1px white solid;
width: 35%;
display: flex;
justify-content: center;
`

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
        <Wrapper>
          <Content>
            {
              this.state.showSongs
                ? songs && this.renderSongs(songs)
                : playlists && this.renderPlaylists(playlists)
            }
          </Content>
          {this.state.showSongs && (
            <footer style={{ width: '100%' }}>
              <ToolbarButton style={{ width: '100%' }} onClick={this.toggleShowSongs}>
                &larr;
              </ToolbarButton>
            </footer>
          )}
        </Wrapper>
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