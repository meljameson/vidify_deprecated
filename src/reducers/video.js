import { FETCH_VIDEO } from 'actions/videos'
import { createReducer, initialState, requestState, failureState } from '../utils'

const video = createReducer(initialState, {
  [FETCH_VIDEO.REQUEST]: (state, action) => ({
    ...state,
    ...requestState
  }),
  [FETCH_VIDEO.SUCCESS]: (state, { payload }) => (
    Object.assign({}, state, {
      id: payload.video,
      ...initialState
    })
  ),
  [FETCH_VIDEO.FAILURE]: (state, action) => ({
    ...state,
    ...failureState
  })
})

export default video