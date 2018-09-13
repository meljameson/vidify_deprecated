import styled from 'styled-components'
import React from 'react'

const PlaylistWrapper = styled.div`
min-width: 215px;
border: 1px white solid;
width: 35%;
height: 70%;
overflow: hidden;
position: relative;
`

const PlaylistInner = styled.div`
position: absolute;
top: 0;
bottom: 0;
left: 0;
right: -17px;
overflow-y: scroll;
overflow-x: hidden;
padding-right: 1rem;
`

export const Playlist = ({ children }) => (
  <PlaylistWrapper>
    <PlaylistInner>{children}</PlaylistInner>
  </PlaylistWrapper>
)