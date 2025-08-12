import { Request } from 'express'
import { TokenPayload } from '~/models/requests/authentication.requests'
import User from '~/models/schemas/users.schemas'
import RefreshToken from './models/schemas/refreshToken.schemas'
import Category from './models/schemas/categories.schemas'
import Topic from './models/schemas/topics.schemas'
import Brand from './models/schemas/brands.schemas'

declare module 'express' {
  interface Request {
    user?: User
    refresh_token?: RefreshToken
    category?: Category
    topic?: Topic
    brand?: Brand
  }
}
