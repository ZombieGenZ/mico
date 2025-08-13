import { ObjectId } from 'mongodb'
import { ImageType } from '~/interfaces/image.interfaces'
import { PostType } from '~/interfaces/posts.interfaces'

export default class Post {
  _id: ObjectId
  path: string
  title: string
  sub_title: string
  content: string
  topic_id: ObjectId
  user_id: ObjectId
  read_time: string
  is_featured: boolean
  thumbnail: ImageType
  is_deleted: boolean
  created_at: Date
  updated_at: Date
  deleted_at: Date

  constructor(post: PostType) {
    const date = new Date()

    this._id = post._id || new ObjectId()
    this.path = post.path
    this.title = post.title
    this.sub_title = post.sub_title
    this.content = post.content
    this.topic_id = post.topic_id
    this.user_id = post.user_id
    this.read_time = post.read_time
    this.is_featured = post.is_featured
    this.thumbnail = post.thumbnail
    this.is_deleted = post.is_deleted || false
    this.created_at = post.created_at || date
    this.updated_at = post.updated_at || date
    this.deleted_at = post.deleted_at || date
  }
}
