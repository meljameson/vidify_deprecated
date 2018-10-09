import styled from 'styled-components'

export const Header = styled.header`
text-align: center;
font-weight: bold;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
display:flex;
flex-direction:column;
> * {
    margin: .5rem 0;
}
@media (min-width: 1025px) {
  margin: 1rem 0;
}
`