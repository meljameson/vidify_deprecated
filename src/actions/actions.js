import { server, buildQuery, createActionTypes, findMatch, createActions } from '../utils'

export const FETCH_PLAYLISTS = createActionTypes('FETCH_PLAYLISTS')
export const FETCH_SONGS = createActionTypes('FETCH_SONGS')
export const FETCH_VIDEO = createActionTypes('FETCH_VIDEO')
export const FETCH_USER = createActionTypes('FETCH_USER')
export const LOGIN = createActionTypes('LOGIN')

const loadPlaylistsActions = createActions(FETCH_PLAYLISTS)
const loadSongsActions = createActions(FETCH_SONGS)
const loadVideoActions = createActions(FETCH_VIDEO)
const loadUserActions = createActions(FETCH_USER)
const login = createActions(LOGIN)

export const fetchPlaylists = () => async dispatch => {
  dispatch(loadPlaylistsActions.request())
  try {
    const { total, next, items, error } = await (await fetch(`${server}/api/playlists`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })).json()
    if (error) throw new Error(error)
    const playlists = items.map(({ id, images, name, tracks: { total } }) => ({ id, image: images.pop().url, name, total }))
    if (playlists) {
      dispatch(loadPlaylistsActions.success({ playlists: { items: playlists, total, next } }))
    } else {
      throw new Error('Playlists not found')
    }
  } catch (err) {
    dispatch(loadPlaylistsActions.failure(err))
  }
}

export const fetchSongs = playlistId => async dispatch => {
  dispatch(loadSongsActions.request())
  try {
    const { total, next, items, error } = await (await fetch(`${server}/api/songs?playlistId=${playlistId}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })).json()
    if (error) throw new Error(error)
    const songs = items.map(({ track: { id, name, artists, album: { images, name: album } } }) => ({ id, name, artists, images, album }))
    if (songs) {
      dispatch(loadSongsActions.success({ songs: { items: songs, total, next } }))
    } else {
      throw new Error('Songs not found')
    }
  } catch (err) {
    dispatch(loadSongsActions.failure(err))
  }
}

export const fetchVideo = ({ song, artists, album }) => async dispatch => {
  dispatch(loadVideoActions.request())
  const artistNames = artists.map(({ name }) => name).join(' ')
  const terms = `${song} ${artistNames}`.split('undefined').filter(item => !!item).join(' ')
  try {
    const query = buildQuery({
      maxResults: 5,
      part: 'snippet',
      q: terms,
    })
    const { items } = await (await fetch(`${server}/api/youtube?${query}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })).json()
    const video = findMatch(items, artistNames)
    if (video) {
      dispatch(loadVideoActions.success({ video }))
    } else {
      throw new Error('Video not found')
    }
  } catch (err) {
    dispatch(loadVideoActions.failure(err))
  }
}

export const fetchUser = () => async dispatch => {
  dispatch(loadUserActions.request())
  try {
    const { id } = await (await fetch(`${server}/api/me`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    })).json()
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
    const { url } = await (await fetch(`${server}/api/login`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    })).json()
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