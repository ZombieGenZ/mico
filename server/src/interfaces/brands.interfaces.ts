import { ObjectId } from 'mongodb'

export interface BrandType {
  _id?: ObjectId
  name: string
  index: number
  is_deleted?: boolean
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}
