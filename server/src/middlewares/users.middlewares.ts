import { Request, Response, NextFunction } from 'express'
import { checkSchema, validationResult } from 'express-validator'
import { SYSTEM_MESSAGE, USER_MESSAGE } from '~/constants/message.constants'
import userService from '~/services/users.services'
import HTTPSTATUS from '~/constants/httpStatus.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import databaseService from '~/services/database.services'
import { HashPassword } from '~/utils/encryption.utils'

export const registerValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      token: {
        notEmpty: {
          errorMessage: USER_MESSAGE.TOKEN_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: USER_MESSAGE.TOKEN_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 1,
            max: 1000
          },
          errorMessage: USER_MESSAGE.TOKEN_LENGTH_MUST_BE_FROM_1_TO_50
        },
        custom: {
          options: async (value) => {
            if (value != process.env.REGISTER_TOKEN) {
              throw new Error(USER_MESSAGE.INVALID_TOKEN)
            }

            return true
          }
        }
      },
      name: {
        notEmpty: {
          errorMessage: USER_MESSAGE.NAME_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: USER_MESSAGE.NAME_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 5,
            max: 100
          },
          errorMessage: USER_MESSAGE.NAME_LENGTH_MUST_BE_FROM_1_TO_50
        }
      },
      email: {
        notEmpty: {
          errorMessage: USER_MESSAGE.EMAIL_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: USER_MESSAGE.EMAIL_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 5,
            max: 100
          },
          errorMessage: USER_MESSAGE.EMAIL_LENGTH_MUST_BE_FROM_5_TO_100
        },
        isEmail: {
          errorMessage: USER_MESSAGE.EMAIL_IS_NOT_VALID
        },
        custom: {
          options: async (value) => {
            const result = await userService.checkEmailExits(value)

            if (result) {
              throw new Error(USER_MESSAGE.EMAIL_ALREADY_EXISTS)
            }

            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: USER_MESSAGE.PASSWORD_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 100
          },
          errorMessage: USER_MESSAGE.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_100
        },
        isStrongPassword: {
          errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_STRONG
        }
      },
      confirm_password: {
        notEmpty: {
          errorMessage: USER_MESSAGE.CONFIRM_PASSWORD_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: USER_MESSAGE.CONFIRM_PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 100
          },
          errorMessage: USER_MESSAGE.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_100
        },
        isStrongPassword: {
          errorMessage: USER_MESSAGE.CONFIRM_PASSWORD_MUST_BE_STRONG
        },
        custom: {
          options: async (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error(USER_MESSAGE.CONFIRM_PASSWORD_DOES_NOT_MATCH_PASSWORD)
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
        res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
          code: RESPONSE_CODE.INPUT_DATA_ERROR,
          message: SYSTEM_MESSAGE.VALIDATION_ERROR,
          errors: errors.mapped()
        })
        return
      }
      next()
      return
    })
    .catch((err) => {
      res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
        code: RESPONSE_CODE.FATAL_INPUT_ERROR,
        message: err
      })
      return
    })
}

export const loginValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: USER_MESSAGE.EMAIL_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: USER_MESSAGE.EMAIL_MUST_BE_A_STRING
        },
        isEmail: {
          errorMessage: USER_MESSAGE.EMAIL_IS_NOT_VALID
        },
        custom: {
          options: async (value) => {
            const result = await databaseService.users.findOne({
              email: value,
              password: HashPassword(req.body.password)
            })

            if (!result) {
              throw new Error(USER_MESSAGE.INCORRECT_EMAIL_OR_PASSWORD)
            }

            ;(req as Request).user = result

            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: USER_MESSAGE.PASSWORD_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_A_STRING
        }
      }
    },
    ['body']
  )
    .run(req)
    .then(() => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
          code: RESPONSE_CODE.INPUT_DATA_ERROR,
          message: SYSTEM_MESSAGE.VALIDATION_ERROR,
          errors: errors.mapped()
        })
        return
      }
      next()
      return
    })
    .catch((err) => {
      res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
        code: RESPONSE_CODE.FATAL_INPUT_ERROR,
        message: err
      })
      return
    })
}
