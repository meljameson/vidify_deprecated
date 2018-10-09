export function buildQuery(params) {
  return (typeof params === 'object') ? (
    Object.keys(params).map(key => Array.isArray(params[key])
      ? params[key].map(value => `${key}=` + value).join('&')
      : `${key}=` + params[key]
    ).join('&')
  ) : `${params}`
}

export function createActionTypes(action) {
  return ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc = {}, val) => {
    acc[val] = `${action}_${val}`
    return acc
  }, {})
}

// TODO: make smarter matches, dumb but functional right now
export function pickVideo(videos, artistNames) {
  const video = videos.find(({ snippet, id }) => {
    const text = (`${snippet.title}  ${snippet.description}`).toLowerCase()
    return text.includes('official') || snippet.channelTitle.includes(artistNames) || id.kind.split('#').pop() === 'video'
  })
  return video ? video.id.videoId : undefined
}

export function createActions(action) {
  return ({
    request: id => ({ type: action.REQUEST, payload: id }),
    success: data => ({ type: action.SUCCESS, payload: data }),
    failure: error => ({ type: action.FAILURE, payload: error })
  })
}

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export const server = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : ''

export const request = async (url) => await (await fetch(`${server}/api/${url}`, {
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
  }
})).json()

export const normalizePlaylists = items => items.map(({ id, images, name, tracks: { total } }) => ({ id, image: images.pop().url, name, total }))

export const normalizeSongs = items => items.map(({ track: { id, name, artists, album: { images, name: album } } }) => ({ id, name, artists, images, album }))

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