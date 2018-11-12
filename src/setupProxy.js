const proxy = require('http-proxy-middleware')

// This is for dev only
module.exports = function (app) {
  app.use(proxy('/api', { target: 'http://localhost:5000/' }))
}