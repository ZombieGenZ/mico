import { Request, Response, NextFunction } from 'express'
import { checkSchema, validationResult } from 'express-validator'
import HTTPSTATUS from '~/constants/httpStatus.constants'
import { COMPANY_MESSAGE, SYSTEM_MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'

export const changeCompanyCoreValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      name: {
        notEmpty: { errorMessage: COMPANY_MESSAGE.NAME_IS_REQUIRED },
        trim: true,
        isString: { errorMessage: COMPANY_MESSAGE.NAME_MUST_BE_A_STRING },
        isLength: {
          options: { min: 1, max: 150 },
          errorMessage: COMPANY_MESSAGE.NAME_LENGTH_MUST_BE_FROM_1_TO_150
        }
      },
      slogan: {
        notEmpty: { errorMessage: COMPANY_MESSAGE.SLOGAN_IS_REQUIRED },
        trim: true,
        isString: { errorMessage: COMPANY_MESSAGE.SLOGAN_MUST_BE_A_STRING },
        isLength: {
          options: { min: 1, max: 200 },
          errorMessage: COMPANY_MESSAGE.SLOGAN_LENGTH_MUST_BE_FROM_1_TO_200
        }
      },
      description: {
        notEmpty: { errorMessage: COMPANY_MESSAGE.DESCRIPTION_IS_REQUIRED },
        trim: true,
        isString: { errorMessage: COMPANY_MESSAGE.DESCRIPTION_MUST_BE_A_STRING },
        isLength: {
          options: { min: 1, max: 2000 },
          errorMessage: COMPANY_MESSAGE.DESCRIPTION_LENGTH_MUST_BE_FROM_1_TO_2000
        }
      },
      logo_url: {
        notEmpty: { errorMessage: COMPANY_MESSAGE.LOGO_URL_IS_REQUIRED },
        trim: true,
        isString: { errorMessage: COMPANY_MESSAGE.LOGO_URL_MUST_BE_A_STRING },
        isLength: {
          options: { min: 5, max: 500 },
          errorMessage: COMPANY_MESSAGE.LOGO_URL_LENGTH_MUST_BE_FROM_5_TO_500
        },
        isURL: {
          options: { require_protocol: true, protocols: ['http', 'https'] },
          errorMessage: COMPANY_MESSAGE.LOGO_URL_MUST_BE_A_VALID_URL
        }
      },
      tax_code: {
        notEmpty: { errorMessage: COMPANY_MESSAGE.TAX_CODE_IS_REQUIRED },
        trim: true,
        isString: { errorMessage: COMPANY_MESSAGE.TAX_CODE_MUST_BE_A_STRING },
        isLength: {
          options: { min: 10, max: 14 },
          errorMessage: COMPANY_MESSAGE.TAX_CODE_INVALID_FORMAT
        },
        matches: {
          options: [/^\d{10,14}$/],
          errorMessage: COMPANY_MESSAGE.TAX_CODE_INVALID_FORMAT
        }
      },
      business_license: {
        notEmpty: { errorMessage: COMPANY_MESSAGE.BUSINESS_LICENSE_IS_REQUIRED },
        trim: true,
        isString: { errorMessage: COMPANY_MESSAGE.BUSINESS_LICENSE_MUST_BE_A_STRING },
        isLength: {
          options: { min: 5, max: 50 },
          errorMessage: COMPANY_MESSAGE.BUSINESS_LICENSE_LENGTH_MUST_BE_FROM_5_TO_50
        },
        matches: {
          options: [/^[A-Za-z0-9\-_]+$/],
          errorMessage: COMPANY_MESSAGE.BUSINESS_LICENSE_INVALID_FORMAT
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

export const changeCompanyContactValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      hotline: {
        notEmpty: { errorMessage: COMPANY_MESSAGE.HOTLINE_IS_REQUIRED },
        trim: true,
        isString: { errorMessage: COMPANY_MESSAGE.HOTLINE_MUST_BE_A_STRING },
        isLength: {
          options: { min: 8, max: 15 },
          errorMessage: COMPANY_MESSAGE.HOTLINE_LENGTH_MUST_BE_FROM_8_TO_15
        },
        isMobilePhone: { errorMessage: COMPANY_MESSAGE.HOTLINE_IS_NOT_VALID }
      },
      primary_email: {
        notEmpty: { errorMessage: COMPANY_MESSAGE.PRIMARY_EMAIL_IS_REQUIRED },
        trim: true,
        isString: { errorMessage: COMPANY_MESSAGE.PRIMARY_EMAIL_MUST_BE_A_STRING },
        isLength: {
          options: { min: 5, max: 100 },
          errorMessage: COMPANY_MESSAGE.PRIMARY_EMAIL_LENGTH_MUST_BE_FROM_5_TO_100
        },
        isEmail: { errorMessage: COMPANY_MESSAGE.PRIMARY_EMAIL_IS_NOT_VALID }
      },
      sales_email: {
        notEmpty: { errorMessage: COMPANY_MESSAGE.SALES_EMAIL_IS_REQUIRED },
        trim: true,
        isString: { errorMessage: COMPANY_MESSAGE.SALES_EMAIL_MUST_BE_A_STRING },
        isLength: {
          options: { min: 5, max: 100 },
          errorMessage: COMPANY_MESSAGE.SALES_EMAIL_LENGTH_MUST_BE_FROM_5_TO_100
        },
        isEmail: { errorMessage: COMPANY_MESSAGE.SALES_EMAIL_IS_NOT_VALID }
      },
      support_email: {
        notEmpty: { errorMessage: COMPANY_MESSAGE.SUPPORT_EMAIL_IS_REQUIRED },
        trim: true,
        isString: { errorMessage: COMPANY_MESSAGE.SUPPORT_EMAIL_MUST_BE_A_STRING },
        isLength: {
          options: { min: 5, max: 100 },
          errorMessage: COMPANY_MESSAGE.SUPPORT_EMAIL_LENGTH_MUST_BE_FROM_5_TO_100
        },
        isEmail: { errorMessage: COMPANY_MESSAGE.SUPPORT_EMAIL_IS_NOT_VALID }
      },
      head_office_address: {
        notEmpty: { errorMessage: COMPANY_MESSAGE.ADDRESS_IS_REQUIRED },
        trim: true,
        isString: { errorMessage: COMPANY_MESSAGE.ADDRESS_MUST_BE_A_STRING },
        isLength: {
          options: { min: 5, max: 300 },
          errorMessage: COMPANY_MESSAGE.ADDRESS_LENGTH_MUST_BE_FROM_5_TO_300
        }
      },
      working_hours_on_a_weekday: {
        notEmpty: { errorMessage: COMPANY_MESSAGE.WEEKDAY_HOURS_IS_REQUIRED },
        trim: true,
        isString: { errorMessage: COMPANY_MESSAGE.WEEKDAY_HOURS_MUST_BE_A_STRING },
        isLength: {
          options: { min: 1, max: 100 },
          errorMessage: COMPANY_MESSAGE.WEEKDAY_HOURS_LENGTH_MUST_BE_FROM_1_TO_100
        }
      },
      weekend_working_hours: {
        notEmpty: { errorMessage: COMPANY_MESSAGE.WEEKEND_HOURS_IS_REQUIRED },
        trim: true,
        isString: { errorMessage: COMPANY_MESSAGE.WEEKEND_HOURS_MUST_BE_A_STRING },
        isLength: {
          options: { min: 1, max: 100 },
          errorMessage: COMPANY_MESSAGE.WEEKEND_HOURS_LENGTH_MUST_BE_FROM_1_TO_100
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

export const changeCompanySocialValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      facebook: {
        notEmpty: { errorMessage: COMPANY_MESSAGE.FACEBOOK_IS_REQUIRED },
        trim: true,
        isString: { errorMessage: COMPANY_MESSAGE.FACEBOOK_MUST_BE_A_STRING },
        isLength: {
          options: { min: 5, max: 500 },
          errorMessage: COMPANY_MESSAGE.FACEBOOK_LENGTH_MUST_BE_FROM_5_TO_500
        },
        isURL: {
          options: { require_protocol: true, protocols: ['http', 'https'] },
          errorMessage: COMPANY_MESSAGE.FACEBOOK_MUST_BE_A_VALID_URL
        }
      },
      x: {
        notEmpty: { errorMessage: COMPANY_MESSAGE.X_IS_REQUIRED },
        trim: true,
        isString: { errorMessage: COMPANY_MESSAGE.X_MUST_BE_A_STRING },
        isLength: {
          options: { min: 5, max: 500 },
          errorMessage: COMPANY_MESSAGE.X_LENGTH_MUST_BE_FROM_5_TO_500
        },
        isURL: {
          options: { require_protocol: true, protocols: ['http', 'https'] },
          errorMessage: COMPANY_MESSAGE.X_MUST_BE_A_VALID_URL
        }
      },
      instagram: {
        notEmpty: { errorMessage: COMPANY_MESSAGE.INSTAGRAM_IS_REQUIRED },
        trim: true,
        isString: { errorMessage: COMPANY_MESSAGE.INSTAGRAM_MUST_BE_A_STRING },
        isLength: {
          options: { min: 5, max: 500 },
          errorMessage: COMPANY_MESSAGE.INSTAGRAM_LENGTH_MUST_BE_FROM_5_TO_500
        },
        isURL: {
          options: { require_protocol: true, protocols: ['http', 'https'] },
          errorMessage: COMPANY_MESSAGE.INSTAGRAM_MUST_BE_A_VALID_URL
        }
      },
      linkedin: {
        notEmpty: { errorMessage: COMPANY_MESSAGE.LINKEDIN_IS_REQUIRED },
        trim: true,
        isString: { errorMessage: COMPANY_MESSAGE.LINKEDIN_MUST_BE_A_STRING },
        isLength: {
          options: { min: 5, max: 500 },
          errorMessage: COMPANY_MESSAGE.LINKEDIN_LENGTH_MUST_BE_FROM_5_TO_500
        },
        isURL: {
          options: { require_protocol: true, protocols: ['http', 'https'] },
          errorMessage: COMPANY_MESSAGE.LINKEDIN_MUST_BE_A_VALID_URL
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
