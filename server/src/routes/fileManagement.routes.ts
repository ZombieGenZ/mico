import express from 'express'
import { uploadImageController } from '~/controllers/uploadImageController.controllers'
import { accessTokenValidator } from '~/middlewares/authenticate.middlewares'
import { setupUploadImage } from '~/middlewares/fileManagement.middlewares'
import { wrapRequestHandler } from '~/utils/handlers.utils'
import { upload } from '~/utils/image.utils'
const router = express.Router()

/*
 * Description: Tải lên một tệp hình ảnh lên máy chủ
 * Path: /api/file-management
 * Method: POST
 * headers: {
 *    authorization: Bearer <token>
 * },
 * body: {
 *    image: file
 * }
 */
router.post(
  '/',
  upload.single('image'),
  accessTokenValidator,
  setupUploadImage,
  wrapRequestHandler(uploadImageController)
)

export default router
