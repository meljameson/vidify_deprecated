import { FETCH_USER } from '../actions'
import { createReducer } from '../utils'

const user = createReducer({
  isFetching: false,
  error: false,
  currentPlaylist: null,
  currentSong: null
}, {
    [FETCH_USER.REQUEST]: (state, action) => {
      return {
        ...state,
        isFetching: true,
        error: false
      }
    },
    [FETCH_USER.SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: false,
        user: payload.id
      })
    },
    [FETCH_USER.FAILURE]: (state, action) => {
      return {
        ...state,
        isFetching: false,
        error: true
      }
    },
    'SET_SONG': (state, action) => {
      return {
        ...state,
        currentSong: action.payload.id
      }
    },
    'SET_PLAYLIST': (state, action) => {
      return {
        ...state,
        currentPlaylist: action.payload.id
      }
    }
  })

export default user