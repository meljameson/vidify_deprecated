import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List as StyledList, ListWrapper, Header, PlaylistButton } from 'styled'
import { setPlaylist } from 'actions/playlists'
import { selectCurrentPlaylist } from 'selectors'
import SongList from './SongList'
import WithLoading from 'components/WithLoading'
import PlaylistList from './PlaylistList'

class List extends Component {
  showPlaylists = () => this.props.setPlaylist(null)

  render() {
    const { currentPlaylist } = this.props
    return (
      <ListWrapper>
        <>
          {
            currentPlaylist &&
            <Header>
              {currentPlaylist.name}
              <PlaylistButton onClick={this.showPlaylists}>
                &larr;
              </PlaylistButton>
            </Header>
          }
          <StyledList>
            {
              currentPlaylist
                ? <SongList currentPlaylist={currentPlaylist} />
                : <PlaylistList />
            }
          </StyledList>
        </>
      </ListWrapper>
    )
  }
}

const mapStateToProps = state => ({
  currentPlaylist: selectCurrentPlaylist(state) // Use react-router and keep in URL so this stays on refresh
})

export default connect(mapStateToProps, { setPlaylist })(WithLoading(List))