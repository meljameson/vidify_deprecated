import React from 'react'
import Loading from './Loading'
import { FlexContainer } from '../styled'

const WithLoading = (Component) => ({ isFetching, error, ...props }) => {
  if (isFetching) return <Loading>Loading...</Loading>
  if (error) return <FlexContainer>Error loading request</FlexContainer>
  return <Component {...props} />
}

export default WithLoading