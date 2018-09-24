import { FETCH_VIDEO } from '../actions/actions'
import { createReducer } from '../utils'

const video = createReducer({
  isFetching: false,
  error: false
}, {
    [FETCH_VIDEO.SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, {
        id: payload.video,
        isFetching: false,
        error: false
      })
    },
    [FETCH_VIDEO.FAILURE]: (state, action) => {
      return {
        ...state,
        isFetching: false,
        error: true
      }
    }
  })

export default video