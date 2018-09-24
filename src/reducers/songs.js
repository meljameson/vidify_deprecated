import { FETCH_SONGS } from '../actions/actions'
import { createReducer } from '../utils'

const songs = createReducer({
  isFetching: false,
  error: false
}, {
    [FETCH_SONGS.REQUEST]: (state, action) => {
      return {
        ...state,
        isFetching: true,
        error: false
      }
    },
    [FETCH_SONGS.SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, {
        ...payload.songs,
        isFetching: false,
        error: false
      })
    },
    [FETCH_SONGS.FAILURE]: (state, action) => {
      return {
        ...state,
        isFetching: false,
        error: true
      }
    }
  })

export default songs