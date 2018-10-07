import { buildQuery, createActionTypes, findMatch, createActions } from '../utils'

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
    const res = await fetch('https://proxy-216604.appspot.com/api/playlists', {
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const { total, next, items, error } = await res.json()
    if (error) throw new Error(error)
    const playlists = items.map(({ id, images, name, tracks: { total } }) => ({ id, image: images.pop().url, name, total }))
    dispatch(loadPlaylistsActions.success({ playlists: { items: playlists, total, next } }))
  } catch (err) {
    dispatch(loadPlaylistsActions.failure(err))
  }
}

export const fetchSongs = playlistId => async dispatch => {
  dispatch(loadSongsActions.request())
  try {
    const res = await fetch(`https://proxy-216604.appspot.com/api/songs?playlistId=${playlistId}`, {
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const { total, next, items, error } = await res.json()
    if (error) throw new Error(error)
    const songs = items.map(({ track: { id, name, artists, album: { images, name: album } } }) => ({ id, name, artists, images, album }))
    dispatch(loadSongsActions.success({ songs: { items: songs, total, next } }))
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
    const result = await fetch(`https://proxy-216604.appspot.com/api/youtube?${query}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const { items } = await result.json()
    const video = findMatch(items, artistNames)
    if (video) dispatch(loadVideoActions.success({ video }))
  } catch (err) {
    dispatch(loadVideoActions.failure(err))
  }
}

export const fetchUser = () => async dispatch => {
  dispatch(loadUserActions.request)
  try {
    const res = await fetch('https://proxy-216604.appspot.com/api/me', {
      mode: 'no-cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    })
    const { id } = await res.json()
    if (id) dispatch(loadUserActions.success({ id }))
  } catch (err) {
    dispatch(loadUserActions.failure(err))
  }
}

export const authenticate = () => async dispatch => {
  dispatch(login.request)
  try {
    const res = await fetch('https://proxy-216604.appspot.com/api/login', {
      mode: 'no-cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    })
    const { url } = await res.json()
    if (url) window.location.href = url
  } catch (err) {
    dispatch(login.failure(err))
  }
}