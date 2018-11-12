import React from 'react'
import Icon from './Icon'
import { FlexContainer } from 'styled'

const Loading = ({ children }) => (
  <FlexContainer style={{ flexDirection: 'column', textAlign: 'center' }}>
    <Icon />
    {children}
  </FlexContainer>
)

export default Loading