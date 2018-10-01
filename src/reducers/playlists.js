import { FETCH_PLAYLISTS } from '../actions'
import { createReducer } from '../utils'

const playlists = createReducer({
  isFetching: false,
  error: false
}, {
    [FETCH_PLAYLISTS.REQUEST]: (state, action) => {
      return {
        ...state,
        isFetching: true,
        error: false
      }
    },
    [FETCH_PLAYLISTS.SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, {
        ...payload.playlists,
        isFetching: false,
        error: false
      })
    },
    [FETCH_PLAYLISTS.FAILURE]: (state, action) => {
      return {
        ...state,
        isFetching: false,
        error: true
      }
    }
  })

export default playlists