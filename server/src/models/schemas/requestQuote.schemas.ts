import { ObjectId } from 'mongodb'
import { ContactStatusEnum } from '~/enums/contact.enums'
import { RequestQuoteType } from '~/interfaces/requestQuote.interfaces'

export default class RequestQuote {
  _id: ObjectId
  name: string
  phone: string
  email: string
  company: string | null
  message: string
  product: ObjectId[]
  status: ContactStatusEnum
  is_deleted: boolean
  created_at: Date
  updated_at: Date
  deleted_at: Date

  constructor(quote: RequestQuoteType) {
    const date = new Date()

    this._id = quote._id || new ObjectId()
    this.name = quote.name
    this.phone = quote.phone
    this.email = quote.email
    this.company = quote.company
    this.message = quote.message
    this.product = quote.product
    this.status = quote.status || ContactStatusEnum.Pedding
    this.is_deleted = quote.is_deleted || false
    this.created_at = quote.created_at || date
    this.updated_at = quote.updated_at || date
    this.deleted_at = quote.deleted_at || date
  }
}
