const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path')
const server = express()

server.use(express.static(path.join(__dirname, 'build')))

server.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

server.use(proxy('/api', {
  target: process.env.REACT_APP_PROD_URL,
  changeOrigin: true
}))

server.listen(3000)