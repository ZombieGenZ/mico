import { BrandRequestBody } from '~/models/requests/brands.requests'
import databaseService from './database.services'
import Brand from '~/models/schemas/brands.schemas'

class BrandService {
  async get() {
    return await databaseService.brands.find({ is_deleted: false }).toArray()
  }
  async create(payload: BrandRequestBody) {
    await databaseService.brands.insertOne(
      new Brand({
        name: payload.name,
        index: payload.index
      })
    )
  }
  async update(payload: BrandRequestBody, brand: Brand) {
    await databaseService.brands.updateOne(
      {
        _id: brand._id
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
  async delete(brand: Brand) {
    await databaseService.brands.updateOne(
      {
        _id: brand._id
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

const brandService = new BrandService()
export default brandService
