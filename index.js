require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny :method :url :status :res[content-length] - :response-time ms :postContact'))


morgan.token('postContact', (req, res) => 
	JSON.stringify(req.body)
)
  
app.get('/info', (req, res) => {
        res.send(`<p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>`)
})
  
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })  
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.number || !body.name) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
}) 

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})