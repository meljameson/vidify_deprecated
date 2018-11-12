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
    this.setState({
      player: new YTPlayer('#player')
    })
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props
    if (id && prevProps.id !== id) this.state.player.load(id, true)
  }

  render() {
    const { id, error, isFetching } = this.props

    return (
        <PlayerWrapper>
          <Video id='player'>
            {
              (!id || error) && (
                <FlexContainer>
                  <p>
                    {!isFetching && 'Pick a playlist'}
                    {error && 'No video found'} {/* Do toast instead */}
                  </p>
                </FlexContainer>
              )
            }
          </Video>
        </PlayerWrapper>
    )
  }
}

const mapStateToProps = state => ({
  ...selectVideo(state)
})

export default connect(mapStateToProps)(Player)