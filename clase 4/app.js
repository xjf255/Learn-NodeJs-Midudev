import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'

const PORT = process.env.PORT ?? 1234
const ACCEPTED_ORIGIN = [
  'http://localhost:8080',
  'http://localhost:3000'
]

const app = express()
app.disable('x-powered-by')

app.use(json())

app.use((req, res, next) => {
  const origin = req.header('origin')

  if (ACCEPTED_ORIGIN.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    return next()
  }
  res.status(401).json({ error: 'Not have access' })
  next()
})

app.get('/', (req, res) => {
  res.send('<h1>Welcome</h1>')
})

app.use('/movies', moviesRouter)

// el options es necesario en los metodos complejos PUT,PATCH,DELETE
// lo que hace es dar permiso de modificar
app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')

  if (ACCEPTED_ORIGIN.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH')
  }
  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

// endpoint es un path donde tenemos un recurso
