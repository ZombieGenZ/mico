import { Db, MongoClient, Collection, IndexSpecification, CreateIndexesOptions } from 'mongodb'
import dotenv from 'dotenv'
import User from '~/models/schemas/users.schemas'
import RefreshToken from '~/models/schemas/refreshToken.schemas'
import Category from '~/models/schemas/categories.schemas'
import Product from '~/models/schemas/products.shemas'
import Post from '~/models/schemas/posts.schemas'

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
  get categories(): Collection<Category> {
    return this.db.collection(process.env.DATABASE_CATEGORY_COLLECTION as string)
  }
  get topics(): Collection<Category> {
    return this.db.collection(process.env.DATABASE_TOPIC_COLLECTION as string)
  }
  get brands(): Collection<Category> {
    return this.db.collection(process.env.DATABASE_BRAND_COLLECTION as string)
  }
  get products(): Collection<Product> {
    return this.db.collection(process.env.DATABASE_PRODUCT_COLLECTION as string)
  }
  get posts(): Collection<Post> {
    return this.db.collection(process.env.DATABASE_POST_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
