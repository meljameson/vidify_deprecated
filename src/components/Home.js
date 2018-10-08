import React, { Component } from 'react'
import { Main } from '../styled'
import { connect } from 'react-redux'
import { fetchUser } from '../actions'
import { selectAuth } from '../selectors/selectors'
import Player from './Player'
import Login from './Login'
import Playlist from './Playlist'

class Home extends Component {
  state = {
    currentSong: null
  }

  componentDidMount() {
    if (!this.props.user) this.props.fetchUser()
  }

  changeCurrentSong = id => {
    this.setState({ currentSong: id })
  }

  render() {
    const { user } = this.props
    return (
      user ? (
        <Main>
          <Player />
          <Playlist changeCurrentSong={this.changeCurrentSong} currentSong={this.state.currentSong} />
        </Main >
      ) : <Login />
    )
  }
}

const mapStateToProps = state => {
  const { user, error } = selectAuth(state)

  return {
    user,
    error
  }
}

export default connect(mapStateToProps, { fetchUser })(Home)