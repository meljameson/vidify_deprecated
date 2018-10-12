const express = require('express')
const proxy = require('http-proxy-middleware')
const path = require('path')
const server = express()

server.use(proxy('/api', {
  target: 'https://proxy-216604.appspot.com',
  changeOrigin: true
}))

server.use(express.static(path.join(__dirname, 'build')))

server.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

server.listen(3000)