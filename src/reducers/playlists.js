import { FETCH_PLAYLISTS } from '../actions'
import { createReducer, initialState, requestState, failureState } from '../utils'

const playlists = createReducer(initialState, {
  [FETCH_PLAYLISTS.REQUEST]: (state, action) => ({
    ...state,
    ...requestState
  }),
  [FETCH_PLAYLISTS.SUCCESS]: (state, { payload }) => (
    Object.assign({}, state, {
      ...payload.playlists,
      ...initialState
    })
  ),
  [FETCH_PLAYLISTS.FAILURE]: (state, action) => ({
    ...state,
    ...failureState
  })
})

export default playlists