import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as YTPlayer from '../yt-player'
import { selectVideo } from '../selectors'
import Loading from './Loading'

class Player extends Component {
  state = {
    player: null
  }

  componentDidMount() {
    this.setState({ player: new YTPlayer('#player') })
  }

  componentDidUpdate(prevProps) {
    const { video } = this.props
    if (video && prevProps.video !== video) {
      this.state.player.load(video)
    }
  }

  render() {
    return (
      <div style={{ height: '100%', width: '100%' }} id='player'>
        {!this.props.video && <Loading />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  video: selectVideo(state)
})

export default connect(mapStateToProps)(Player)