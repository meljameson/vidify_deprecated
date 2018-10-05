const express = require('express');
const proxy = require('http-proxy-middleware');

const path = require('path')

const apiProxy = proxy('/api', {
  target: 'https://proxy-216604.appspot.com',
  changeOrigin: true
})

const server = express()

server.use(express.static(path.join(__dirname, 'build')))

server.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

server.use(apiProxy)

server.listen(3000)