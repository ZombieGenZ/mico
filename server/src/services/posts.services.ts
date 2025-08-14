import User from '~/models/schemas/users.schemas'
import databaseService from './database.services'
import Topic from '~/models/schemas/topics.schemas'
import { PostRequestBody } from '~/models/requests/posts.request'
import { generatePath } from '~/utils/url.utils'
import Post from '~/models/schemas/posts.schemas'
import { readingTimeLabel } from '~/utils/readTime.utils'
import { ImageType } from '~/interfaces/image.interfaces'

class PostService {
  async checkPath(path: string) {
    const post = await databaseService.posts.findOne({ path })
    return Boolean(post)
  }
  async get() {
    return await databaseService.posts
      .aggregate([
        {
          $match: { is_deleted: false }
        },
        {
          $lookup: {
            from: process.env.DATABASE_TOPIC_COLLECTION as string,
            localField: 'topic_id',
            foreignField: '_id',
            as: 'topic'
          }
        },
        {
          $unwind: '$topic'
        },
        {
          $lookup: {
            from: process.env.DATABASE_USER_COLLECTION as string,
            localField: 'user_id',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $unwind: '$user'
        }
      ])
      .toArray()
  }
  async create(payload: PostRequestBody, topic: Topic, user: User, image: ImageType) {
    const path = await generatePath(payload.title, this)
    const readTime = readingTimeLabel(payload.content)

    await databaseService.posts.insertOne(
      new Post({
        path: path,
        title: payload.title,
        sub_title: payload.sub_title,
        content: payload.content,
        topic_id: topic._id,
        user_id: user._id,
        read_time: readTime,
        is_featured: payload.is_featured,
        thumbnail: image
      })
    )
  }
  async update(payload: PostRequestBody, topic: Topic, post: Post, image?: ImageType) {
    const path = await generatePath(payload.title, this, post.path)
    const readTime = readingTimeLabel(payload.content)

    await databaseService.posts.updateOne(
      {
        _id: post._id
      },
      {
        $set: {
          path: path,
          title: payload.title,
          sub_title: payload.sub_title,
          content: payload.content,
          topic_id: topic._id,
          read_time: readTime,
          is_featured: payload.is_featured,
          thumbnail: image ? image : post.thumbnail
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
  }
  async delete(post: Post) {
    await databaseService.posts.updateOne(
      {
        _id: post._id
      },
      {
        $set: {
          is_deleted: true
        },
        $currentDate: {
          deleted_at: true
        }
      }
    )
  }
}

const postService = new PostService()
export default postService
