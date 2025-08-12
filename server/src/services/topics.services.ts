import databaseService from './database.services'
import { TopicRequestBody } from '~/models/requests/topics.requests'
import Topic from '~/models/schemas/topics.schemas'

class TopicService {
  async get() {
    return await databaseService.topics.find({ is_deleted: false }).toArray()
  }
  async create(payload: TopicRequestBody) {
    await databaseService.topics.insertOne(
      new Topic({
        name: payload.name,
        index: payload.index
      })
    )
  }
  async update(payload: TopicRequestBody, topic: Topic) {
    await databaseService.topics.updateOne(
      {
        _id: topic._id
      },
      {
        $set: {
          name: payload.name,
          index: payload.index
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
  }
  async delete(topic: Topic) {
    await databaseService.topics.updateOne(
      {
        _id: topic._id
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

const topicService = new TopicService()
export default topicService
