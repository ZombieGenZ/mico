import { Request } from 'express'
import { TokenPayload } from '~/models/requests/authentication.requests'
import User from '~/models/schemas/users.schemas'
import RefreshToken from './models/schemas/refreshToken.schemas'

declare module 'express' {
  interface Request {
    user?: User
    refresh_token?: RefreshToken
  }
}
