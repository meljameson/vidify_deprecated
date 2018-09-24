import React, { Component } from 'react'
import { Main } from '../styled'
import { getToken } from '../utils'
import { connect } from 'react-redux'
import { fetchUser, setToken } from '../actions/actions'
import { selectAuth } from '../selectors/selectors'
import Player from './Player'
import Login from './Login'
import Playlist from './Playlist'
import Loading from './Loading'

class Home extends Component {
  state = {
    currentSong: null
  }

  componentWillMount() {
    const { token, setToken } = this.props
    if (!token) setToken(getToken())
  }

  componentDidUpdate() {
    const { user, fetchUser, token } = this.props
    if (!user && token) fetchUser(token)
  }

  changeCurrentSong = (id) => {
    this.setState({ currentSong: id })
  }

  render() {
    const { isFetching = true, user } = this.props
    return (
      isFetching ? <Loading>Loading user profile...</Loading> :
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
  const { user, token, isFetching, error } = selectAuth(state)

  return {
    user,
    token,
    isFetching,
    error
  }
}

export default connect(mapStateToProps, { fetchUser, setToken })(Home)