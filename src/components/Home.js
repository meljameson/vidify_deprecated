import React, { Component } from 'react'
import { Main } from '../styled'
import { getToken } from '../utils'
import { connect } from 'react-redux'
import { fetchUser, setToken } from '../actions/actions'
import { selectAuth } from '../selectors/selectors'
import Player from './Player'
import Login from './Login'
import Playlist from './Playlist'

class Home extends Component {
  componentWillMount() {
    const { token, setToken } = this.props
    if (!token) setToken(getToken())
  }

  componentDidUpdate() {
    const { user, fetchUser, token } = this.props
    if (!user && token) fetchUser(token)
  }

  render() {
    return (
      this.props.user ? (
        <Main>
          <Player />
          <Playlist />
        </Main >
      ) : <Login />
    )
  }
}

const mapStateToProps = state => {
  const { user, token, isFetching = true, error } = selectAuth(state)

  return {
    user,
    token,
    isFetching,
    error
  }
}

export default connect(mapStateToProps, { fetchUser, setToken })(Home)