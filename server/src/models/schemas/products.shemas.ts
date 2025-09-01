import { ObjectId } from 'mongodb'
import { Features } from '~/interfaces/features.interfaces'
import { ImageType } from '~/interfaces/image.interfaces'
import { ProductType } from '~/interfaces/product.interfaces'
import { TechnicalInformationType } from '~/interfaces/technicalInformation.interfaces'

export default class Product {
  _id: ObjectId
  path: string
  title: string
  subtitle: string
  technical_information: TechnicalInformationType[]
  features: Features[]
  image: ImageType[]
  category_id: ObjectId
  brand_id: ObjectId
  in_stock: boolean
  is_new: boolean
  is_used: boolean
  is_deleted: boolean
  created_at: Date
  updated_at: Date
  deleted_at: Date

  constructor(product: ProductType) {
    const date = new Date()

    this._id = product._id || new ObjectId()
    this.path = product.path
    this.title = product.title
    this.subtitle = product.subtitle
    this.technical_information = product.technical_informations
    this.features = product.features
    this.image = product.image
    this.category_id = product.category_id
    this.brand_id = product.brand_id
    this.in_stock = product.in_stock
    this.is_new = product.is_new
    this.is_used = product.is_used
    this.is_deleted = product.is_deleted || false
    this.created_at = product.created_at || date
    this.updated_at = product.updated_at || date
    this.deleted_at = product.deleted_at || date
  }
}
