import React, { Component } from 'react'
import * as YTPlayer from 'yt-player'

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      player: null
    }
  }

  componentDidMount() {
    this.setState({ player: new YTPlayer('#player') })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentVideo !== this.props.currentVideo) {
      this.state.player.load(this.props.currentVideo)
    }
  }

  render() {
    return (
      <div style={{ height: '100%', width: '100%' }} id='player' />
    )
  }
}

export default Player