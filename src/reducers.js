import {
  FETCH_PLAYLISTS,
  FETCH_SONGS,
  FETCH_VIDEOS,
  FETCH_USER
} from './actions'

const initialState = {
  videos: [],
  playlists: {},
  songs: {}
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLAYLISTS:
      return Object.assign({}, state, {
        playlists: action.payload
      })
    case FETCH_SONGS:
      return Object.assign({}, state, {
        songs: action.payload
      })
    case FETCH_VIDEOS:
      return Object.assign({}, state, {
        videos: action.payload
      })
    case FETCH_USER:
      return Object.assign({}, state, {
        userId: action.payload
      })
    default:
      return state
  }
}

export default reducer