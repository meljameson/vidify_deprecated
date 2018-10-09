import { FETCH_SONGS } from '../actions'
import { createReducer, initialState, requestState, failureState } from '../utils'

const songs = createReducer(initialState, {
  [FETCH_SONGS.REQUEST]: (state, action) => ({
    ...state,
    ...requestState
  }),
  [FETCH_SONGS.SUCCESS]: (state, { payload }) => (
    Object.assign({}, state, {
      ...payload.songs,
      ...initialState
    })
  ),
  [FETCH_SONGS.FAILURE]: (state, action) => ({
    ...state,
    ...failureState
  })
})

export default songs