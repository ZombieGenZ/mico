import express from 'express'
import {
  createProductController,
  deleteProductController,
  getProductController,
  updateProductController
} from '~/controllers/products.controllers'
import { accessTokenValidator } from '~/middlewares/authenticate.middlewares'
import {
  productIdValidator,
  productValidator,
  setupUploadProduct,
  setupUploadProductOptional
} from '~/middlewares/products.middlewares'
import { wrapRequestHandler } from '~/utils/handlers.utils'
import { uploadProduct } from '~/utils/image.utils'
const router = express.Router()

/*
 * Description: Lấy thông tin sản phẩm
 * Path: /api/products
 * Method: GET
 */
router.get('/', wrapRequestHandler(getProductController))

/*
 * Description: Tạo sản phẩm mới
 * Path: /api/products
 * Method: POST
 * headers: {
 *    authorization: Bearer <token>
 * },
 * Body: {
 *    title: string,
 *    subtitle: string,
 *    technical_information: {
 *      code: string
 *      name: string
 *      value: string
 *      index: number
 *    }[],
 *    features: {
 *      value: string
 *      index: number
 *    }[],
 *    category_id: string,
 *    brand_id: string,
 *    in_stock: boolean,
 *    is_new: boolean,
 *    is_used: boolean,
 *    preview: file[]
 * }
 */
router.post(
  '/',
  uploadProduct.array('preview'),
  accessTokenValidator,
  productValidator,
  setupUploadProduct,
  wrapRequestHandler(createProductController)
)

/*
 * Description: Cập nhật sản phẩm
 * Path: /api/products/:id
 * Method: PUT
 * headers: {
 *    authorization: Bearer <token>
 * },
 * Body: {
 *    title: string,
 *    subtitle: string,
 *    technical_information: {
 *      code: string
 *      name: string
 *      value: string
 *      index: number
 *    }[],
 *    features: {
 *      value: string
 *      index: number
 *    }[],
 *    category_id: string,
 *    brand_id: string,
 *    in_stock: boolean,
 *    is_new: boolean,
 *    is_used: boolean,
 *    preview?: file[]
 * }
 */
router.put(
  '/:id',
  uploadProduct.array('preview'),
  accessTokenValidator,
  productIdValidator,
  productValidator,
  setupUploadProductOptional,
  wrapRequestHandler(updateProductController)
)

/*
 * Description: Xóa sản phẩm
 * Path: /api/products/:id
 * Method: DELETE
 * headers: {
 *    authorization: Bearer <token>
 * }
 */
router.delete('/:id', accessTokenValidator, productIdValidator, wrapRequestHandler(deleteProductController))

export default router
