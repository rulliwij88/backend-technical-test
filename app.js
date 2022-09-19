const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const app = express()

// Allow Cross-Origin requests
app.use(cors())

// Body parser, reading data from body into req.body
app.use(express.json({
  limit: '15kb'
  // limit: '20000kb'
}))

app.use(express.urlencoded({
  limit: '50mb',
  extended: true
}))

app.use('/', express.static('public'))
app.use('/', routes)

// handle undefined Routes
app.use('*', (req, res, next) => {
  return res.status(404).json({status:'Not Found', message:'undefined route', data:{}})
});

module.exports = app