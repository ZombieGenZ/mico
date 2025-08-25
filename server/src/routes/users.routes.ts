import express from 'express'
import {
  loginController,
  logoutController,
  registerController,
  verifyTokenController,
  infomationController
} from '~/controllers/users.controllers'
import { accessTokenValidator, refreshTokenValidator } from '~/middlewares/authenticate.middlewares'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers.utils'
const router = express.Router()

/*
 * Description: Tạo một tài khoản quản trị viên mới
 * Path: /api/users/register
 * Method: POST
 * Body: {
 *    token: string,
 *    name: string,
 *    email: string,
 *    password: string,
 *    confirm_password: string
 * }
 */
router.post('/register', registerValidator, wrapRequestHandler(registerController))

/*
 * Description: Đăng nhập tài khoản
 * Path: /api/users/login
 * Method: POST
 * Body: {
 *    email: string,
 *    password: string
 * }
 */
router.post('/login', loginValidator, wrapRequestHandler(loginController))

/*
 * Description: Đăng xuất tài khoản
 * Path: /api/users/logout
 * Method: DELETE
 * Body: {
 *    refresh_token: string
 * }
 */
router.delete('/logout', refreshTokenValidator, wrapRequestHandler(logoutController))

/*
 * Description: Xác thực token xác thực
 * Path: /api/users/verify-token
 * Method: POST
 * headers: {
 *    authorization?: Bearer <token>
 * },
 * Body: {
 *    refresh_token: string
 * }
 */
router.post('/verify-token', refreshTokenValidator, wrapRequestHandler(verifyTokenController))

/*
 * Description:Lấy thông tin người dùng
 * Path: /api/users/infomation
 * Method: GET
 * headers: {
 *    authorization?: Bearer <token>
 * }
 */
router.get('/infomation', accessTokenValidator, wrapRequestHandler(infomationController))

export default router
