export const FETCH_PLAYLISTS = 'FETCH_PLAYLISTS'
export const FETCH_SONGS = 'FETCH_SONGS'
export const FETCH_VIDEOS = 'FETCH_VIDEOS'
export const FETCH_USER = 'FETCH_USER'

const loadPlaylistsActions = {
  request: () => {},
  success: () => {},
  failure: () => {}
}

const loadSongsActions = {
  request: () => {},
  success: () => {},
  failure: () => {}
}

const loadVideosActions = {
  request: () => {},
  success: () => {},
  failure: () => {}
}

const loadUserActions = {
  request: () => {},
  success: () => {},
  failure: () => {}
}

export const fetchPlaylists = () => async dispatch => {
  dispatch(loadPlaylistsActions.request)

  // const req = new Request(`https://api.spotify.com/v1/users/${userId}/playlists`, {
  //   headers: new Headers({
  //     'Authorization': 'Bearer ' + token
  //   })
  // })

  // try {
  //   const res = await fetch(req)
  //   const playlists = res.statusText === "Unauthorized" ? authorize() : await res.json()
  //   return playlists
  // } catch (err) {
  //   console.error(err)
  // }

  dispatch(loadPlaylistsActions.success)
  dispatch(loadPlaylistsActions.failure)
}

export const fetchSongs = () => async dispatch => {
  dispatch(loadSongsActions.request)

  // const req = new Request(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
  //   headers: new Headers({
  //     'Authorization': 'Bearer ' + token
  //   })
  // })

  // try {
  //   const res = await fetch(req)
  //   const songs = res.statusText === "Unauthorized" ? authorize() : await res.json()
  //   return songs
  // } catch (err) {
  //   console.error(err)
  // }
  
  dispatch(loadSongsActions.success)
  dispatch(loadSongsActions.failure)
}

export const fetchVideos = urls => async dispatch => {
  dispatch(loadVideosActions.request)

  // const videos = await Promise.all(songUrls.map(song => fetch(song)))
  // const json = await Promise.all(videos.map(song => song.json()))
  // const videoIds = json.map(({ items }) => items[0].id.videoId)

  dispatch(loadVideosActions.success)
  dispatch(loadVideosActions.failure)
}

export const fetchUser = () => async dispatch => {
  dispatch(loadUserActions.request)

  // const req = new Request('https://api.spotify.com/v1/me', {
  //   headers: new Headers({
  //     'Authorization': 'Bearer ' + token
  //   })
  // })


  // const res = await fetch(req)
  // const { id } = res.statusText === "Unauthorized" ? authorize() : await res.json()
  // userId = id

  dispatch(loadUserActions.success)
  dispatch(loadUserActions.failure)
}