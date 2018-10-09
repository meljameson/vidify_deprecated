import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from '../styled'
import { fetchUser } from '../actions'
import { selectUser } from '../selectors'
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
          <Grid>
            <Player />
            <Playlist />
          </Grid >
        ) : <Login />
    )
  }
}

const mapStateToProps = state => {
  const { user, isFetching } = selectUser(state)

  return {
    user,
    isFetching
  }
}

export default connect(mapStateToProps, { fetchUser })(Home)