/* cmd
const http = require('node:http')
const fs = require('node:fs')
*/
const http = require('node:http')
const fs = require('node:fs')

const list = [
  {
    full_name: 'Rick Sanchez',
    age: '70',
    about: 'Cynical, alcoholic, and highly intelligent scientist'
  },
  {
    full_name: 'Morty Smith',
    age: '14',
    about: 'Timid and easily influenced, but has a strong moral compass'
  },
  {
    full_name: 'Jerry Smith',
    age: '34',
    about: 'Insecure and bumbling, but deeply cares for his family'
  },
  {
    full_name: 'Beth Smith',
    age: '34',
    about: 'Confident and ambitious, with a troubled relationship with her father'
  },
  {
    full_name: 'Summer Smith',
    age: '17',
    about: 'Typical teenage girl, but occasionally shows a dark side'
  },
  {
    full_name: 'Abadango Cluster Princess',
    age: 'Unknown',
    about: 'A princess from the Abadango Cluster'
  },
  {
    full_name: 'Abradolf Lincler',
    age: 'Unknown',
    about: 'Genetic hybrid of Abraham Lincoln and Adolf Hitler'
  },
  {
    full_name: 'Adjudicator Rick',
    age: 'Unknown',
    about: 'A high-ranking official in the Galactic Federation'
  },
  {
    full_name: 'Agency Director',
    age: 'Unknown',
    about: 'The director of the Time Variance Authority'
  },
  {
    full_name: 'Alan Rails',
    age: 'Unknown',
    about: 'A superhero with ghostly powers'
  }
]

const desiredPort = process.env.PORT ?? 1235

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html : charset = utf-8')
  if (req.url === '/') {
    res.statusCode = 200
    res.end('<h1>Pagina de Inicio</h1>')
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end(JSON.stringify(list))
  } else if (req.url === '/user') {
    res.statusCode = 200
    fs.readFile('./img/me.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>500 Internal Server Error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/jpg')
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404
    res.end('Not Found')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listener on port http://localhost:${desiredPort}`)
})
