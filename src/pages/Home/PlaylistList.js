import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Title, Album } from 'styled'
import { fetchSongs } from 'actions/songs'
import { fetchPlaylists, setPlaylist } from 'actions/playlists'
import { selectPlaylists } from 'selectors'
import WithLoading from 'components/WithLoading'

class PlaylistList extends Component {
  componentDidMount() {
    // TODO: We don't want to fetch something we've already fetched, so cache these requests preferably
    // or keep them in state instead of blowing them away
    if (!this.props.items) this.props.fetchPlaylists()
  }

  renderPlaylists = (items = []) => (
    items.map(({ name, image, id, total }) => (
      <Row
        key={id}
        onClick={() => {
          this.props.setPlaylist({ id, name })
          // Cleanup: fire off an action in the thunk based on changes to the selected playlist
          this.props.fetchSongs(id)
        }}
      >
        <Album alt={`${name} album art`} src={image} />
        <Title>{name}</Title>
      </Row >
    ))
  )

  render() {
    return (
      this.renderPlaylists(this.props.items)
    )
  }
}

const mapStateToProps = state => ({
  ...selectPlaylists(state)
})

export default connect(mapStateToProps, { fetchPlaylists, fetchSongs, setPlaylist })(WithLoading(PlaylistList))