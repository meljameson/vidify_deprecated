import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, PlaylistButton, List, Header, Album } from '../styled'
import { setSong, fetchVideo } from '../actions'
import { selectSongs, selectCurrentSong } from '../selectors'
import WithLoading from './WithLoading'

class SongList extends Component {
  isCurrentSong = (i, id) => (!this.props.currentSong && i === 0) || (id === this.props.currentSong)

  renderSongs = (items = []) => (
    items.map(({ name, id, artists, album, images }, i) => {
      let style = this.isCurrentSong(i, id)
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
    const { items, showPlaylists, currentPlaylist } = this.props

    return (
      <>
        {
          <Header>
            {currentPlaylist.name}
            <PlaylistButton onClick={showPlaylists}>
              &larr;
            </PlaylistButton>
          </Header>
        }
        <List>
          {
            this.renderSongs(items)
          }
        </List>
      </>
    )
  }
}

const mapStateToProps = state => ({
  currentSong: selectCurrentSong(state),
  ...selectSongs(state)
})

export default connect(mapStateToProps, { setSong, fetchVideo })(WithLoading(SongList))