import express from 'express'
import { completeContactController, contactController, getContactController } from '~/controllers/contacts.controllers'
import { accessTokenValidator } from '~/middlewares/authenticate.middlewares'
import { contactIdValidator, contactValidator } from '~/middlewares/contacts.middlewares'
import { wrapRequestHandler } from '~/utils/handlers.utils'
const router = express.Router()

/*
 * Description: Lấy thông tin liên hệ
 * Path: /api/contacts
 * Method: GET
 */
router.get('/', accessTokenValidator, wrapRequestHandler(getContactController))

/*
 * Description: Để lại thông tin liên hệ
 * Path: /api/contacts
 * Method: POST
 * Body: {
 *    name: string
 *    email: string
 *    phone: string
 *    company: string | null
 *    title: string
 *    content: string
 * }
 */
router.post('/', contactValidator, wrapRequestHandler(contactController))

/*
 * Description: Hoàn thành thông tin liên hệ
 * Path: /api/contacts/:id
 * Method: PUT
 */
router.put('/:id', accessTokenValidator, contactIdValidator, wrapRequestHandler(completeContactController))

export default router
