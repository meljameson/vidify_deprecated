import { FETCH_USER } from '../actions/user'
import { createReducer, initialState, requestState, failureState } from '../utils'

const user = createReducer({
  ...initialState,
  currentPlaylist: null,
  currentSong: null
}, {
    [FETCH_USER.REQUEST]: (state, action) => ({
      ...state,
      ...requestState
    }),
    [FETCH_USER.SUCCESS]: (state, { payload }) => (
      Object.assign({}, state, {
        user: payload.id,
        ...initialState
      })
    ),
    [FETCH_USER.FAILURE]: (state, action) => ({
      ...state,
      ...failureState
    }),
    'SET_SONG': (state, action) => ({
      ...state,
      currentSong: action.payload.id
    }),
    'SET_PLAYLIST': (state, action) => ({
      ...state,
      currentPlaylist: action.payload.id
    })
  })

export default user