import { ObjectId } from 'mongodb'
import { ContactStatusEnum } from '~/enums/contact.enums'

export interface RequestQuoteType {
  _id?: ObjectId
  name: string
  phone: string
  email: string
  company: string | null
  message: string
  product: ObjectId[]
  status?: ContactStatusEnum
  is_deleted?: boolean
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}
