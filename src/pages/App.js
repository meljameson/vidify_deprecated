import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser } from 'actions/user'
import { selectUser } from 'selectors'
import Home from 'pages/Home'
import Login from 'pages/Login'
import Loading from 'components/Loading'

class App extends Component {
  componentDidMount() {
    if (!this.props.user) this.props.fetchUser()
  }

  render() {
    const { user, isFetching } = this.props
    // TODO: Add react-router to handle auth route handling instead of monstrous ternary
    return (
      isFetching
      ? <Loading />
      : user
      ? <Home/>
      : <Login />
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

export default connect(mapStateToProps, { fetchUser })(App)