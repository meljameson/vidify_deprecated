const express = require('express')
const proxy = require('http-proxy-middleware')
const path = require('path')
const server = express()
const argv = require('minimist')(process.argv.slice(2))

<<<<<<< Updated upstream
const port = process.env.PORT || argv.port || 3000
const proxyUrl = process.env.PROXY || argv.proxy || 'https://proxy-216604.appspot.com'
=======
const port = process.env.PORT || 3000
const proxyUrl = 'https://proxy-216604.appspot.com'
>>>>>>> Stashed changes

server.use(proxy('/api', {
  target: proxyUrl,
  changeOrigin: true
}))

server.use(express.static(path.join(__dirname, 'build')))
console.log(path.join(__dirname, 'build'))
server.get('/', function (req, res) {
  console.log(path.join(__dirname, 'build', 'index.html'))
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

server.listen(port, () => console.log(`App listening on port ${port}`))