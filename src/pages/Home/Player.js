import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as YTPlayer from 'yt-player/lib'
import { selectVideo } from 'selectors'
import { FlexContainer, PlayerWrapper, Video } from 'styled'

class Player extends Component {
  state = {
    player: null
  }

  componentDidMount() {
    this.setState({ player: new YTPlayer('#player') })
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props
    if (id && prevProps.id !== id) this.state.player.load(id)
  }

  render() {
    const { id, error } = this.props
    return (
      <>
        <PlayerWrapper>
          <Video id='player'>
            {!id && (
              <FlexContainer>
                <p>Pick a playlist</p>
              </FlexContainer>
            )}
          </Video>
        </PlayerWrapper>
        {error && error}
      </>
    )
  }
}

const mapStateToProps = state => ({
  ...selectVideo(state)
})

export default connect(mapStateToProps)(Player)