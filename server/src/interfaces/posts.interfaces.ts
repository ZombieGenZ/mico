import { ObjectId } from 'mongodb'
import { ImageType } from './image.interfaces'

export interface PostType {
  _id?: ObjectId
  path: string
  title: string
  sub_title: string
  content: string
  topic_id: ObjectId
  user_id: ObjectId
  read_time: string
  is_featured: boolean
  thumbnail: ImageType
  is_deleted?: boolean
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}
