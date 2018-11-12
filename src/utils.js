/*
* Create a query string from the given params
* @param  {object}  params  Key value pairs of resource and description
* @return {string}          Stringified parameter pairs ex. ?user=123
*/
export function buildQuery(params) {
  return (typeof params === 'object') ? (
    Object.keys(params).map(key => Array.isArray(params[key])
      ? params[key].map(value => `${key}=` + value).join('&')
      : `${key}=` + params[key]
    ).join('&')
  ) : `${params}`
}

/*
* Choose a video to display for the song
* Improvements:
*   Process on server instead so client isn't bogged down
*   (5 videos per song, 200 songs in a playlist is alot of excess videos)
*   Make smarter matches. This is dumb but functional right now
* @param  {object}  video         Response from YouTube containing video meta data: { kind, etag, id, snippet }
* @param  {string}  artistNames   Names of artists that produced the song
* @return {string}                YouTube ID of the video selected
*/
export function pickVideo(videos, artistNames) {
  const video = videos.find(({ snippet, id }) => {
    const text = (`${snippet.title}  ${snippet.description}`).toLowerCase()
    return text.includes('official') || snippet.channelTitle.includes(artistNames) || id.kind.split('#').pop() === 'video'
  }) || ''
  return video.id.videoId
}

/*
* Convert action names to object for easy use in the reducer
* ex.
* {
*   "REQUEST": "FETCH_PLAYLISTS_REQUEST",
*   "SUCCESS": "FETCH_PLAYLISTS_SUCCESS",
*   "FAILURE": "FETCH_PLAYLISTS_FAILURE"
* }
* @param  {string}  action  Name of action in all caps
* @return {object}          Action object
*/
export function createActionTypes(action) {
  return ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc, val) => {
    acc[val] = `${action}_${val}`
    return acc
  }, {})
}

/*
* Formats actions into an object to easily send data to the reducer
* ex. { request: fn(), success: fn(), failure: fn() }
* @param  {object}  initialState  Object denoting the state slice for a particular reducer
* @param  {object}  handlers      Object literal with actions as keys and functions as values
* @return {object}                Updated state
*/
export function createActions(action) {
  return ({
    request: id => ({ type: action.REQUEST, payload: id }),
    success: data => ({ type: action.SUCCESS, payload: data }),
    failure: error => ({ type: action.FAILURE, payload: error })
  })
}

/*
* Allow reducers to be object literals instead of switch cases
* @param  {object}  initialState  Object denoting the state slice for a particular reducer
* @param  {object}  handlers      Object literal with actions as keys and functions as values
* @return {object}                Updated state
*/
export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

/*
* Generic fetch function (could be made more adaptable) to keep action code dry
* @param  {string}  url   Ex. "/auth/profile"
* @return {object}        Server response in JSON format
*/
export const request = async (url) => await (await fetch(`/api/${url}`, {
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
  }
})).json()

/*
* Format playlists to be stored in state in a consistent way
* Probably offload to server and/or use normalizr library
* @param  {object}  items     Contains playlist meta data
* @return {object}            Contains playlist meta data ... in a different format
*/
export const normalizePlaylists = items => items.map(({ id, images, name, tracks: { total } }) => ({ id, image: images.pop().url, name, total }))

/*
* Format songs to be stored in state in a consistent way
* Probably offload to server and/or use normalizr library
* @param  {object}  items     Contains song meta data
* @return {object}            Contains song meta data ... in a different format
*/
export const normalizeSongs = items => items.map(({ track: { id, name, artists, album: { images, name: album } } }) => ({ id, name, artists, images, album }))

/*
* Default initial states for all reducers that load resources 
*/
export const initialState = {
  isFetching: false,
  error: false
}

export const requestState = {
  isFetching: true,
  error: false
}

export const failureState = {
  isFetching: false,
  error: true
}