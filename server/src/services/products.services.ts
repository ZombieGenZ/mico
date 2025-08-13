import { ProductRequestBody } from '~/models/requests/products.request'
import databaseService from './database.services'
import Category from '~/models/schemas/categories.schemas'
import Brand from '~/models/schemas/brands.schemas'
import { generatePath } from '~/utils/url.utils'
import { ImageType } from '~/interfaces/image.interfaces'
import Product from '~/models/schemas/products.shemas'

class ProductService {
  async checkPath(path: string) {
    const product = await databaseService.products.findOne({ path })
    return Boolean(product)
  }
  async get() {
    return await databaseService.products
      .aggregate([
        {
          $match: { is_deleted: false }
        },
        {
          $lookup: {
            from: process.env.DATABASE_CATEGORY_COLLECTION as string,
            localField: 'category_id',
            foreignField: '_id',
            as: 'category'
          }
        },
        {
          $unwind: '$category'
        },
        {
          $lookup: {
            from: process.env.DATABASE_BRAND_COLLECTION as string,
            localField: 'brand_id',
            foreignField: '_id',
            as: 'brand'
          }
        },
        {
          $unwind: '$brand'
        }
      ])
      .toArray()
  }
  async create(payload: ProductRequestBody, category: Category, brand: Brand, image: ImageType[]) {
    const path = await generatePath(payload.title, this)

    await databaseService.products.insertOne(
      new Product({
        path: path,
        title: payload.title,
        subtitle: payload.subtitle,
        technical_information: payload.technical_information,
        features: payload.features,
        image: image,
        price: payload.price,
        rent: payload.rent,
        rent_by: payload.rent_by,
        category_id: category._id,
        brand_id: brand._id,
        in_stock: payload.in_stock,
        is_new: payload.is_new,
        is_used: payload.is_used
      })
    )
  }
  async update(payload: ProductRequestBody, category: Category, brand: Brand, product: Product, image?: ImageType[]) {
    const path = await generatePath(payload.title, this)

    await databaseService.products.updateOne(
      {
        _id: product._id
      },
      {
        $set: {
          path: path,
          title: payload.title,
          subtitle: payload.subtitle,
          technical_information: payload.technical_information,
          features: payload.features,
          image: image ? image : product.image,
          price: payload.price,
          rent: payload.rent,
          rent_by: payload.rent_by,
          category_id: category._id,
          brand_id: brand._id,
          in_stock: payload.in_stock,
          is_new: payload.is_new,
          is_used: payload.is_used
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
  }
  async delete(product: Product) {
    await databaseService.products.updateOne(
      {
        _id: product._id
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

const productService = new ProductService()
export default productService
