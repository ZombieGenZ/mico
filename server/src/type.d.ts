import { Request } from 'express'
import { TokenPayload } from '~/models/requests/authentication.requests'
import User from '~/models/schemas/users.schemas'
import RefreshToken from './models/schemas/refreshToken.schemas'
import Category from './models/schemas/categories.schemas'
import Topic from './models/schemas/topics.schemas'
import Brand from './models/schemas/brands.schemas'
import Product from './models/schemas/products.shemas'
import Post from './models/schemas/posts.schemas'
import { ImageType } from './interfaces/image.interfaces'
import Contact from './models/schemas/contacts.schemas'
import { ObjectId } from 'mongodb'
import RequestQuote from './models/schemas/requestQuote.schemas'

declare module 'express' {
  interface Request {
    user?: User
    refresh_token?: RefreshToken
    category?: Category
    topic?: Topic
    brand?: Brand
    product?: Product
    post?: Post
    image?: ImageType | ImageType[]
    contact?: Contact
    productList?: ObjectId[]
    requestQuote?: RequestQuote
  }
}
