import React from 'react'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom'

const Container = styled.div`
display: flex;
height: 100%;
width: 75%;
margin: auto;
align-items: center;
`

const Player = styled.div`
border: 1px white solid;
width: 75%;
height: 70%;
`

const Playlist = styled.div`
border: 1px white solid;
width: 25%;
height: 70%;
`

const Home = () => (
  <Container>
    <Player />
    <Playlist />
  </Container>
)

export default Home