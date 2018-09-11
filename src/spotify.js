const SpotifyAPI = (function api() {
  const scopes = 'playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private'
  const redirect_uri = 'http://localhost:3000/'
  const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&response_type=token&redirect_uri=${redirect_uri}`
  let token = null
  let userId = null

  async function init() {
    token = getToken()
    if (!token) {
      authorize()
      getToken()
    }
    await fetchUser()
  }

  function getToken() {
    let hashParams = {}
    let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2])
    }

    return hashParams.access_token
  }

  function authorize() {
    window.location.href = authorizeUrl
  }

  async function fetchUser() {
    const req = new Request('https://api.spotify.com/v1/me', {
      headers: new Headers({
        'Authorization': 'Bearer ' + token
      })
    })


    const res = await fetch(req)
    const { id } = res.statusText === "Unauthorized" ? authorize() : await res.json()
    userId = id
  }

  async function fetchPlaylists() {
    const req = new Request(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + token
      })
    })

    try {
      const res = await fetch(req)
      const playlists = res.statusText === "Unauthorized" ? authorize() : await res.json()
      return playlists
    } catch (err) {
      console.error(err)
    }
  }

  async function fetchSongs(playlistId) {
    const req = new Request(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + token
      })
    })

    try {
      const res = await fetch(req)
      const songs = res.statusText === "Unauthorized" ? authorize() : await res.json()
      return songs
    } catch (err) {
      console.error(err)
    }
  }

  return {
    init,
    fetchSongs,
    fetchPlaylists
  }
})()

export default SpotifyAPI