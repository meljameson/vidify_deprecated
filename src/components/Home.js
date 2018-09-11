import React, { Component } from 'react'
import { AppWrapper, PlayerWrapper, Playlist, Row } from '../styled'
import SpotifyApi from '../spotify'
import Player from './Player'
import { buildQuery, buildParams } from '../utils'
import LoadingIcon from './LoadingIcon'
import { connect } from 'react-redux'
import { fetchSongs, fetchPlaylists, fetchVideos } from '../actions'
import { selectSongs, selectPlaylists, selectVideos } from '../selectors'

class Home extends Component {
  state = {
    currentVideo: null,
    currentPlaylist: null,
    showSongs: false,
    videoIds: [],
    playlists: {
      total: null,
      next: null,
      items: null
    },
    songs: {
      total: null,
      next: null,
      items: null
    }
  }

  async componentWillMount() {
    await SpotifyApi.init()
    this.loadPlaylists()
  }

  componentDidUpdate() {
    const { songs, videoIds } = this.state
    if (songs.items && this.state.showSongs && !videoIds.length) {
      this.loadVideos(songs.items)
    }
  }

  async loadPlaylists() {
    const { total, next, items } = await SpotifyApi.fetchPlaylists()
    this.setState({ playlists: { total, next, items } })
  }

  async loadSongs(id) { // load the first 20
    const { total, next, items } = await SpotifyApi.fetchSongs(id)
    this.setState({ songs: { total, next, items }, showSongs: true }) // route to songs, deduce state from url
  }

  async loadVideos(songs) {
    if (!songs) return
    const songUrls = songs.map(({ track: { name, artists, album: { name: album } } }) => {
      let query = buildQuery(buildParams(`${name} ${artists.map(({ name }) => name).join(' ')} ${album}`))
      return 'https://www.googleapis.com/youtube/v3/search?' + query
    })
    const videos = await Promise.all(songUrls.map(song => fetch(song)))
    const json = await Promise.all(videos.map(song => song.json()))
    const videoIds = json.map(({ items }) => items[0].id.videoId)
    this.setState({ currentVideo: videoIds[0], videoIds }, () => this.state.currentVideo)
  }

  renderSongs = ({ items }) => items.map(({ track: { name, id, artists, album: { name: album } } }) => (
    <Row
      key={id}
    >
      {
        `${name} by ${artists.map(({ name }) => name)}`
      }
    </Row>
  ))

  renderPlaylists = ({ items }) => items.map(({ external_urls, images, name, id }) => (
    <Row
      key={id}
      onClick={() => {
        this.setState({ currentPlaylist: id })
        this.loadSongs(id)
      }}
    >
      {name}
    </Row>
  ))


  render() {
    const { playlists, songs, showSongs, currentVideo } = this.state

    return (
      <AppWrapper>
        <PlayerWrapper>
          <Player currentVideo={currentVideo} />
        </PlayerWrapper>
        <Playlist>
          {
            showSongs ?
              this.renderSongs(songs)
              : playlists.items && this.renderPlaylists(playlists)
          }
        </Playlist>
      </AppWrapper>
    )
  }
}

const mapStateToProps = state => ({
  songs: selectSongs(state),
  playlists: selectPlaylists(state),
  videos: selectVideos(state)
})

export default connect(mapStateToProps, { fetchPlaylists, fetchSongs, fetchVideos })(Home)