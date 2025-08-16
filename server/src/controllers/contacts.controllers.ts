import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { CONTACT_MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import { ContactRequestBody } from '~/models/requests/contacts.requests'
import Contact from '~/models/schemas/contacts.schemas'
import contactService from '~/services/contacts.services'

export const getContactController = async (req: Request, res: Response) => {
  try {
    res.json({
      code: RESPONSE_CODE.GET_CONTACT_SUCCESSFUL,
      message: CONTACT_MESSAGE.GET_CONTACT_SUCCESS,
      data: await contactService.get()
    })
  } catch {
    res.json({
      code: RESPONSE_CODE.GET_CONTACT_FAILED,
      message: CONTACT_MESSAGE.GET_CONTACT_FAILURE
    })
  }
}

export const contactController = async (req: Request<ParamsDictionary, any, ContactRequestBody>, res: Response) => {
  try {
    contactService.contact(req.body)

    res.json({
      code: RESPONSE_CODE.CONTACT_SUCCESSFUL,
      message: CONTACT_MESSAGE.CONTACT_SUCCESS
    })
  } catch {
    res.json({
      code: RESPONSE_CODE.CONTACT_FAILED,
      message: CONTACT_MESSAGE.CONTACT_FAILURE
    })
  }
}

export const completeContactController = async (req: Request, res: Response) => {
  try {
    const contact = req.contact as Contact

    contactService.complete(contact)

    res.json({
      code: RESPONSE_CODE.COMPLETE_CONTACT_SUCCESSFUL,
      message: CONTACT_MESSAGE.COMPLETE_CONTACT_SUCCESS
    })
  } catch {
    res.json({
      code: RESPONSE_CODE.COMPLETE_CONTACT_FAILED,
      message: CONTACT_MESSAGE.COMPLETE_CONTACT_FAILURE
    })
  }
}
