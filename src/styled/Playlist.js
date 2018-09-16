import styled from 'styled-components'

export const Playlist = styled.div`
min-width: 215px;
border: 1px white solid;
width: 35%;
height: 70%;
overflow-x: hidden;
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