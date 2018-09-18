import styled from 'styled-components'

export const PlaylistWrapper = styled.div`
/* border: 1px white solid;
width: 35%;
overflow-x: hidden;
display: flex;
flex-direction: column; */

  display: flex;
  width: 200px;
  height: 200px;
  border: 1px solid black;
  justify-content: center;
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background-color: #f0f0f0;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: var(--black-transparent-20,rgba(0,0,0,0.2));
}
::-webkit-scrollbar-thumb:hover {
    background: #888; 
}
`