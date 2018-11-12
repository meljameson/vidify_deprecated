const express = require('express')
const proxy = require('http-proxy-middleware')
const path = require('path')
const server = express()

const port = process.env.PORT 3000
const proxyUrl = 'https://proxy-216604.appspot.com'

server.use(proxy('/api', {
  target: proxyUrl,
  changeOrigin: true
}))

server.use(express.static(path.join(__dirname, 'build')))

server.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

server.listen(port, () => console.log(`App listening on port ${port}`))