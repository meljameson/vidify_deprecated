export const buildQuery = (params) => {
  if (!params) return
  return (typeof params === 'object') ? (
    Object.keys(params).map(key => {
      if (Array.isArray(params[key])) {
        return params[key].map(value => `${key}=` + value).join('&')
      } else {
        return `${key}=` + params[key]
      }
    }).join('&')
  ) : `${params}`
}

export const buildParams = (searchTerm) => ({
  key: process.env.REACT_APP_YT_CLIENT,
  maxResults: 1,
  part: 'snippet',
  q: encodeURIComponent(searchTerm),
})

export const authorize = () => {
  const scopes = 'playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private'
  const redirect_uri = 'http://localhost:3000/'
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