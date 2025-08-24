import { Request, Response, NextFunction } from 'express'
import { checkSchema, validationResult } from 'express-validator'
import { ObjectId } from 'mongodb'
import HTTPSTATUS from '~/constants/httpStatus.constants'
import { REQUEST_QUOTE_MESSAGE, SYSTEM_MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import databaseService from '~/services/database.services'

export const requestQuoteValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: REQUEST_QUOTE_MESSAGE.NAME_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: REQUEST_QUOTE_MESSAGE.NAME_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 5,
            max: 100
          },
          errorMessage: REQUEST_QUOTE_MESSAGE.NAME_LENGTH_MUST_BE_FROM_1_TO_50
        }
      },
      email: {
        notEmpty: {
          errorMessage: REQUEST_QUOTE_MESSAGE.EMAIL_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: REQUEST_QUOTE_MESSAGE.EMAIL_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 5,
            max: 100
          },
          errorMessage: REQUEST_QUOTE_MESSAGE.EMAIL_LENGTH_MUST_BE_FROM_5_TO_100
        },
        isEmail: {
          errorMessage: REQUEST_QUOTE_MESSAGE.EMAIL_IS_NOT_VALID
        }
      },
      phone: {
        notEmpty: {
          errorMessage: REQUEST_QUOTE_MESSAGE.PHONE_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: REQUEST_QUOTE_MESSAGE.PHONE_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 10,
            max: 11
          },
          errorMessage: REQUEST_QUOTE_MESSAGE.PHONE_LENGTH_MUST_BE_FROM_10_TO_11
        },
        isMobilePhone: {
          errorMessage: REQUEST_QUOTE_MESSAGE.PHONE_IS_NOT_VALID
        }
      },
      company: {
        optional: { options: { nullable: true } },
        trim: true,
        isString: {
          errorMessage: REQUEST_QUOTE_MESSAGE.COMPANY_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 1,
            max: 150
          },
          errorMessage: REQUEST_QUOTE_MESSAGE.COMPANY_LENGTH_MUST_BE_FROM_1_TO_150
        }
      },
      message: {
        notEmpty: {
          errorMessage: REQUEST_QUOTE_MESSAGE.MESSAGE_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: REQUEST_QUOTE_MESSAGE.MESSAGE_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 1,
            max: 150
          },
          errorMessage: REQUEST_QUOTE_MESSAGE.MESSAGE_LENGTH_MUST_BE_FROM_1_TO_150
        }
      },
      product: {
        notEmpty: {
          errorMessage: REQUEST_QUOTE_MESSAGE.PRODUCT_LIST_IS_REQUIRED
        },
        isArray: {
          options: { min: 1, max: 50 },
          errorMessage: REQUEST_QUOTE_MESSAGE.PRODUCT_LIST_MUST_BE_AN_ARRAY
        },
        customSanitizer: {
          options: (value) => {
            if (!Array.isArray(value)) return value
            const normalized = value.map((v) => String(v).trim())
            return Array.from(new Set(normalized))
          }
        },
        custom: {
          options: async (value, { req }) => {
            if (!Array.isArray(value)) {
              throw new Error(REQUEST_QUOTE_MESSAGE.PRODUCT_LIST_MUST_BE_AN_ARRAY)
            }

            const invalidIds = value.filter((id) => !ObjectId.isValid(id))
            if (invalidIds.length > 0) {
              throw new Error(REQUEST_QUOTE_MESSAGE.PRODUCT_ID_MUST_BE_A_VALID_OBJECT_ID)
            }

            const objectIds = value.map((id) => new ObjectId(id))
            const count = await databaseService.products.countDocuments({
              _id: { $in: objectIds },
              is_deleted: false
            })

            if (count !== objectIds.length) {
              throw new Error(REQUEST_QUOTE_MESSAGE.PRODUCT_NOT_FOUND)
            }

            ;(req as Request).productList = objectIds

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

export const requestQuoteIdValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema({
    id: {
      in: ['params'],
      notEmpty: {
        errorMessage: REQUEST_QUOTE_MESSAGE.REQUESTQUOTE_ID_IS_REQUIRED
      },
      isString: {
        errorMessage: REQUEST_QUOTE_MESSAGE.REQUESTQUOTE_ID_MUST_BE_A_STRING
      },
      isMongoId: {
        errorMessage: REQUEST_QUOTE_MESSAGE.REQUESTQUOTE_ID_IS_MUST_BE_A_ID
      },
      custom: {
        options: async (value, { req }) => {
          const requestQuote = await databaseService.requestQuote.findOne({
            _id: new ObjectId(value),
            is_deleted: false
          })

          if (!requestQuote) {
            throw new Error(REQUEST_QUOTE_MESSAGE.REQUESTQUOTE_ID_DOES_NOT_EXIST)
          }

          ;(req as Request).requestQuote = requestQuote

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
