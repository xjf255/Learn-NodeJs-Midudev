import { MoviesModel } from '../models/movie'
import { validationMovie, validationParcialMovie } from '../schema/movies'

export class MovieController {
  static async getAll (req, res) {
    const { genre, pag } = req.query
    const movies = await MoviesModel.getAll({ genre, pag })
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movies = await MoviesModel.getId({ id })
    if (movies) return res.json(movies)
    res.status(404).json({ message: 'Movie Not found' })
  }

  static async create (req, res) {
    const result = validationMovie(req.body)

    if (!result.success) {
      return res.status(404).json({ message: JSON.parse(result.error.message) })
    }

    const newMovie = await MoviesModel.create({ body: result.data })
    res.status(201).json(newMovie)
  }

  static async delete (req, res) {
    const { id } = req.params
    const movies = await MoviesModel.delete(id)

    if (!movies) {
      return res.status(404).json({ error: 'error to remove item' })
    }
    return res.json({ message: 'movie deleted' })
  }

  static async update (req, res) {
    const result = validationParcialMovie(req.body)
    if (!result.success) {
      return res.status(404).json(JSON.parse(result.error.message))
    }

    const { id } = req.params

    const updateMovie = await MoviesModel.update({ id, body: result.data })

    if (!updateMovie) return res.status(404).json({ error: 'Not found' })

    return res.status(201).json(updateMovie)
  }
}
