import styled from 'styled-components'
import React from 'react'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-gap: 20px;
  grid-template-areas:
    "player"
    "playlist";
  align-items: center;
  @media (min-width: 1000px) {
    grid-template-columns: 3fr minmax(300px, 1.5fr);
    grid-template-areas:
      "player playlist";
  }
`

export const AppWrapper = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
)