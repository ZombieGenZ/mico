import express from 'express'
import {
  createCategoryController,
  deleteCategoryController,
  getCategoryController,
  updateCategoryController
} from '~/controllers/categories.controllers'
import { categoryIdValidator, categoryValidator } from '~/middlewares/categories.niddkewares'
import { wrapRequestHandler } from '~/utils/handlers.utils'
const router = express.Router()

/*
 * Description: Lấy thông tin danh mục
 * Path: /api/categories
 * Method: GET
 */
router.get('/', wrapRequestHandler(getCategoryController))

/*
 * Description: Tạo danh mục mới
 * Path: /api/categories
 * Method: POST
 * headers: {
 *    authorization?: Bearer <token>
 * },
 * Body: {
 *    name: string,
 *    index: number
 * }
 */
router.post('/', categoryValidator, wrapRequestHandler(createCategoryController))

/*
 * Description: Cập nhật danh mục
 * Path: /api/categories/:id
 * Method: PUT
 * headers: {
 *    authorization?: Bearer <token>
 * },
 * Body: {
 *    name: string,
 *    index: number
 * }
 */
router.put('/:id', categoryIdValidator, categoryValidator, wrapRequestHandler(updateCategoryController))

/*
 * Description: Xóa danh mục
 * Path: /api/categories/:id
 * Method: DELETE
 * headers: {
 *    authorization?: Bearer <token>
 * }
 */
router.delete('/:id', categoryIdValidator, wrapRequestHandler(deleteCategoryController))

export default router
