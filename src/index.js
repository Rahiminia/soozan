const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const apiRouter = require('./routes/api')
const rootRouter = require('./routes/root')
const auth = require('./routes/auth')
const jwt = require('./middlewares/jwt')

const PORT = 3000

app = express()

app.set('view engine','pug')
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',rootRouter)
app.use('/auth', auth)
app.use('/api/v1', jwt, apiRouter)

console.log(`listening on http://localhost:${PORT}`)
app.listen(PORT)
