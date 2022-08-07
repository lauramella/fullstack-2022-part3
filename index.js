const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.json())

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    }
  ]
  
app.get('/info', (req, res) => {
        res.send(`<p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>`)
})
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body;
    
    const personNames = persons.map(person => person.name.trim().toLowerCase())

    if (!body.number || !body.name) {
        return response.status(400).json({ error: 'name or number missing' })
    }

    if (personNames.indexOf(body.name.trim().toLowerCase()) >= 0) {
        return res.status(400).json({
          error: 'Name must be unique.'
        })
    }

const person = {
    name: body.name,
    number : body.number,
    id: Math.floor(Math.random() * 100000)
}

    persons = persons.concat(person);
    response.json(person);
  })

 

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)