import { createActionTypes, createActions, request, normalizePlaylists } from '../utils'

export const FETCH_PLAYLISTS = createActionTypes('FETCH_PLAYLISTS')

const loadPlaylistsActions = createActions(FETCH_PLAYLISTS)

export const setPlaylist = id => ({ type: 'SET_PLAYLIST', payload: { id } })

export const fetchPlaylists = () => async dispatch => {
  dispatch(loadPlaylistsActions.request())
  try {
    const { total, next, items } = await request(`playlists`)
    const playlists = normalizePlaylists(items)
    if (playlists) {
      dispatch(loadPlaylistsActions.success({ playlists: { items: playlists, total, next } }))
    } else {
      throw new Error('Playlists not found')
    }
  } catch (err) {
    dispatch(loadPlaylistsActions.failure(err))
  }
}