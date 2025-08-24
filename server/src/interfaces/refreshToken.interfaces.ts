import { ObjectId } from 'mongodb'

export interface RefreshTokenType {
  _id?: ObjectId
  token: string
  user_id: ObjectId
  ip?: string
  device?: string
  os?: string
  created_at?: Date
  updated_at?: Date
}
