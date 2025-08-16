import databaseService from './database.services'
import Contact from '~/models/schemas/contacts.schemas'
import { ContactStatusEnum } from '~/enums/contact.enums'
import { ContactRequestBody } from '~/models/requests/contacts.requests'

class ContactService {
  async get() {
    return await databaseService.contacts.find().toArray()
  }
  async contact(payload: ContactRequestBody) {
    await databaseService.contacts.insertOne(
      new Contact({
        ...payload
      })
    )
  }
  async complete(contact: Contact) {
    await databaseService.contacts.updateOne(
      {
        _id: contact._id
      },
      {
        $set: {
          status: ContactStatusEnum.Complete
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
  }
}

const contactService = new ContactService()
export default contactService
