import { buildQuery, createActionTypes, createActions, request, pickVideo } from '../utils'

export const FETCH_VIDEO = createActionTypes('FETCH_VIDEO')

const loadVideoActions = createActions(FETCH_VIDEO)

export const fetchVideo = ({ name, artists, album }) => async dispatch => {
  dispatch(loadVideoActions.request())
  const artistNames = artists.map(({ name }) => name).join(' ')
  const terms = `${name} ${artistNames}`.split('undefined').filter(item => !!item).join(' ')
  try {
    const query = buildQuery({
      maxResults: 5,
      part: 'snippet',
      q: terms,
    })
    const { items } = await request(`videos?${query}`)
    const video = pickVideo(items, artistNames) // do something if undefined to let user know video wasn't found
    if (video) {
      dispatch(loadVideoActions.success({ video }))
    } else {
      throw new Error('Video not found')
    }
  } catch (err) {
    dispatch(loadVideoActions.failure(err))
  }
}