import React, { Component } from 'react'
import { Main } from '../styled'
import { connect } from 'react-redux'
import { fetchUser } from '../actions'
import { selectAuth } from '../selectors'
import Player from './Player'
import Login from './Login'
import Playlist from './Playlist'
import Loading from './Loading'

class Home extends Component {
  componentDidMount() {
    if (!this.props.user) this.props.fetchUser()
  }

  render() {
    const { user, isFetching } = this.props
    return (
      isFetching ? <Loading /> :
        user ? (
          <Main>
            <Player />
            <Playlist />
          </Main >
        ) : <Login />
    )
  }
}

const mapStateToProps = state => {
  const { user, error, isFetching } = selectAuth(state)

  return {
    user,
    error,
    isFetching
  }
}

export default connect(mapStateToProps, { fetchUser })(Home)