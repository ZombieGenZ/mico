import { ObjectId } from 'mongodb'
import { ContactStatusEnum } from '~/enums/contact.enums'
import { ContactType } from '~/interfaces/contacts.interfaces'

export default class Contact {
  _id: ObjectId
  name: string
  phone: string
  email: string
  company: string | null
  title: string
  content: string
  status: ContactStatusEnum
  is_deleted: boolean
  created_at: Date
  updated_at: Date
  deleted_at: Date

  constructor(contect: ContactType) {
    const date = new Date()

    this._id = contect._id || new ObjectId()
    this.name = contect.name
    this.phone = contect.phone
    this.email = contect.email
    this.company = contect.company
    this.title = contect.title
    this.content = contect.content
    this.status = contect.status || ContactStatusEnum.Pedding
    this.is_deleted = contect.is_deleted || false
    this.created_at = contect.created_at || date
    this.updated_at = contect.updated_at || date
    this.deleted_at = contect.deleted_at || date
  }
}
