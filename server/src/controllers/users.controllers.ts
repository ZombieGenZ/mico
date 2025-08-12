import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import HTTPSTATUS from '~/constants/httpStatus.constants'
import { AUTHENTICATE_MESSAGE, USER_MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import { TokenType } from '~/enums/jwt.enums'
import { TokenPayload } from '~/models/requests/authentication.requests'
import {
  LoginRequestBody,
  LogoutRequestBody,
  RegisterRequestBody,
  VerifyTokenRequestBody
} from '~/models/requests/users.requests'
import RefreshToken from '~/models/schemas/refreshToken.schemas'
import User from '~/models/schemas/users.schemas'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'
import { verifyToken } from '~/utils/jwt.utils'

export const registerController = async (req: Request<ParamsDictionary, any, RegisterRequestBody>, res: Response) => {
  try {
    userService.register(req.body)

    res.json({
      code: RESPONSE_CODE.REGISTER_SUCCESSFUL,
      message: USER_MESSAGE.REGISTER_SUCCESS
    })
  } catch (err: unknown) {
    res.json({
      code: RESPONSE_CODE.REGISTER_FAILED,
      message: USER_MESSAGE.REGISTER_FAILURE
    })
  }
}

export const loginController = async (req: Request<ParamsDictionary, any, LoginRequestBody>, res: Response) => {
  try {
    const user = req.user as User
    const authenticate = await userService.login(user)

    res.json({
      code: RESPONSE_CODE.LOGIN_SUCCESSFUL,
      message: USER_MESSAGE.LOGIN_SUCCESS,
      authenticate: {
        access_token: authenticate[0],
        refresh_token: authenticate[1]
      }
    })
  } catch (err: unknown) {
    res.json({
      code: RESPONSE_CODE.LOGIN_FAILED,
      message: USER_MESSAGE.LOGIN_FAILURE
    })
  }
}

export const logoutController = async (req: Request<ParamsDictionary, any, LogoutRequestBody>, res: Response) => {
  try {
    const refresh_token = req.refresh_token as RefreshToken
    await userService.logout(refresh_token._id)

    res.json({
      code: RESPONSE_CODE.LOGOUT_SUCCESSFUL,
      message: USER_MESSAGE.LOGOUT_SUCCESS
    })
  } catch (err: unknown) {
    res.json({
      code: RESPONSE_CODE.LOGOUT_FAILED,
      message: USER_MESSAGE.LOGIN_FAILURE
    })
  }
}

export const verifyTokenController = async (
  req: Request<ParamsDictionary, any, VerifyTokenRequestBody>,
  res: Response
) => {
  const access_token = req.headers.authorization || null
  const refresh_token = req.refresh_token as RefreshToken

  try {
    const access = access_token?.split(' ')
    let changed: boolean
    let result: {
      access_token: string
      refresh_token: string
    }
    if (!access || access[0] !== 'Bearer' || access[1] == '') {
      const authenticate = await userService.signAccessTokenAndRefreshToken(refresh_token.user_id.toString())

      await userService.updateRefreshToken(refresh_token.token, authenticate[1])

      result = {
        access_token: authenticate[0],
        refresh_token: authenticate[1]
      }

      changed = true
    } else {
      try {
        const decoded_access_token = (await verifyToken({
          token: access[1],
          secret: process.env.SECURITY_JWT_SECRET_ACCESS_TOKEN as string
        })) as TokenPayload

        if (
          decoded_access_token.token_type !== TokenType.AccessToken ||
          decoded_access_token.development_team !== process.env.DEVELOPMENT_TEAM ||
          decoded_access_token.company_domain !== process.env.COMPANY_DOMAIN
        ) {
          throw new Error(AUTHENTICATE_MESSAGE.ACCESS_TOKEN_INVALID)
        }

        const user = await databaseService.users.findOne({ _id: new ObjectId(decoded_access_token.user_id) })

        if (decoded_access_token.user_id !== refresh_token.user_id.toString()) {
          return res.status(HTTPSTATUS.UNAUTHORIZED).json({
            code: RESPONSE_CODE.AUTHENTICATION_FAILED,
            message: AUTHENTICATE_MESSAGE.TOKEN_PAIR_MISMATCH
          })
        }

        if (!decoded_access_token || !user) {
          const authenticate = await userService.signAccessTokenAndRefreshToken(refresh_token.user_id.toString())

          await userService.updateRefreshToken(refresh_token.token, authenticate[1])

          result = {
            access_token: authenticate[0],
            refresh_token: authenticate[1]
          }

          changed = true
        } else {
          result = {
            access_token: access[1],
            refresh_token: refresh_token.token
          }

          changed = false
        }
      } catch {
        const authenticate = await userService.signAccessTokenAndRefreshToken(refresh_token.user_id.toString())

        await userService.updateRefreshToken(refresh_token.token, authenticate[1])

        result = {
          access_token: authenticate[0],
          refresh_token: authenticate[1]
        }

        changed = true
      }
    }

    res.json({
      code: changed
        ? RESPONSE_CODE.TOKEN_AUTHENTICATION_SUCCESSFUL_TOKEN_CHANGED
        : RESPONSE_CODE.TOKEN_VERIFICATION_SUCCESSFUL,
      message: USER_MESSAGE.VERIFY_TOKEN_SUCCESS,
      authenticate: result
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.TOKEN_VERIFICATION_FAILED,
      message: USER_MESSAGE.VERIFY_TOKEN_FAILURE
    })
  }
}
