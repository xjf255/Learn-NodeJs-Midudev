// creando nuestra primera API
const http = require('node:http')
const personsJSON = require('./mocks.json')

const processRequest = (req, res) => {
  const { method, url } = req
  switch (method) {
    case 'GET':
      switch (url) {
        case '/persons/rick':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(personsJSON))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>Error</h1>')
      }
    case 'POST':
      switch (url) {
        case '/persons': {
          let body = ''
          // escuchar el evento data
          req.on('data', chunk => {
            body += chunk.toString()
          })
          // cuando termina el evento data
          req.on('end', () => {
            const data = JSON.parse(body)
            // aqui se puede llamar a una base de datos para guardar los recursos
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
            data.timestamp = new Date().toLocaleString()
            res.end(JSON.stringify(data))
          })
          break
        }
        default: {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          return res.end('404 Not Found')
        }
      }
  }
}

const server = http.createServer(processRequest)
server.listen(1234, () => {
  console.log('server listening on port http://localhost:1234')
})
