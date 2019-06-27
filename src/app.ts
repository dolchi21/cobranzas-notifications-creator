import * as express from 'express'
import * as morgan from 'morgan'

export const app = express()

app.use(morgan('dev'))

const state = {}
app.get('/state', (req, res, next) => {
    res.json(state)
})

app.use(require('./controllers/invoices'))
