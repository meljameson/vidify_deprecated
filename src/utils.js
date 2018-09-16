export const buildQuery = (params) => (typeof params === 'object') ? (
  Object.keys(params).map(key => Array.isArray(params[key])
    ? params[key].map(value => `${key}=` + value).join('&')
    : `${key}=` + params[key]
  ).join('&')
) : `${params}`

export const buildParams = (searchTerm) => ({
  key: process.env.REACT_APP_YT_CLIENT,
  maxResults: 1,
  part: 'snippet',
  q: encodeURIComponent(searchTerm),
})

export const authorize = () => {
  const scopes = 'playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private'
  const redirect_uri = 'https://meljameson.gitlab.io/vidify/'
  const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&response_type=token&redirect_uri=${redirect_uri}`
  window.location.href = authorizeUrl
}

export const createActionTypes = (action) => ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc = {}, val) => {
  acc[val] = `${action}_${val}`
  return acc
}, {})

export const getToken = () => {
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