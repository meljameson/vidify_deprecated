import styled from 'styled-components'

export const PlaylistWrapper = styled.div`
max-height: 100%;
grid-area: playlist;
display: flex;
flex-direction: column;
overflow: auto;
@media (min-width: 1025px) {
  border-left: 1px solid white;
}
`