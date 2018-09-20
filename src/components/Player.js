import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as YTPlayer from '../yt-player'
import { selectVideo } from '../selectors'
import { FlexContainer, PlayerWrapper, Video } from '../styled'

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
      <PlayerWrapper>
        <Video id='player'>
          {!this.props.video && (
            <FlexContainer>
              <p>Pick a playlist</p>
            </FlexContainer>
          )}
        </Video>
      </PlayerWrapper>
    )
  }
}

const mapStateToProps = state => ({
  video: selectVideo(state)
})

export default connect(mapStateToProps)(Player)