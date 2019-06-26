const express = require('express')
const morgan = require('morgan')
const app = express()

const state = {}

app.use(morgan('dev'))

app.get('/state', (req, res, next) => {
    res.json(state)
})

app.use(require('./controllers/invoices'))

module.exports = app

app.listen(3000)