import React, { Component } from 'react'
import { AppWrapper } from '../styled'
import { getToken } from '../utils'
import { connect } from 'react-redux'
import { fetchUser, setToken } from '../actions'
import { selectUser, selectToken } from '../selectors'
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
      this.props.user ?
        (<AppWrapper>
          <Player />
          <Playlist />
        </AppWrapper >) :
        <Login />
    )
  }
}

const mapStateToProps = state => ({
  user: selectUser(state),
  token: selectToken(state)
})

export default connect(mapStateToProps, { fetchUser, setToken })(Home)