module.exports = (err, req, res, next) => {
  if (err.status === 404 || err.status === 500 || err.status === 400 || err.status === 11000) {
    let codex = 404
    err.headerCode = codex
    err.success = err.success || false
  } else {
    err.headerCode = err.status || 200
    err.status = true
    if (err.status === undefined) {
      err.status = status
      // err.message = 'Terjadi Kesalahan Internal'
    }
  }
  
  res.status(err.headerCode).json({
    status: err.success,
    message: err.message,
    data: err.data
  })
}
