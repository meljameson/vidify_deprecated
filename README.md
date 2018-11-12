# Personal utility for spinning Spotify playlists into Youtube playlists
[![Maintainability](https://api.codeclimate.com/v1/badges/0df541510d8f1e7af7df/maintainability)](https://codeclimate.com/github/meljameson/vidify/maintainability)

👉 https://meljameson.gitlab.io/vidify/

☑ https://gitlab.com/meljameson/vidify/issues

![Uptime Robot status](https://img.shields.io/uptimerobot/status/m780971107-d77da293faf7da0bd8d228a2.svg)

🙇‍
Bootstrapped with CRA
Utilizes Feross's yt-player module for video playback

🏁
Running with Docker (it's admittedly going to take forever to build)
https://www.peterbe.com/plog/how-to-create-react-app-with-docker
`docker build . -t vidify`
`docker run vidify`

Running without Docker - 2 options
`yarn`/`npm i`

(Prod - This will start the server in production mode and point to the API on Google App Engine)
`yarn start`/`npm run start`

(Dev - This will start the server in development mode using webpack's dev server and point to the API you will also run locally)
`yarn dev`/`npm run dev`

*This can't operate on its own. The API is separate.

😿
Spotify's API requires consistent ports/urls for callback URLs. As a result, there isn't much room for deviation as far as those go unless you make your own developer account and edit the environment variables in the API

🔑
Feel free to use this demo account if you don't have a Spotify account to test it out
User: ctipz26m2f77but6w9nu262e1 Pass: DemoAccount

---
### Log into Spotify
![Home](public/Home.png)
### Choose your playlists and songs
![Play](public/Play.png)