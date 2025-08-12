import express from 'express'
import {
  createBrandController,
  deleteBrandController,
  getBrandController,
  updateBrandController
} from '~/controllers/brands.controllers'
import { brandIdValidator, brandValidator } from '~/middlewares/brands.middlewares'
import { wrapRequestHandler } from '~/utils/handlers.utils'
const router = express.Router()

/*
 * Description: Lấy thông tin thương hiệu
 * Path: /api/brands
 * Method: GET
 */
router.get('/', wrapRequestHandler(getBrandController))

/*
 * Description: Tạo thương hiệu mới
 * Path: /api/brands
 * Method: POST
 * headers: {
 *    authorization?: Bearer <token>
 * },
 * Body: {
 *    name: string,
 *    index: number
 * }
 */
router.post('/', brandValidator, wrapRequestHandler(createBrandController))

/*
 * Description: Cập nhật thương hiệu
 * Path: /api/brands/:id
 * Method: PUT
 * headers: {
 *    authorization?: Bearer <token>
 * },
 * Body: {
 *    name: string,
 *    index: number
 * }
 */
router.put('/:id', brandValidator, brandIdValidator, wrapRequestHandler(updateBrandController))

/*
 * Description: Xóa thương hiệu
 * Path: /api/brands/:id
 * Method: DELETE
 * headers: {
 *    authorization?: Bearer <token>
 * }
 */
router.delete('/:id', brandIdValidator, wrapRequestHandler(deleteBrandController))

export default router
