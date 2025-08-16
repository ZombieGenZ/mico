import { Request, Response, NextFunction } from 'express'
import { checkSchema, validationResult } from 'express-validator'
import { ObjectId } from 'mongodb'
import path from 'path'
import HTTPSTATUS from '~/constants/httpStatus.constants'
import { FILE_MANAGEMENT_MESSAGE, PRODUCT_MESSAGE, SYSTEM_MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import User from '~/models/schemas/users.schemas'
import databaseService from '~/services/database.services'
import fs from 'fs'
import { ImageType } from '~/interfaces/image.interfaces'
import { compressImage, removeUploadedFiles } from '~/utils/image.utils'

export const setupUploadProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User
    const images = req.files as Express.Multer.File[]

    if (!images || images.length === 0) {
      return res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
        code: RESPONSE_CODE.INPUT_DATA_ERROR,
        message: FILE_MANAGEMENT_MESSAGE.IMAGE_IS_REQUIRED
      })
    }

    const directoryPath = path.join(__dirname, `../../public/images/uploads/products/${user._id}`)

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true })
    }

    const imgList: ImageType[] = []

    for (const image of images) {
      try {
        const compressed = await compressImage(image.path, image.filename)

        const finalPath = path.join(directoryPath, compressed.filename)
        fs.renameSync(compressed.path, finalPath)

        if (fs.existsSync(image.path)) {
          fs.unlinkSync(image.path)
        }

        imgList.push({
          name: compressed.filename,
          path: `../../public/images/uploads/products/${user._id}/${compressed.filename}`,
          url: `${process.env.IMAGE_URL}/images/uploads/products/${user._id}/${compressed.filename}`
        })
      } catch (err) {
        return next(err)
      }
    }

    req.image = imgList
    next()
  } catch (error) {
    removeUploadedFiles(req)
    next(error)
  }
}

export const setupUploadProductOptional = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User
    const images = req.files as Express.Multer.File[]

    if (!images || images.length === 0) {
      next()
      return
    }

    const directoryPath = path.join(__dirname, `../../public/images/uploads/products/${user._id}`)

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true })
    }

    const imgList: ImageType[] = []

    for (const image of images) {
      try {
        const compressed = await compressImage(image.path, image.filename)

        const finalPath = path.join(directoryPath, compressed.filename)
        fs.renameSync(compressed.path, finalPath)

        if (fs.existsSync(image.path)) {
          fs.unlinkSync(image.path)
        }

        imgList.push({
          name: compressed.filename,
          path: `../../public/images/uploads/products/${user._id}/${compressed.filename}`,
          url: `${process.env.IMAGE_URL}/images/uploads/products/${user._id}/${compressed.filename}`
        })
      } catch (err) {
        return next(err)
      }
    }

    req.image = imgList
    next()
  } catch (error) {
    removeUploadedFiles(req)
    next(error)
  }
}

export const productValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      title: {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGE.TITLE_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: PRODUCT_MESSAGE.TITLE_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 1,
            max: 150
          },
          errorMessage: PRODUCT_MESSAGE.TITLE_LENGTH_MUST_BE_FROM_1_TO_150
        }
      },
      subtitle: {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGE.SUBTITLE_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: PRODUCT_MESSAGE.SUBTITLE_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 1,
            max: 300
          },
          errorMessage: PRODUCT_MESSAGE.SUBTITLE_LENGTH_MUST_BE_FROM_1_TO_300
        }
      },
      technical_informations: {
        isArray: {
          options: { min: 1 },
          errorMessage: PRODUCT_MESSAGE.TECHNICAL_INFORMATIONS_MUST_BE_AN_ARRAY_AND_HAVE_AT_LEAST_1_PARAMETERS
        },
        custom: {
          options: (arr) => {
            if (!Array.isArray(arr)) throw new Error(PRODUCT_MESSAGE.TECHNICAL_INFORMATIONS_MUST_BE_ARRAY)

            const codes = new Set<string>()
            for (const item of arr) {
              if (!item.code) throw new Error(PRODUCT_MESSAGE.TECHNICAL_INFORMATIONS_MUST_HAVE_IDENTIFICATION_CODE)
              const codeLower = String(item.code).trim().toLowerCase()
              if (codes.has(codeLower)) {
                throw new Error(`Mã định danh "${item.code}" chỉ có thể sử dụng được trên một thông số duy nhất`)
              }
              codes.add(codeLower)
            }
            return true
          }
        }
      },
      'technical_informations.*.code': {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGE.TECHNICAL_INFORMATIONS_CODE_IS_REQUIRED
        },
        isString: {
          errorMessage: PRODUCT_MESSAGE.TECHNICAL_INFORMATIONS_CODE_MUST_BE_A_STRING
        }
      },
      'technical_informations.*.name': {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGE.TECHNICAL_INFORMATIONS_NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: PRODUCT_MESSAGE.TECHNICAL_INFORMATIONS_NAME_MUST_BE_A_STRING
        }
      },
      'technical_informations.*.value': {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGE.TECHNICAL_INFORMATIONS_VALUE_IS_REQUIRED
        },
        isString: {
          errorMessage: PRODUCT_MESSAGE.TECHNICAL_INFORMATIONS_VALUE_MUST_BE_A_STRING
        }
      },
      'technical_informations.*.index': {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGE.TECHNICAL_INFORMATIONS_INDEX_IS_REQUIRED
        },
        isNumeric: {
          errorMessage: PRODUCT_MESSAGE.TECHNICAL_INFORMATIONS_INDEX_MUST_BE_A_NUMBER
        }
      },
      features: {
        isArray: {
          options: { min: 1 },
          errorMessage: PRODUCT_MESSAGE.FEATURES_MUST_BE_AN_ARRAY_AND_HAVE_AT_LEAST_1_PARAMETERS
        }
      },
      'features.*.value': {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGE.FEATURES_VALUE_IS_REQUIRED
        },
        isString: {
          errorMessage: PRODUCT_MESSAGE.FEATURES_VALUE_MUST_BE_A_STRING
        }
      },
      'features.*.index': {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGE.FEATURES_INDEX_IS_REQUIRED
        },
        isNumeric: {
          errorMessage: PRODUCT_MESSAGE.FEATURES_INDEX_MUST_BE_A_NUMBER
        }
      },
      category_id: {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGE.CATEGORY_ID_IS_REQUIRED
        },
        isString: {
          errorMessage: PRODUCT_MESSAGE.CATEGORY_ID_MUST_BE_A_STRING
        },
        isMongoId: {
          errorMessage: PRODUCT_MESSAGE.CATEGORY_ID_IS_MUST_BE_A_ID
        },
        custom: {
          options: async (value, { req }) => {
            const category = await databaseService.categories.findOne({ _id: new ObjectId(value) })

            if (!category) {
              throw new Error(PRODUCT_MESSAGE.CATEGORY_ID_DOES_NOT_EXIST)
            }

            ;(req as Request).category = category

            return true
          }
        }
      },
      brand_id: {
        notEmpty: {
          errorMessage: PRODUCT_MESSAGE.BRAND_ID_IS_REQUIRED
        },
        isString: {
          errorMessage: PRODUCT_MESSAGE.BRAND_ID_MUST_BE_A_STRING
        },
        isMongoId: {
          errorMessage: PRODUCT_MESSAGE.BRAND_ID_IS_MUST_BE_A_ID
        },
        custom: {
          options: async (value, { req }) => {
            const brand = await databaseService.brands.findOne({ _id: new ObjectId(value) })

            if (!brand) {
              throw new Error(PRODUCT_MESSAGE.BRAND_ID_DOES_NOT_EXIST)
            }

            ;(req as Request).brand = brand

            return true
          }
        }
      },
      in_stock: {
        notEmpty: { errorMessage: PRODUCT_MESSAGE.IN_STOCK_IS_REQUIRED },
        isBoolean: { errorMessage: PRODUCT_MESSAGE.IN_STOCK_MUST_BE_BOOLEAN },
        toBoolean: true
      },
      is_new: {
        notEmpty: { errorMessage: PRODUCT_MESSAGE.IS_NEW_IS_REQUIRED },
        isBoolean: { errorMessage: PRODUCT_MESSAGE.IS_NEW_MUST_BE_BOOLEAN },
        toBoolean: true
      },
      is_used: {
        notEmpty: { errorMessage: PRODUCT_MESSAGE.IS_USED_IS_REQUIRED },
        isBoolean: { errorMessage: PRODUCT_MESSAGE.IS_USED_MUST_BE_BOOLEAN },
        toBoolean: true
      }
    },
    ['body']
  )
    .run(req)
    .then(() => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        removeUploadedFiles(req)
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
      removeUploadedFiles(req)
      res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
        code: RESPONSE_CODE.FATAL_INPUT_ERROR,
        message: err
      })
      return
    })
}

export const productIdValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema({
    id: {
      in: ['params'],
      notEmpty: {
        errorMessage: PRODUCT_MESSAGE.PRODUCT_ID_IS_REQUIRED
      },
      isString: {
        errorMessage: PRODUCT_MESSAGE.PRODUCT_ID_MUST_BE_A_STRING
      },
      isMongoId: {
        errorMessage: PRODUCT_MESSAGE.PRODUCT_ID_IS_MUST_BE_A_ID
      },
      custom: {
        options: async (value, { req }) => {
          const product = await databaseService.products.findOne({
            _id: new ObjectId(value),
            is_deleted: false
          })

          if (!product) {
            throw new Error(PRODUCT_MESSAGE.PRODUCT_ID_DOES_NOT_EXIST)
          }

          ;(req as Request).product = product

          return true
        }
      }
    }
  })
    .run(req)
    .then(() => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        removeUploadedFiles(req)
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
      removeUploadedFiles(req)
      res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
        code: RESPONSE_CODE.FATAL_INPUT_ERROR,
        message: err
      })
      return
    })
}
