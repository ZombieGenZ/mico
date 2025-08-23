import databaseService from './database.services'
import { ContactStatusEnum } from '~/enums/contact.enums'
import { RequestQuoteRequestBody } from '~/models/requests/requestQuote.requests'
import RequestQuote from '~/models/schemas/requestQuote.schemas'
import { ObjectId } from 'mongodb'

class RequestQuoteService {
  async get() {
    return await databaseService.requestQuote
      .aggregate([
        {
          $match: { is_deleted: false }
        },
        {
          $lookup: {
            from: process.env.DATABASE_PRODUCT_COLLECTION,
            localField: 'product',
            foreignField: '_id',
            as: 'product'
          }
        }
      ])
      .toArray()
  }
  async request(payload: RequestQuoteRequestBody, product: ObjectId[]) {
    await databaseService.requestQuote.insertOne(
      new RequestQuote({
        ...payload,
        product
      })
    )
  }
  async complete(quote: RequestQuote) {
    await databaseService.requestQuote.updateOne(
      {
        _id: quote._id
      },
      {
        $set: {
          status: ContactStatusEnum.Complete
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
  }
}

const requestQuoteService = new RequestQuoteService()
export default requestQuoteService
