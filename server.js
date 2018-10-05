const express = require('express')
const proxy = require('http-proxy-middleware')
const path = require('path')
const server = express()

const proxyAddr = 'https://proxy-216604.appspot.com'

server.use(express.static(path.join(__dirname, 'build')))

server.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

server.use('/api', proxy({ target: proxyAddr, changeOrigin: true }))

server.listen(3000, () => 'listening on 3000')