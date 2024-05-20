const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string({
    required_error: 'Director is important'
  }),
  duration: z.number().positive(),
  poster: z.string().url(),
  rate: z.number().min(0).max(10).default(5),
  genre: z.array(z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']))
})

function validationMovie (input) {
  return movieSchema.safeParse(input)
}

function validationParcialMovie (input) {
  return movieSchema.partial().safeParse(input)
}

module.exports = { validationMovie, validationParcialMovie }
