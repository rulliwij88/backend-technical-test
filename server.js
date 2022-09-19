require('dotenv').config()

process.on('uncaughtException', err => {
  process.exit(1)
})
const app = require('./app')
const port = process.env.PORT || 3030
app.listen(port, () => {})
process.on('unhandledRejection', err => {
  process.exit(1)
})