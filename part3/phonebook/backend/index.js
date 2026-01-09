import express from 'express'
import morgan from 'morgan'
import 'dotenv/config'
import Person from './models/person.js'

const app = express()
app.use(express.json())
morgan.token('body', request => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(morgan('tiny'))
app.use(express.static('dist'))

// let persons = [
//     {
//         "id": "1",
//         "name": "Arto Hellas",
//         "number": "040-123456"
//     },
//     {
//         "id": "2",
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523"
//     },
//     {
//         "id": "3",
//         "name": "Dan Abramov",
//         "number": "12-43-234345"
//     },
//     {
//         "id": "4",
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122"
//     }
// ]

app.get('/', (request, response) => {
  response.send('<h1>Welcome to my world!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })

  // .catch(error => {
  //     console.log(error)
  //     response.status(500)
  // })
})

app.get('/info', (request, response, next) => {
  // const countPersons = persons.length

  Person.countDocuments({})
    .then(count => {

      const date = new Date()

      const offsetMinutes = -date.getTimezoneOffset()
      const sign = offsetMinutes >= 0 ? '+' : '-'
      const hours = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(2, '0')
      const minutes = String(Math.abs(offsetMinutes) % 60).padStart(2, '0')
      const offset = `${sign}${hours}${minutes}`

      const day = date.toDateString()
      const time = date.toTimeString().slice(0, 8)
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

      response.send(
        `<p>Phonebook has info for ${count} people</p>
        <p>${day} ${time} ${offset} ${timeZone}</p>`
      )
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id

  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })

  // const person = persons.find(person => person.id === id)

})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
    .then(() => {
      response.status(200).end()
    })
    .catch(error => next(error))

  // persons = persons.filter(person => person.id !== id)

  // response.status(204).end()
})

// const generateRandomId = (existingPersons) => {
//     let id
//     do {
//         id = Math.floor(Math.random() * 1_000_000_000) + 1

//     } while (existingPersons.some(p => p.id === id));
//     return id
// }

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log('Headers:', request.headers)
  console.log('Body:', request.body)

  if (!body.name || !body.number) {
    return response.status(400).json(
      {
        error: 'name or number missing'
      }
    )
  }

  // if (person.some(p => p.name === body.name)) {
  //     return response.status(400).json({
  //         error: 'name must be unique'
  //     })
  // }


  const person = new Person({
    // id: generateRandomId(persons),
    name: body.name,
    number: body.number
  }
  )
  //     persons = persons.concat(person)
  //     response.json(person);

  person.save()
    .then(sevedPerson => {
      response.json(sevedPerson)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  const person = { name, number }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
  // .then(person => {
  //     if (!person) {
  //         return response.status(404).end()
  //     }

  //     person.name = name
  //     person.number = number

  //     return person.save()
  //         .then(updatePerson => {
  //             response.json(updatePerson)
  //         })

    .then(updatePerson => {
      if (updatePerson) {
        response.json(updatePerson)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Обробники помилок Express

const errorHandle = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandle)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
