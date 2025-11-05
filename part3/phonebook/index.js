import express from 'express';
import morgan from 'morgan';

const app = express()
app.use(express.json())
morgan.token('body', request => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(morgan('tiny'))

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const countPersons = persons.length

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
        `<p>Phonebook has info for ${countPersons} people</p>
        <p>${day} ${time} ${offset} ${timeZone}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id

    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateRandomId = (existingPersons) => {
    let id
    do {
        id = Math.floor(Math.random() * 1_000_000_000) + 1

    } while (existingPersons.some(p => p.id === id));
    return id
}

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

    if (persons.some(p => p.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }


    const person = {
        id: generateRandomId(persons),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(person);
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
