import { Request, Response, NextFunction } from 'express'
import { checkSchema, validationResult } from 'express-validator'
import { ObjectId } from 'mongodb'
import HTTPSTATUS from '~/constants/httpStatus.constants'
import { CONTACT_MESSAGE, SYSTEM_MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import databaseService from '~/services/database.services'

export const contactValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: CONTACT_MESSAGE.NAME_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: CONTACT_MESSAGE.NAME_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 5,
            max: 100
          },
          errorMessage: CONTACT_MESSAGE.NAME_LENGTH_MUST_BE_FROM_1_TO_50
        }
      },
      email: {
        notEmpty: {
          errorMessage: CONTACT_MESSAGE.EMAIL_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: CONTACT_MESSAGE.EMAIL_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 5,
            max: 100
          },
          errorMessage: CONTACT_MESSAGE.EMAIL_LENGTH_MUST_BE_FROM_5_TO_100
        },
        isEmail: {
          errorMessage: CONTACT_MESSAGE.EMAIL_IS_NOT_VALID
        }
      },
      phone: {
        notEmpty: {
          errorMessage: CONTACT_MESSAGE.PHONE_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: CONTACT_MESSAGE.PHONE_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 10,
            max: 11
          },
          errorMessage: CONTACT_MESSAGE.PHONE_LENGTH_MUST_BE_FROM_10_TO_11
        },
        isMobilePhone: {
          errorMessage: CONTACT_MESSAGE.PHONE_IS_NOT_VALID
        }
      },
      company: {
        optional: { options: { nullable: true } },
        trim: true,
        isString: {
          errorMessage: CONTACT_MESSAGE.COMPANY_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 1,
            max: 150
          },
          errorMessage: CONTACT_MESSAGE.COMPANY_LENGTH_MUST_BE_FROM_1_TO_150
        }
      },
      title: {
        notEmpty: {
          errorMessage: CONTACT_MESSAGE.TITLE_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: CONTACT_MESSAGE.TITLE_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 1,
            max: 150
          },
          errorMessage: CONTACT_MESSAGE.TITLE_LENGTH_MUST_BE_FROM_1_TO_150
        }
      },
      content: {
        notEmpty: {
          errorMessage: CONTACT_MESSAGE.CONTENT_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: CONTACT_MESSAGE.CONTENT_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 1,
            max: 1000
          },
          errorMessage: CONTACT_MESSAGE.CONTENT_LENGTH_MUST_BE_FROM_1_TO_1000
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

export const contactIdValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema({
    id: {
      in: ['params'],
      notEmpty: {
        errorMessage: CONTACT_MESSAGE.CONTACT_ID_IS_REQUIRED
      },
      isString: {
        errorMessage: CONTACT_MESSAGE.CONTACT_ID_MUST_BE_A_STRING
      },
      isMongoId: {
        errorMessage: CONTACT_MESSAGE.CONTACT_ID_IS_MUST_BE_A_ID
      },
      custom: {
        options: async (value, { req }) => {
          const contact = await databaseService.contacts.findOne({
            _id: new ObjectId(value),
            is_deleted: false
          })

          if (!contact) {
            throw new Error(CONTACT_MESSAGE.CONTACT_ID_DOES_NOT_EXIST)
          }

          ;(req as Request).contact = contact

          return true
        }
      }
    }
  })
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
