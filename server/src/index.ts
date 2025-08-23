import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import bodyParser from 'body-parser'
import { defaultErrorHandler } from './middlewares/errors.middlewares'
import expressUserAgent from 'express-useragent'
import { initServiceInformation } from './state/serviceInformation.state'

dotenv.config()
const port = process.env.APP_PORT || 3000

const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
    credentials: true
  },
  transports: ['websocket', 'polling'],
  allowUpgrades: true,
  pingTimeout: 60000,
  pingInterval: 25000,
  upgradeTimeout: 30000,
  maxHttpBufferSize: 10e7,
  allowEIO3: true
})

app.use((req, res, next) => {
  ;(req as any).io = io
  next()
})

app.use(express.json())
app.use(expressUserAgent.express())
app.use(express.static(path.join(__dirname, '../public')))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('trust proxy', true)

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  })
})

initServiceInformation()

import users from '~/routes/users.routes'
import categories from '~/routes/categories.routes'
import topics from '~/routes/topics.routes'
import brands from '~/routes/brands.routes'
import products from '~/routes/products.routes'
import posts from '~/routes/posts.routes'
import contacts from '~/routes/contacts.routes'
import requestQuote from '~/routes/requestQuote.routes'

app.use('/api/users', users)
app.use('/api/categories', categories)
app.use('/api/topics', topics)
app.use('/api/brands', brands)
app.use('/api/products', products)
app.use('/api/posts', posts)
app.use('/api/contacts', contacts)
app.use('/api/request-quote', requestQuote)

app.use(defaultErrorHandler)

io.on('connection', (socket: Socket) => {
  console.log(`Người dùng ${socket.id} đã kết nối đến máy chủ ${process.env.TRADEMARK_NAME}`)

  // các event (THAM KHẢO TẠI https://github.com/ZombieGenZ/tank-food)

  socket.on('disconnect', () => {
    console.log(`Người dùng ${socket.id} đã ngắt kết nối đến máy chủ ${process.env.TRADEMARK_NAME}`)
  })
})

server.listen(port, () => {
  console.log(`Máy chủ đang chạy trên port ${port}`)
})

export { io }
