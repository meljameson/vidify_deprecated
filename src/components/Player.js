import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as YTPlayer from '../yt-player'
import { selectVideo } from '../selectors'
import { FlexContainer, PlayerWrapper, Video } from '../styled'
import styled from 'styled-components'

const Wrapper = styled.div`
/* display: flex;
align-content: center;
align-items: center;
height: 100%; */
`

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
      <Wrapper>
        <PlayerWrapper>
          <Video id='player'>
            {!this.props.video && (
              <FlexContainer>
                <p>Pick a playlist</p>
              </FlexContainer>
            )}
          </Video>
        </PlayerWrapper>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  video: selectVideo(state)
})

export default connect(mapStateToProps)(Player)