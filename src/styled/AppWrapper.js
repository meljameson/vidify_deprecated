import styled from 'styled-components'
import React from 'react'

const Inner = styled.div`
display: flex;
height: 75%;
flex: 1;
`

const Outer = styled.div`
display: flex;
align-items: center;
height: 100%;
width: 75%;
margin: auto;
`

export const AppWrapper = ({children}) => (
  <Outer>
    <Inner>
      {children}
    </Inner>
  </Outer>
)