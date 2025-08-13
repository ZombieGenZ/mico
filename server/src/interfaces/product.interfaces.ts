import { ObjectId } from 'mongodb'
import { TechnicalInformationType } from './technicalInformation.interfaces'
import { Features } from './features.interfaces'
import { ImageType } from './image.interfaces'

export interface ProductType {
  _id?: ObjectId
  path: string
  title: string
  subtitle: string
  technical_information: TechnicalInformationType[]
  features: Features[]
  image: ImageType[]
  price: number
  rent: number
  rent_by: string
  category_id: ObjectId
  brand_id: ObjectId
  in_stock: boolean
  is_new: boolean
  is_used: boolean
  is_deleted?: boolean
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}
