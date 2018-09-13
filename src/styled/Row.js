import styled from 'styled-components'

export const Row = styled.div`
display: flex;
align-items: center;
flex-direction: row;
width: 100%;
margin: .5rem;
color: white;
&:hover {
  background-color: pink;
  color: darkgray;
  transition: 0.3s;
}
`