import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import bodyParser from 'body-parser'
import { defaultErrorHandler } from './middlewares/errors.middlewares'

dotenv.config()
const port = process.env.APP_PORT || 3000

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('trust proxy', true)

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  })
})

import users from '~/routes/users.routes'

app.use('/api/users', users)

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Máy chủ đang chạy trên port ${port}`)
})
