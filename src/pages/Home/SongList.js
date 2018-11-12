import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Album } from 'styled'
import { setSong } from 'actions/songs'
import { fetchVideo } from 'actions/videos'
import { selectSongs, selectCurrentSong } from 'selectors'
import WithLoading from 'components/WithLoading'

class SongList extends Component {
  /*
    Take the index and the id of the song
    If there is no current song, and it's the first song (index = 0), make that the current song
    Otherwise, check if current song and id match
  */
  isCurrentSong = (i, id) => (!this.props.currentSong && i === 0) || (id === this.props.currentSong)

  renderSongs = (items = []) => (
    items.map(({ name, id, artists, album, images }, i) => {
      return (
        <Row
          key={id}
          isCurrent={this.isCurrentSong(i, id)}
          onClick={() => {
            this.props.setSong(id)
            // Cleanup: fire off an action in the thunk instead based on changes to the selected song
            this.props.fetchVideo({ name, artists, album })
          }}
        >
          {/* Cleanup: Just return the first image from the server so we don't have to store multiple on the client only to choose the first one */}
          <Album alt={`${name} album art`} src={(images && images[0].url)} />
          {`${name} by ${artists.map(({ name }) => name)}`}
        </Row>
      )
    })
  )

  render() {
    return (
      this.renderSongs(this.props.items)
    )
  }
}

const mapStateToProps = state => ({
  currentSong: selectCurrentSong(state),
  ...selectSongs(state)
})

export default connect(mapStateToProps, { setSong, fetchVideo })(WithLoading(SongList))