import express from 'express'
import {
  loginController,
  logoutController,
  registerController,
  verifyTokenController,
  infomationController,
  changePasswordController,
  verifyAccessController,
  setup2faController,
  verify2faController,
  disable2faController,
  validate2faController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  refreshTokenValidator,
  securityAuthenticationTokenValidator,
  temporary2faTokenValidator
} from '~/middlewares/authenticate.middlewares'
import {
  changePasswordValidator,
  loginValidator,
  registerValidator,
  verify2faValidator,
  verifyAccessValidator
} from '~/middlewares/users.middlewares'
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
 *    authorization: Bearer <token>
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
 *    authorization: Bearer <token>
 * }
 */
router.get('/infomation', accessTokenValidator, wrapRequestHandler(infomationController))

/*
 * Description: Thay đổi mật khẩu
 * Path: /api/users/change-password
 * Method: PUT
 * headers: {
 *    authorization: Bearer <token>
 * },
 * Body: {
 *    password: string,
 *    new_password: string,
 *    confirm_new_password: string
 * }
 */
router.put(
  '/change-password',
  accessTokenValidator,
  changePasswordValidator,
  wrapRequestHandler(changePasswordController)
)

/*
 * Description: Xác thực quyền truy cập
 * Path: /api/users/verify-access
 * Method: POST
 * headers: {
 *    authorization: Bearer <token>
 * },
 * Body: {
 *    password: string
 * }
 */
router.post('/verify-access', accessTokenValidator, verifyAccessValidator, wrapRequestHandler(verifyAccessController))

/*
 * Description: Thiêt lập 2FA
 * Path: /api/users/2fa/setup
 * Method: POST
 * headers: {
 *    authorization: Bearer <token>
 *    'x-security-token': <token>
 * }
 */
router.post(
  '/2fa/setup',
  accessTokenValidator,
  securityAuthenticationTokenValidator,
  wrapRequestHandler(setup2faController)
)

/*
 * Description: Xác minh thiêt lập 2FA
 * Path: /api/users/2fa/verify
 * Method: POST
 * headers: {
 *    authorization: Bearer <token>
 *    'x-security-token': <token>
 * }
 * Body: {
 *    token: string
 * }
 */
router.post(
  '/2fa/verify',
  accessTokenValidator,
  securityAuthenticationTokenValidator,
  verify2faValidator,
  wrapRequestHandler(verify2faController)
)

/*
 * Description: Vô hiệu hóa thiêt lập 2FA
 * Path: /api/users/2fa/disable
 * Method: DELETE
 * headers: {
 *    authorization: Bearer <token>
 *    'x-security-token': <token>
 * }
 */
router.delete(
  '/2fa/disable',
  accessTokenValidator,
  securityAuthenticationTokenValidator,
  wrapRequestHandler(disable2faController)
)

/*
 * Description: Xác minh 2FA
 * Path: /api/users/2fa/validate
 * Method: POST
 * headers: {
 *    authorization: Bearer <token>
 *    'x-security-challenge': <token>
 * }
 * Body: {
 *    token: string
 * }
 */
router.post('/2fa/validate', temporary2faTokenValidator, verify2faValidator, wrapRequestHandler(validate2faController))

export default router
