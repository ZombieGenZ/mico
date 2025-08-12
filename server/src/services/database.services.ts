import { Db, MongoClient, Collection, IndexSpecification, CreateIndexesOptions } from 'mongodb'
import dotenv from 'dotenv'
import User from '~/models/schemas/users.schemas'
import RefreshToken from '~/models/schemas/refreshToken.schemas'

dotenv.config()

const uri = process.env.DATABASE_URL as string

class DatabaseService {
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DATABASE_NAME)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })

      console.log(`Đã kết nối thành công đến cơ sở dử liệu ${process.env.DATABASE_NAME}`)
    } catch (err) {
      console.log(`Lỗi khi kết nối đến cơ sở dử liệu:`, err)
      throw err
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DATABASE_USER_COLLECTION as string)
  }
  get refreshToken(): Collection<RefreshToken> {
    return this.db.collection(process.env.DATABASE_REFRESH_TOKEN_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
