import { ObjectId } from 'mongodb'
import { ContactStatusEnum } from '~/enums/contact.enums'

export interface ContactType {
  _id?: ObjectId
  name: string
  phone: string
  email: string
  company: string | null
  title: string
  content: string
  status?: ContactStatusEnum
  is_deleted?: boolean
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}
