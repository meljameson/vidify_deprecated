import { buildQuery, buildParams, createActionTypes, authorize } from './utils'

export const FETCH_PLAYLISTS = createActionTypes('FETCH_PLAYLISTS')
export const FETCH_SONGS = createActionTypes('FETCH_SONGS')
export const FETCH_VIDEO = createActionTypes('FETCH_VIDEO')
export const FETCH_USER = createActionTypes('FETCH_USER')
export const SET_TOKEN = 'SET_TOKEN'

const loadPlaylistsActions = {
  request: id => ({ type: FETCH_PLAYLISTS.REQUEST, payload: id }),
  success: data => ({ type: FETCH_PLAYLISTS.SUCCESS, payload: data }),
  failure: error => ({ type: FETCH_PLAYLISTS.FAILURE, payload: error })
}

const loadSongsActions = {
  request: id => ({ type: FETCH_SONGS.REQUEST, payload: id }),
  success: data => ({ type: FETCH_SONGS.SUCCESS, payload: data }),
  failure: error => ({ type: FETCH_SONGS.FAILURE, payload: error })
}

const loadVideoActions = {
  request: id => ({ type: FETCH_VIDEO.REQUEST, payload: id }),
  success: data => ({ type: FETCH_VIDEO.SUCCESS, payload: data }),
  failure: error => ({ type: FETCH_VIDEO.FAILURE, payload: error })
}

const loadUserActions = {
  request: id => ({ type: FETCH_USER.REQUEST, payload: id }),
  success: data => ({ type: FETCH_USER.SUCCESS, payload: data }),
  failure: error => ({ type: FETCH_USER.FAILURE, payload: error })
}

export const fetchPlaylists = (userId, token) => async dispatch => {
  const req = new Request(`https://api.spotify.com/v1/users/${userId}/playlists`, { // TODO: add auth header in proxy
    headers: new Headers({
      'Authorization': 'Bearer ' + token
    })
  })

  try {
    const res = await fetch(req)
    const { total, next, items, error } = await res.json()
    if (error) { // TODO: check for actual authentication error
      authorize()
    } else {
      const playlists = items.map(({ id, images, name, tracks: { total } }) => ({ id, image: images.pop().url, name, total }))
      dispatch(loadPlaylistsActions.success({ playlists: { items: playlists, total, next } }))
    }
  } catch (err) {
    console.error(err)
  }
}

export const fetchSongs = (userId, token, playlistId) => async dispatch => {
  const req = new Request(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
    headers: new Headers({
      'Authorization': 'Bearer ' + token
    })
  })

  try {
    const res = await fetch(req)
    const { total, next, items, error } = await res.json()
    if (error) {
      authorize()
    } else {
      const songs = items.map(({ track: { id, name, artists, album: { images, name: album } } }) => ({ id, name, artists, images, album }))
      dispatch(loadSongsActions.success({ songs: { items: songs, total, next } }))
    }
  } catch (err) {
    console.error(err)
  }
}

export const fetchVideo = query => async dispatch => {
  try {
    const params = buildParams(query)
    const req = 'https://www.googleapis.com/youtube/v3/search?' + buildQuery(params)
    const res = await fetch(req)
    const { items } = await res.json()
    const video = items.pop().id.videoId
    dispatch(loadVideoActions.success({ video }))
  } catch (err) {
    dispatch(loadVideoActions.failure(err))
  }
}

export const fetchUser = (token) => async dispatch => {
  dispatch(loadUserActions.request)

  const req = new Request('https://api.spotify.com/v1/me', {
    headers: new Headers({
      'Authorization': 'Bearer ' + token
    })
  })

  try {
    const res = await fetch(req)
    const { id, error } = await res.json()
    if (error) {
      console.log(error)
      authorize()
    } else {
      dispatch(loadUserActions.success({ id }))
    }
  } catch (err) {
    dispatch(loadUserActions.failure(err))
  }
}

export const setToken = token => dispatch => dispatch({ type: 'SET_TOKEN', payload: { token } })