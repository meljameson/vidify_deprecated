import { SET_TOKEN, FETCH_USER } from '../actions/actions'
import { createReducer } from '../utils'

const auth = createReducer({
  isFetching: false,
  error: false
}, {
    [SET_TOKEN]: (state, action) => {
      return Object.assign({}, state, {
        token: action.payload.token
      })
    },
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
    }
  })

export default auth