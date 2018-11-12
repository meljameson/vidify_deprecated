import { createActionTypes, createActions, request, normalizeSongs } from '../utils'
import { fetchVideo } from './videos'

export const FETCH_SONGS = createActionTypes('FETCH_SONGS')

const loadSongsActions = createActions(FETCH_SONGS)

export const setSong = id => ({ type: 'SET_SONG', payload: { id } })

export const fetchSongs = playlistId => async dispatch => {
  dispatch(loadSongsActions.request())
  try {
    const { total, next, items } = await request(`songs?playlistId=${playlistId}`)
    const songs = normalizeSongs(items)
    if (songs) {
      dispatch(loadSongsActions.success({ songs: { items: songs, total, next } }))
      dispatch(fetchVideo(songs[0]))
    } else {
      throw new Error('Songs not found')
    }
  } catch (err) {
    dispatch(loadSongsActions.failure(err))
  }
}