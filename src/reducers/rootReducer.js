import { combineReducers } from 'redux'
import songs from './songs'
import playlists from './playlists'
import user from './user'
import video from './video'

const rootReducer = combineReducers({
  user,
  playlists,
  songs,
  video
})

export default rootReducer