import 'dotenv/config' // маэ бути першим ніж note
import express, { request, response } from 'express'
import mongoose from 'mongoose'
import Note from './models/note.js'

const app = express()

app.use(express.json())
// app.use(requestLogger)

const password = process.argv[2]

// const url = `mongodb+srv://andriiyakovliev_db_user:${password}@cluster0.ofddtyl.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

// mongoose.set('strictQuery', false)
// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//     content: String,
//     important: Boolean,
// })

// noteSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id
//         delete returnedObject.__v
//     }
// })

// const Note = mongoose.model('Note', noteSchema)

// let notes = [
//     {
//         id: '1',
//         content: 'HTML is easy',
//         important: true
//     },
//     {
//         id: '2',
//         content: 'Browser can execute only JavaScript',
//         important: false
//     },
//     {
//         id: '3',
//         content: 'GET and POST are the most important methods of HTTP protocol',
//         important: true
//     }
// ]

// const app = createServer((request, response) => {
//     response.writeHead(200, { 'Content-type': 'application/json' })
//     response.end(JSON.stringify(notes))
// })

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
    // response.json(notes)
    Note.find({})
        .then(notes => {
            response.json(notes)
        })
})

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        // .catch(error => {
        //     console.log(error);
        //     response.status(500).send({ error: 'malformatted id' })
        // })
        .catch(error => next(error)) // передаємо помилку, як параметр насутпній функції
    // const id = request.params.id
    // const note = notes.find(note => note.id === id)

})

app.delete('/api/notes/:id', (request, response, next) => {
    // const id = request.params.id
    // notes = notes.filter(note => note.id !== id)

    // response.status(204).end()

    Note.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const generateId = () => {
    const maxId = Note.length > 0 // найбільший ідентифікатор у поточному списку
        ? Math.max(...Note.map(n => Number(n.id)))
        : 0

    return String(maxId + 1)
}

app.post('/api/notes', (request, response, next) => {
    const body = request.body
    console.log('Отримано body:', body);
    console.log('Type of body:', typeof body);
    console.log('body.content:', body.content);
    console.log('body.important:', body.important);

    if (!body.content) {
        return response.status(400).json(
            {
                error: 'content missing'
            }
        )
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        // id: generateId(),
    })

    // note = note.concat(note)

    // console.log(note)
    note.save()
        .then(savedNote => {
            console.log(savedNote);

            response.json(savedNote);
        })
        // response.json(note);

        .catch(error => next(error))

})

app.put('/api/notes/:id', (request, response, next) => {
    const { content, important } = request.body

    // це теж саме, що вище
    // const content = request.body.content
    // const important = request.body.important

    Note.findById(request.params.id)
        .then(note => {
            if (!note) {
                return response.status(404).end()
            }

            note.content = content
            note.important = important

            return note.save().then((updatedNote) => {
                response.json(updatedNote)
            })
        })
        .catch(error => next(error))
})

app.use(express.static('dist'))


// обробки непідтримуваних маршрутів

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// Обробники помилок Express

const errorHandle = (error, request, response, next) => {
    console.log(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandle)

const PORT = process.env.PORT
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})