const express = require('express')
const personsJSON = require('./mocks.json')
const PORT = process.env.PORT ?? 1234
const app = express()

app.disable('x-powered-by')

/* middleware
  un middleware se puede expresar como una funcion que sucede
  entre la request y la respuesta, se puede usar para un method en concreto
  o para todos
*/

app.use(express.json())

/* lo de arriba es igual que lo de abajo
  app.use((req, res, next) => {
  if (req.method !== 'POST') return next()

  if (req.headers['content-type'] !== 'application/json') return next()

  let body = ''
  // escuchar el evento data
  req.on('data', chunk => {
    body += chunk.toString()
  })
  // cuando termina el evento data
  req.on('end', () => {
    const data = JSON.parse(body)
    // aqui se puede llamar a una base de datos para guardar los recursos
    data.timestamp = new Date().toLocaleString()
    req.body = data
    next()
  })
}) */

app.get('/', (req, res) => {
  res.send('<h1>Hola</h1>')
})
app.get('/persons/rick', (req, res) => {
  res.json(personsJSON)
})

app.post('/persons', (req, res) => {
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(1234, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
