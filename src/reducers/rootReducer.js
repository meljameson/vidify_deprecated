import { combineReducers } from 'redux'
import songs from './songs'
import playlists from './playlists'
import auth from './auth'
import video from './video'

const rootReducer = combineReducers({
  auth,
  playlists,
  songs,
  video
})

export default rootReducer