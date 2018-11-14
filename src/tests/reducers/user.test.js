import reducer from 'reducers/user'
import * as actions from 'actions/user'

describe('user reducer', () => {
  const types = actions.FETCH_USER
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
    {
        "currentPlaylist": null,
        "currentSong": null,
        "error": false,
        "isFetching": false
    })
  })

  it('should handle FETCH_USER_REQUEST', () => {
    expect(
      reducer({
        "currentPlaylist": null,
        "currentSong": null,
        "error": false,
        "isFetching": false
      }, {
        type: types.REQUEST,
        payload: {id: 'asdf'}
      })
    ).toEqual({
        "currentPlaylist": null,
        "currentSong": null,
        "error": false,
        "isFetching": true
    })
  })

  it('should handle FETCH_USER_SUCCESS', () => {
    expect(
      reducer({
        "currentPlaylist": null,
        "currentSong": null,
        "error": false,
        "isFetching": false
      }, {
        type: types.SUCCESS,
        payload: {id: 'asdf'}
      })
    ).toEqual({
        "currentPlaylist": null,
        "currentSong": null,
        "error": false,
        "isFetching": false,
        "user": "asdf"
    })
  })

  it('should handle FETCH_USER_FAILURE', () => {
    expect(
      reducer({
        "currentPlaylist": null,
        "currentSong": null,
        "error": false,
        "isFetching": false
      }, {
        type: types.FAILURE,
        payload: {id: 'asdf'}
      })
    ).toEqual({
        "currentPlaylist": null,
        "currentSong": null,
        "error": true,
        "isFetching": false
    })
  })
})