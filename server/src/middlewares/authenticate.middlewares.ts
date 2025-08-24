import { Request, Response, NextFunction } from 'express'
import { checkSchema, validationResult } from 'express-validator'
import { ObjectId } from 'mongodb'
import HTTPSTATUS from '~/constants/httpStatus.constants'
import { AUTHENTICATE_MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import { TokenType } from '~/enums/jwt.enums'
import { TokenPayload } from '~/models/requests/authentication.requests'
import databaseService from '~/services/database.services'
import { removeUploadedFiles } from '~/utils/image.utils'
import { verifyToken } from '~/utils/jwt.utils'

export const accessTokenValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      authorization: {
        notEmpty: {
          errorMessage: AUTHENTICATE_MESSAGE.ACCESS_TOKEN_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: AUTHENTICATE_MESSAGE.ACCESS_TOKEN_MUST_BE_A_STRING
        },
        custom: {
          options: async (value, { req }) => {
            const authorization = value.split(' ')

            if (authorization[0] !== 'Bearer') {
              throw new Error(AUTHENTICATE_MESSAGE.ACCESS_TOKEN_INVALID)
            }

            if (authorization[1] === '') {
              throw new Error(AUTHENTICATE_MESSAGE.ACCESS_TOKEN_INVALID)
            }

            try {
              const decoded_access_token = (await verifyToken({
                token: authorization[1],
                secret: process.env.SECURITY_JWT_SECRET_ACCESS_TOKEN as string
              })) as TokenPayload

              if (
                !decoded_access_token ||
                decoded_access_token.token_type !== TokenType.AccessToken ||
                decoded_access_token.development_team !== process.env.DEVELOPMENT_TEAM ||
                decoded_access_token.company_domain !== process.env.COMPANY_DOMAIN
              ) {
                throw new Error(AUTHENTICATE_MESSAGE.ACCESS_TOKEN_INVALID)
              }

              const user = await databaseService.users.findOne({
                _id: new ObjectId(decoded_access_token.user_id)
              })

              if (!user) {
                throw new Error(AUTHENTICATE_MESSAGE.USER_DOES_NOT_EXIST)
              }

              ;(req as Request).user = user
            } catch {
              throw new Error(AUTHENTICATE_MESSAGE.ACCESS_TOKEN_INVALID)
            }

            return true
          }
        }
      }
    },
    ['headers']
  )
    .run(req)
    .then(() => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        removeUploadedFiles(req)
        res.status(HTTPSTATUS.UNAUTHORIZED).json({
          code: RESPONSE_CODE.AUTHENTICATION_FAILED,
          message: AUTHENTICATE_MESSAGE.AUTHENTICATION_FAILED,
          errors: errors.mapped()
        })
        return
      }
      next()
      return
    })
    .catch((err) => {
      removeUploadedFiles(req)
      res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
        code: RESPONSE_CODE.FATAL_AUTHENTICATION_FAILURE,
        message: err
      })
      return
    })
}

export const refreshTokenValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      refresh_token: {
        notEmpty: {
          errorMessage: AUTHENTICATE_MESSAGE.REFRESH_TOKEN_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: AUTHENTICATE_MESSAGE.REFRESH_TOKEN_MUST_BE_A_STRING
        },
        custom: {
          options: async (value, { req }) => {
            try {
              const decoded_refresh_token = (await verifyToken({
                token: value,
                secret: process.env.SECURITY_JWT_SECRET_REFRESH_TOKEN as string
              })) as TokenPayload

              if (
                !decoded_refresh_token ||
                decoded_refresh_token.token_type !== TokenType.RefreshToken ||
                decoded_refresh_token.development_team !== process.env.DEVELOPMENT_TEAM ||
                decoded_refresh_token.company_domain !== process.env.COMPANY_DOMAIN
              ) {
                throw new Error(AUTHENTICATE_MESSAGE.REFRESH_TOKEN_INVALID)
              }

              const refresh_token = await databaseService.refreshToken.findOne({ token: value })

              if (!refresh_token) {
                throw new Error(AUTHENTICATE_MESSAGE.REFRESH_TOKEN_INVALID)
              }

              ;(req as Request).refresh_token = refresh_token

              const user = await databaseService.users.findOne({
                _id: refresh_token.user_id
              })

              if (!user) {
                throw new Error(AUTHENTICATE_MESSAGE.USER_DOES_NOT_EXIST)
              }

              ;(req as Request).user = user
            } catch {
              throw new Error(AUTHENTICATE_MESSAGE.REFRESH_TOKEN_INVALID)
            }

            return true
          }
        }
      }
    },
    ['body']
  )
    .run(req)
    .then(() => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        removeUploadedFiles(req)
        res.status(HTTPSTATUS.UNAUTHORIZED).json({
          code: RESPONSE_CODE.AUTHENTICATION_FAILED,
          message: AUTHENTICATE_MESSAGE.AUTHENTICATION_FAILED,
          errors: errors.mapped()
        })
        return
      }
      next()
      return
    })
    .catch((err) => {
      removeUploadedFiles(req)
      res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
        code: RESPONSE_CODE.FATAL_AUTHENTICATION_FAILURE,
        message: err
      })
      return
    })
}

export const securityAuthenticationTokenValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      'x-admin-token': {
        notEmpty: {
          errorMessage: AUTHENTICATE_MESSAGE.SECURITY_AUTHENTICATION_TOKEN_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: AUTHENTICATE_MESSAGE.SECURITY_AUTHENTICATION_TOKEN_MUST_BE_A_STRING
        },
        custom: {
          options: async (value, { req }) => {
            try {
              const decoded_security_authentication_token = (await verifyToken({
                token: value,
                secret: process.env.SECURITY_JWT_SECRET_SECURITY_AUTHENTICATION_TOKEN as string
              })) as TokenPayload

              if (
                !decoded_security_authentication_token ||
                decoded_security_authentication_token.token_type !== TokenType.SecurityAuthenticationToken ||
                decoded_security_authentication_token.development_team !== process.env.DEVELOPMENT_TEAM ||
                decoded_security_authentication_token.company_domain !== process.env.COMPANY_DOMAIN
              ) {
                throw new Error(AUTHENTICATE_MESSAGE.SECURITY_AUTHENTICATION_TOKEN_INVALID)
              }

              const user = await databaseService.users.findOne({
                _id: new ObjectId(decoded_security_authentication_token.user_id)
              })

              if (!user) {
                throw new Error(AUTHENTICATE_MESSAGE.USER_DOES_NOT_EXIST)
              }

              ;(req as Request).user = user
            } catch {
              throw new Error(AUTHENTICATE_MESSAGE.SECURITY_AUTHENTICATION_TOKEN_INVALID)
            }

            return true
          }
        }
      }
    },
    ['headers']
  )
    .run(req)
    .then(() => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        removeUploadedFiles(req)
        res.status(HTTPSTATUS.UNAUTHORIZED).json({
          code: RESPONSE_CODE.AUTHENTICATION_FAILED,
          message: AUTHENTICATE_MESSAGE.AUTHENTICATION_FAILED,
          errors: errors.mapped()
        })
        return
      }
      next()
      return
    })
    .catch((err) => {
      removeUploadedFiles(req)
      res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
        code: RESPONSE_CODE.FATAL_AUTHENTICATION_FAILURE,
        message: err
      })
      return
    })
}

export const temporary2faTokenValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      'x-security-challenge': {
        notEmpty: {
          errorMessage: AUTHENTICATE_MESSAGE.TEMPORARY_2FA_TOKEN_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: AUTHENTICATE_MESSAGE.TEMPORARY_2FA_TOKEN_MUST_BE_A_STRING
        },
        custom: {
          options: async (value, { req }) => {
            try {
              const decoded_temporary_2fa_token = (await verifyToken({
                token: value,
                secret: process.env.SECURITY_JWT_SECRET_TEMPORARY_2FA_TOKEN as string
              })) as TokenPayload

              if (
                !decoded_temporary_2fa_token ||
                decoded_temporary_2fa_token.token_type !== TokenType.Temporary2faToken ||
                decoded_temporary_2fa_token.development_team !== process.env.DEVELOPMENT_TEAM ||
                decoded_temporary_2fa_token.company_domain !== process.env.COMPANY_DOMAIN
              ) {
                throw new Error(AUTHENTICATE_MESSAGE.TEMPORARY_2FA_TOKEN_INVALID)
              }

              const user = await databaseService.users.findOne({
                _id: new ObjectId(decoded_temporary_2fa_token.user_id)
              })

              if (!user) {
                throw new Error(AUTHENTICATE_MESSAGE.USER_DOES_NOT_EXIST)
              }

              ;(req as Request).user = user
            } catch {
              throw new Error(AUTHENTICATE_MESSAGE.TEMPORARY_2FA_TOKEN_INVALID)
            }

            return true
          }
        }
      }
    },
    ['headers']
  )
    .run(req)
    .then(() => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        removeUploadedFiles(req)
        res.status(HTTPSTATUS.UNAUTHORIZED).json({
          code: RESPONSE_CODE.AUTHENTICATION_FAILED,
          message: AUTHENTICATE_MESSAGE.AUTHENTICATION_FAILED,
          errors: errors.mapped()
        })
        return
      }
      next()
      return
    })
    .catch((err) => {
      removeUploadedFiles(req)
      res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
        code: RESPONSE_CODE.FATAL_AUTHENTICATION_FAILURE,
        message: err
      })
      return
    })
}
