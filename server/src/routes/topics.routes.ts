import express from 'express'
import {
  createTopicController,
  deleteTopicController,
  getTopicController,
  updateTopicController
} from '~/controllers/topics.controllers'
import { topicIdValidator, topicValidator } from '~/middlewares/topics.middlewares'
import { wrapRequestHandler } from '~/utils/handlers.utils'
const router = express.Router()

/*
 * Description: Lấy thông tin chủ đề
 * Path: /api/topics
 * Method: GET
 */
router.get('/', wrapRequestHandler(getTopicController))

/*
 * Description: Tạo chủ đề mới
 * Path: /api/topics
 * Method: POST
 * headers: {
 *    authorization?: Bearer <token>
 * },
 * Body: {
 *    name: string,
 *    index: number
 * }
 */
router.post('/', topicValidator, wrapRequestHandler(createTopicController))

/*
 * Description: Cập nhật chủ đề
 * Path: /api/topics/:id
 * Method: PUT
 * headers: {
 *    authorization?: Bearer <token>
 * },
 * Body: {
 *    name: string,
 *    index: number
 * }
 */
router.put('/:id', topicIdValidator, topicValidator, wrapRequestHandler(updateTopicController))

/*
 * Description: Xóa chủ đề
 * Path: /api/topics/:id
 * Method: DELETE
 * headers: {
 *    authorization?: Bearer <token>
 * }
 */
router.delete('/:id', topicIdValidator, wrapRequestHandler(deleteTopicController))

export default router
