import styled from 'styled-components'
import React from 'react'

const StyledToolbar = styled.div`
background-color: 'gray';
`

const Toolbar = ({ children }) => (
  <StyledToolbar>
    {children}
  </StyledToolbar>
)

export default Toolbar