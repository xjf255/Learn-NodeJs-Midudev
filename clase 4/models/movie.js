import { randomUUID } from 'node:crypto'
import { importJSON } from '../utils.js'

const movies = importJSON('../movies.json')

export class MoviesModel {
  static async getAll ({ genre, pag }) {
    console.log(genre, pag)
    if (genre) {
      const filteredMovies = movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
      return filteredMovies
    }
    if (pag) {
      const NUM_MOVIES = 2
      const paginationMovies = movies.slice(NUM_MOVIES * pag, NUM_MOVIES * pag + NUM_MOVIES)
      return paginationMovies
    }
  }

  static async getId ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    if (movie) return movie
  }

  static async create ({ body }) {
    const newMovie = {
      id: randomUUID(),
      ...body
    }
    const newMovies = movies.push(newMovie)
    return newMovies
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
      return false
    }
    movies.splice(movieIndex, 1)
    return true
  }

  static async update ({ id, body }) {
    const movieIndex = movies.findIndex(index => index.id === id)
    if (movieIndex === -1) return false
    const updateMovie = {
      ...movies[movieIndex],
      ...body
    }
    movies[movieIndex] = updateMovie
    return true
  }
}
