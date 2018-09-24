import styled from 'styled-components'

export const Row = styled.div`
cursor: pointer;
display: flex;
align-items: center;
flex-direction: row;
width: 100%;
height: 3rem;
padding: .5rem;
color: white;
&:hover {
  background-color: #1db954;
  transition: 0.3s;
}
`