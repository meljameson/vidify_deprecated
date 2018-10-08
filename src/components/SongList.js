import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, PlaylistButton, List, Header, Album } from '../styled'
import { fetchSongs, setSong, fetchVideo } from '../actions'
import { selectSongs, selectCurrentSong, selectCurrentPlaylist } from '../selectors'

class SongList extends Component {
  componentDidMount() {
    const { currentPlaylist, fetchSongs } = this.props
    if (currentPlaylist) fetchSongs(currentPlaylist)
  }

  renderSongs = (songs = []) => (
    songs.map(({ name, id, artists, album, images }, i) => {
      let style = ((!this.props.currentSong && i === 0) || (id === this.props.currentSong))
        ? { backgroundColor: '#1db954' }
        : {}
      return (
        <Row
          style={style}
          key={id}
          onClick={() => {
            this.props.setSong(id)
            this.props.fetchVideo({ name, artists, album })
          }}
        >
          <Album alt={`${name} album art`} src={(images && images[0].url)} />
          {`${name} by ${artists.map(({ name }) => name)}`}
        </Row>
      )
    })
  )

  render() {
    const { songs, showPlaylists, playlist } = this.props

    return (
      <>
        {
          <Header>
            <div
              style={{
                paddingBottom: '1rem',
                textAlign: 'center',
                fontWeight: 'bold',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
              }}>
              {playlist}
            </div>
            <PlaylistButton onClick={showPlaylists}>
              &larr;
      </PlaylistButton>
          </Header>
        }
        <List>
          {
            this.renderSongs(songs)
          }
        </List>
      </>
    )
  }
}

const mapStateToProps = state => {
  const { items: songs, isFetching, error } = selectSongs(state)

  return {
    songs,
    isFetching,
    error,
    currentSong: selectCurrentSong(state),
    currentPlaylist: selectCurrentPlaylist(state),
  }
}

export default connect(mapStateToProps, { fetchSongs, setSong, fetchVideo })(SongList)