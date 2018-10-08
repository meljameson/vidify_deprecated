import React, { Component } from 'react'
import { Row, Title, List, ListWrapper, Album, FlexContainer } from '../styled'
import { fetchPlaylists, setPlaylist } from '../actions'
import { selectPlaylists, selectCurrentPlaylist } from '../selectors'
import { connect } from 'react-redux'
import Loading from './Loading'
import SongList from './SongList'

class Playlist extends Component {
  componentDidMount() {
    if (!this.props.playlists) this.props.fetchPlaylists()
  }

  renderPlaylists = (playlists = []) => (
    playlists.map(({ name, image, id, total }) => (
      <Row
        key={id}
        onClick={() => this.props.setPlaylist(id)}
      >
        <Album alt={`${name} album art`} src={image} />
        <Title>{name}</Title>
      </Row>
    ))
  )

  showPlaylists = () => this.props.setPlaylist(null)

  render() {
    const { playlists, isFetching, error, currentPlaylist } = this.props

    return (
      error
        ? <FlexContainer>Error loading request</FlexContainer>
        : isFetching
          ? <Loading>Loading playlists...</Loading>
          : (
            <ListWrapper>
              <List>
                {
                  currentPlaylist
                    ? <SongList showPlaylists={this.showPlaylists} />
                    : this.renderPlaylists(playlists)
                }
              </List>
            </ListWrapper>
          )
    )
  }
}

const mapStateToProps = state => {
  const { items: playlists, isFetching, error } = selectPlaylists(state)

  return {
    playlists,
    isFetching,
    error,
    currentPlaylist: selectCurrentPlaylist(state)
  }
}

export default connect(mapStateToProps, { fetchPlaylists, setPlaylist })(Playlist)