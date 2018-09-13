import {
  FETCH_PLAYLISTS,
  FETCH_SONGS,
  FETCH_VIDEO,
  FETCH_USER,
  SET_TOKEN
} from './actions'

const initialState = {
  playlists: {},
  songs: {}
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return Object.assign({}, state, {
        token: action.payload.token
      })
    case FETCH_PLAYLISTS.SUCCESS:
      return Object.assign({}, state, {
        playlists: action.payload.playlists
      })
    case FETCH_SONGS.SUCCESS:
      return Object.assign({}, state, {
        songs: action.payload.songs
      })
    case FETCH_VIDEO.SUCCESS:
      return Object.assign({}, state, {
        video: action.payload.video
      })
    case FETCH_USER.SUCCESS:
      return Object.assign({}, state, {
        user: action.payload.id
      })
    default:
      return state
  }
}

export default reducer