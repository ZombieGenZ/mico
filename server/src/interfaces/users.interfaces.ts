import { ObjectId } from 'mongodb'

export interface UserType {
  _id?: ObjectId
  name: string
  email: string
  password: string
  twoFactorSecret?: string | null
  twoFactorEnabled?: boolean
  created_at?: Date
  updated_at?: Date
}
