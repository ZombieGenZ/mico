import express from 'express'
import {
  completeRequestQuoteController,
  getRequestQuoteController,
  requestQuoteController
} from '~/controllers/requestQuote.controllers'
import { accessTokenValidator } from '~/middlewares/authenticate.middlewares'
import { requestQuoteIdValidator, requestQuoteValidator } from '~/middlewares/requestQuote.middlewares'
import { wrapRequestHandler } from '~/utils/handlers.utils'
const router = express.Router()

/*
 * Description: Lấy thông tin yêu cầu báo giá
 * Path: /api/request-quote
 * Method: GET
 * headers: {
 *    authorization: Bearer <token>
 * }
 */
router.get('/', accessTokenValidator, wrapRequestHandler(getRequestQuoteController))

/*
 * Description: Để lại thông tin yêu cầu báo giá
 * Path: /api/request-quote
 * Method: POST
 * Body: {
 *    name: string,
 *    email: string,
 *    phone: string,
 *    company: string | null,
 *    message: string,
 *    product: string[]
 * }
 */
router.post('/', requestQuoteValidator, wrapRequestHandler(requestQuoteController))

/*
 * Description: Hoàn thành thông tin yêu cầu báo giá
 * Path: /api/request-quote/:id
 * Method: PUT
 * headers: {
 *    authorization: Bearer <token>
 * },
 */
router.put('/:id', accessTokenValidator, requestQuoteIdValidator, wrapRequestHandler(completeRequestQuoteController))

export default router
