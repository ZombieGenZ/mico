import { CategoryRequestBody } from '~/models/requests/categories.requests'
import databaseService from './database.services'
import Category from '~/models/schemas/categories.schemas'

class CategoryService {
  async get() {
    return await databaseService.categories.find({ is_deleted: false }).toArray()
  }
  async create(payload: CategoryRequestBody) {
    await databaseService.categories.insertOne(
      new Category({
        name: payload.name,
        index: payload.index
      })
    )
  }
  async update(payload: CategoryRequestBody, category: Category) {
    await databaseService.categories.updateOne(
      {
        _id: category._id
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
  async delete(category: Category) {
    await databaseService.categories.updateOne(
      {
        _id: category._id
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

const categoryService = new CategoryService()
export default categoryService
