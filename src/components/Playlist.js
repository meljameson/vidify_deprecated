import React, { Component } from 'react'
import { Row, Title, List, ListWrapper, Album } from '../styled'
import { fetchPlaylists, fetchSongs, setPlaylist } from '../actions'
import { selectPlaylists, selectCurrentPlaylist } from '../selectors'
import { connect } from 'react-redux'
import SongList from './SongList'
import WithLoading from './WithLoading'

class Playlist extends Component {
  componentDidMount() {
    if (!this.props.items) this.props.fetchPlaylists()
  }

  renderPlaylists = (items = []) => (
    items.map(({ name, image, id, total }) => (
      <Row
        key={id}
        onClick={() => {
          this.props.setPlaylist({ id, name })
          this.props.fetchSongs(id)
        }}
      >
        <Album alt={`${name} album art`} src={image} />
        <Title>{name}</Title>
      </Row >
    ))
  )

  showPlaylists = () => this.props.setPlaylist(null)

  render() {
    const { items, currentPlaylist } = this.props

    return (
      <ListWrapper>
        <List>
          {
            currentPlaylist
              ? <SongList currentPlaylist={currentPlaylist} showPlaylists={this.showPlaylists} />
              : this.renderPlaylists(items)
          }
        </List>
      </ListWrapper>
    )
  }
}

const mapStateToProps = state => ({
  ...selectPlaylists(state),
  currentPlaylist: selectCurrentPlaylist(state)
})

export default connect(mapStateToProps, { fetchPlaylists, fetchSongs, setPlaylist })(WithLoading(Playlist))