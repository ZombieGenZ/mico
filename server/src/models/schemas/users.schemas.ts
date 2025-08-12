import { ObjectId } from 'mongodb'

interface UserType {
  _id?: ObjectId
  name: string
  email: string
  password: string
  created_at?: Date
}

export default class User {
  _id: ObjectId
  name: string
  email: string
  password: string
  created_at: Date

  constructor(user: UserType) {
    this._id = user._id || new ObjectId()
    this.name = user.name
    this.email = user.email
    this.password = user.password
    this.created_at = user.created_at || new Date()
  }
}
