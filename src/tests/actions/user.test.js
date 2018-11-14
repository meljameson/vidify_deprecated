import * as actions from 'actions/user'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
    it('should create FETCH_USER action types', () => {
        const expectedAction = {
            "FAILURE": "FETCH_USER_FAILURE",
            "REQUEST": "FETCH_USER_REQUEST",
            "SUCCESS": "FETCH_USER_SUCCESS",
        }
        expect(actions.FETCH_USER).toEqual(expectedAction)
    })
})

describe('fetchUser', () => {
    const types = actions.FETCH_USER
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates FETCH_USER_SUCCESS when user fetch has been done', () => {
        fetchMock.getOnce('api/auth/profile', {
          headers: { Accept: 'application/json' },
          body: {id: 'asdf'}
        })

        const expectedActions = [
            {
              "type": "FETCH_USER_REQUEST"
            },
            {
              "payload": {
                "id": "asdf"
              },
              "type": "FETCH_USER_SUCCESS"
            }
        ]

        const store = mockStore({ user: {id: 'asdf'} })
        
        return store.dispatch(actions.fetchUser()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
