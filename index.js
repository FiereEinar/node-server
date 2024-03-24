const path = require('path')
const http = require('http')
const fs = require('fs')

const PORT = process.env.PORT || 5000

function getContentType(ext) {
  switch (ext) {
    case '.js':
      return 'text/javascript'
    case '.css':
      return 'text/css'
    case '.json':
      return 'application/json'
    default:
      return 'text/html'
  }
}

const server = http.createServer((req, res) => {
  let filepath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)

  let extName = path.extname(filepath)

  const contentType = getContentType(extName)

  fs.readFile(filepath, (err, content) => {
    if (err) {
      fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data) => {
        res.writeHead(200, { 'Content-Type': contentType })
        res.end(data, 'utf8')
      })
    } else {
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(content, 'utf8')
    }
  })
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))