export const buildQuery = (params) => (typeof params === 'object') ? (
  Object.keys(params).map(key => Array.isArray(params[key])
    ? params[key].map(value => `${key}=` + value).join('&')
    : `${key}=` + params[key]
  ).join('&')
) : `${params}`

export function authorize() {
  const scopes = 'playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private'
  const redirect_uri = 'https://meljameson.gitlab.io/vidify/'
  const app_id = '47ba3c41e3a54605bd4239e7bb57965b'
  const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${app_id}&scope=${encodeURIComponent(scopes)}&response_type=token&redirect_uri=${redirect_uri}`
  window.location.href = authorizeUrl
}

export function createActionTypes(action) {
  return ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc = {}, val) => {
    acc[val] = `${action}_${val}`
    return acc
  }, {})
}

export function getToken() {
  let hashParams = {}
  let e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1)
  e = r.exec(q)
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2])
    e = r.exec(q)
  }
  const { access_token } = hashParams
  return access_token
}

// TODO: make smarter matches, dumb but functional right now
export function findMatch(videos, artistNames) {
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