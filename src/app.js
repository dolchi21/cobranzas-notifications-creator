const express = require('express')
const app = express()

const state = {}

app.get('/state', (req, res, next) => {
    res.json(state)
})

app.use(require('./controllers/invoices'))

module.exports = app

app.listen(3000)