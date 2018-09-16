import React from 'react'
import styled, { keyframes } from 'styled-components'

const gradient = keyframes`
0% { background-position: 0 0; }
25% { background-position: 50% 0;}
50% { background-position: 90% 0;}
60% { background-position: 60%;}
75% { background-position: 40%;}
100% { background-position: 0 0;}
`

const MusicNote = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 0 64 64" width="64px" fillOpacity="1" fill="#000">
    <path d="M23.727,16.403v4.84v5.058v14.236c-1.268-0.777-2.754-1.233-4.35-1.233c-4.612,0-8.353,3.74-8.353,8.349  c0,4.614,3.74,8.354,8.353,8.354c4.61,0,8.349-3.739,8.35-8.352h0V25.151l21.25-6.109V33.33c-1.268-0.777-2.754-1.233-4.35-1.233  c-4.614,0-8.353,3.739-8.353,8.348c0,4.613,3.739,8.354,8.353,8.354c4.344,0,7.914-3.325,8.31-7.57h0.04V17.892v-3.586V7.993  L23.727,16.403z" />
  </svg>
)

const Background = styled.div`
background-image: linear-gradient(to right, #054f7d, #00a7cf, #efe348, #861a54, #054f7d);
animation: ${gradient} 5s linear infinite;
height: 5rem;
width: 5rem;
background-position: 0 0;
background-size: 600%;
`

const Icon = () => (
  <Background>
    <svg viewBox="0 0 64 64">
      <rect fill="#000" x="0" y="0" width="5rem" height="5rem" fillOpacity="1" mask="url(#note)" />
      <mask id="note">
        <rect fill="#fff" x="0" y="0" width="5rem" height="5rem" />
        <MusicNote />
      </mask>
    </svg>
  </Background>
)

export default Icon

