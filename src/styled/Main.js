import styled from 'styled-components'

export const Main = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-gap: 20px;
  grid-template-areas:
    "player"
    "playlist";
  @media (min-width: 1025px) {
    grid-template-columns: 3fr minmax(300px, 1.5fr);
    grid-template-areas:
      "player playlist";
  }
`