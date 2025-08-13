import { ObjectId } from 'mongodb'
import { TopicType } from '~/interfaces/topics.interfaces'

export default class Topic {
  _id: ObjectId
  name: string
  index: number
  is_deleted: boolean
  created_at: Date
  updated_at: Date
  deleted_at: Date

  constructor(category: TopicType) {
    const date = new Date()

    this._id = category._id || new ObjectId()
    this.name = category.name
    this.index = category.index
    this.is_deleted = category.is_deleted || false
    this.created_at = category.created_at || date
    this.updated_at = category.updated_at || date
    this.deleted_at = category.deleted_at || date
  }
}
