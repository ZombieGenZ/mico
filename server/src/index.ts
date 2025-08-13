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
import categories from '~/routes/categories.routes'
import topics from '~/routes/topics.routes'
import brands from '~/routes/brands.routes'
import products from '~/routes/products.routes'
import posts from '~/routes/posts.routes'

app.use('/api/users', users)
app.use('/api/categories', categories)
app.use('/api/topics', topics)
app.use('/api/brands', brands)
app.use('/api/products', products)
app.use('/api/posts', posts)

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Máy chủ đang chạy trên port ${port}`)
})
