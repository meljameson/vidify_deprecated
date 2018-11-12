import { createActionTypes, createActions, request } from '../utils'

export const FETCH_USER = createActionTypes('FETCH_USER')
export const LOGIN = createActionTypes('LOGIN')

const loadUserActions = createActions(FETCH_USER)
const login = createActions(LOGIN)

export const fetchUser = () => async dispatch => {
  dispatch(loadUserActions.request())
  try {
    const { id } = await request('auth/profile')
    if (id) {
      dispatch(loadUserActions.success({ id }))
    } else {
      throw new Error('User could not be loaded')
    }
  } catch (err) {
    dispatch(loadUserActions.failure(err))
  }
}

export const authenticate = () => async dispatch => {
  dispatch(login.request())
  try {
    const { url } = await request('auth/login')
    console.log(url)
    if (url) {
      dispatch(login.success())
      window.location.href = url
    } else {
      throw new Error('Could not authenticate')
    }
  } catch (err) {
    dispatch(login.failure(err))
  }
}