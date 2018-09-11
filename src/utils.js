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
  q: searchTerm,
})