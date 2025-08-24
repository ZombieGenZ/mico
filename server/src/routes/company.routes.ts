import express from 'express'
import {
  changeCompanyCoreController,
  changeContactController,
  changeSocialController,
  getCompanyInfomationController
} from '~/controllers/company.controllers'
import { accessTokenValidator } from '~/middlewares/authenticate.middlewares'
import {
  changeCompanyContactValidator,
  changeCompanyCoreValidator,
  changeCompanySocialValidator
} from '~/middlewares/company.middlewares'
import { wrapRequestHandler } from '~/utils/handlers.utils'
const router = express.Router()

/*
 * Description: Lấy thông tin công ty
 * Path: /api/company
 * Method: GET
 */
router.get('/', wrapRequestHandler(getCompanyInfomationController))

/*
 * Description: Thay đổi thông tin công ty
 * Path: /api/company
 * Method: POST
 * headers: {
 *    authorization?: Bearer <token>
 * },
 * Body: {
 *    name: string,
 *    slogan: string,
 *    description: string,
 *    logo_url: string,
 *    tax_code: string,
 *    business_license: string
 * }
 */
router.post('/', accessTokenValidator, changeCompanyCoreValidator, wrapRequestHandler(changeCompanyCoreController))

/*
 * Description: Thay đổi thông tin liên hệ
 * Path: /api/company/contact
 * Method: POST
 * headers: {
 *    authorization?: Bearer <token>
 * },
 * Body: {
 *    hotline: string,
 *    primary_email: string,
 *    sales_email: string,
 *    support_email: string,
 *    head_office_address: string,
 *    working_hours_on_a_weekday: string,
 *    weekend_working_hours: string
 * }
 */
router.post(
  '/contact',
  accessTokenValidator,
  changeCompanyContactValidator,
  wrapRequestHandler(changeContactController)
)

/*
 * Description: Thay đổi thông tin mạng xả hội
 * Path: /api/company/social
 * Method: POST
 * headers: {
 *    authorization?: Bearer <token>
 * },
 * Body: {
 *    facebook: string,
 *    x: string,
 *    instagram: string,
 *    linkedin: string
 * }
 */
router.post('/social', accessTokenValidator, changeCompanySocialValidator, wrapRequestHandler(changeSocialController))

export default router
