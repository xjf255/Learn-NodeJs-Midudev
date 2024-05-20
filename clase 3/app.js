const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const { validationMovie, validationParcialMovie } = require('./schema/movies')
const PORT = process.env.PORT ?? 1234
const ACCEPTED_ORIGIN = [
  'http://localhost:8080',
  'http://localhost:3000'
]

const app = express()
app.disable('x-powered-by')

app.use(express.json())

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

app.get('/movies', (req, res) => {
  const { genre, pag } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  if (pag) {
    const NUM_MOVIES = 2
    const paginationMovies = movies.slice(NUM_MOVIES * pag, NUM_MOVIES * pag + NUM_MOVIES)
    return res.json(paginationMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie Not found' })
})

app.post('/movies', (req, res) => {
  const result = validationMovie(req.body)

  if (!result.success) {
    return res.status(404).json({ message: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ error: 'error to remove item' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'movie deleted' })
})

app.patch('/movies/:id', (req, res) => {
  const result = validationParcialMovie(req.body)
  if (!result.success) {
    return res.status(404).json(JSON.parse(result.error.message))
  }

  const { id } = req.params

  const movieIndex = movies.findIndex(index => index.id === id)
  if (movieIndex === -1) return res.status(404).json({ error: 'Not found' })

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie
  res.status(201).json(updateMovie)
})

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
