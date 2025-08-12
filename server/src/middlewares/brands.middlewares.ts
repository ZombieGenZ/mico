import { Request, Response, NextFunction } from 'express'
import { checkSchema, validationResult } from 'express-validator'
import { ObjectId } from 'mongodb'
import HTTPSTATUS from '~/constants/httpStatus.constants'
import { BRAND_MESSAGE, SYSTEM_MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import databaseService from '~/services/database.services'

export const brandValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: BRAND_MESSAGE.NAME_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: BRAND_MESSAGE.NAME_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 1,
            max: 100
          },
          errorMessage: BRAND_MESSAGE.NAME_LENGTH_MUST_BE_FROM_1_TO_100
        }
      },
      index: {
        notEmpty: {
          errorMessage: BRAND_MESSAGE.INDEX_IS_REQUIRED
        },
        isNumeric: {
          errorMessage: BRAND_MESSAGE.INDEX_MUST_BE_A_NUMBER
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

export const brandIdValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema({
    id: {
      in: ['params'],
      notEmpty: {
        errorMessage: BRAND_MESSAGE.BRAND_ID_IS_REQUIRED
      },
      isString: {
        errorMessage: BRAND_MESSAGE.BRAND_ID_MUST_BE_A_STRING
      },
      isMongoId: {
        errorMessage: BRAND_MESSAGE.BRAND_ID_IS_MUST_BE_A_ID
      },
      custom: {
        options: async (value, { req }) => {
          const brand = await databaseService.brands.findOne({
            _id: new ObjectId(value),
            is_deleted: false
          })

          if (!brand) {
            throw new Error(BRAND_MESSAGE.BRAND_ID_DOES_NOT_EXIST)
          }

          ;(req as Request).brand = brand

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
