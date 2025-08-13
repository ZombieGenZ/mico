import { Features } from '~/interfaces/features.interfaces'
import { TechnicalInformationType } from '~/interfaces/technicalInformation.interfaces'

export interface ProductRequestBody {
  title: string
  subtitle: string
  technical_information: TechnicalInformationType[]
  features: Features[]
  price: number
  rent: number
  rent_by: string
  category_id: string
  brand_id: string
  in_stock: boolean
  is_new: boolean
  is_used: boolean
}
