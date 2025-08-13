import { ObjectId } from 'mongodb'

export interface UserType {
  _id?: ObjectId
  name: string
  email: string
  password: string
  created_at?: Date
  updated_at?: Date
}
