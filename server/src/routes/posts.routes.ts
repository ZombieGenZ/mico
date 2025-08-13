import express from 'express'
import {
  createPostController,
  deletePostController,
  getPostController,
  updatePostController
} from '~/controllers/posts.controllers'
import { accessTokenValidator } from '~/middlewares/authenticate.middlewares'
import { postIdValidator, postValidator, setupUploadPost } from '~/middlewares/posts.middlewares'
import { wrapRequestHandler } from '~/utils/handlers.utils'
import { uploadPost } from '~/utils/image.utils'
const router = express.Router()

/*
 * Description: Lấy thông tin bài viết
 * Path: /api/posts
 * Method: GET
 */
router.get('/', wrapRequestHandler(getPostController))

/*
 * Description: Tạo bài viết mới
 * Path: /api/posts
 * Method: POST
 * headers: {
 *    authorization?: Bearer <token>
 * },
 * Body: {
 *    title: string
 *    sub_title: string
 *    content: string
 *    topic_id: string
 *    is_featured: boolean
 *    thumbnail: file
 * }
 */
router.post(
  '/',
  uploadPost.single('thumbnail'),
  accessTokenValidator,
  postValidator,
  setupUploadPost,
  wrapRequestHandler(createPostController)
)

/*
 * Description: Cập nhật bài viết
 * Path: /api/posts/:id
 * Method: PUT
 * headers: {
 *    authorization?: Bearer <token>
 * },
 * Body: {
 *    title: string
 *    sub_title: string
 *    content: string
 *    topic_id: string
 *    is_featured: boolean
 *    thumbnail: file
 * }
 */
router.put(
  '/:id',
  uploadPost.single('thumbnail'),
  accessTokenValidator,
  postIdValidator,
  postValidator,
  setupUploadPost,
  wrapRequestHandler(updatePostController)
)

/*
 * Description: Xóa bài viết
 * Path: /api/posts/:id
 * Method: DELETE
 * headers: {
 *    authorization?: Bearer <token>
 * }
 */
router.delete('/:id', accessTokenValidator, postIdValidator, wrapRequestHandler(deletePostController))

export default router
