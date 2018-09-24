import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as YTPlayer from 'yt-player/lib'
import { selectVideo } from '../selectors/selectors'
import { FlexContainer, PlayerWrapper, Video } from '../styled'

class Player extends Component {
  state = {
    player: null
  }

  componentDidMount() {
    this.setState({ player: new YTPlayer('#player') })
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props
    if (id && prevProps.id !== id) {
      this.state.player.load(id)
    }
  }

  render() {
    const { id, error } = this.props
    return (
      <Fragment>
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
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { id, error } = selectVideo(state)
  return {
    id,
    error
  }
}

export default connect(mapStateToProps)(Player)