import { Request, Response, NextFunction } from 'express'
import { checkSchema, validationResult } from 'express-validator'
import { ObjectId } from 'mongodb'
import path from 'path'
import HTTPSTATUS from '~/constants/httpStatus.constants'
import { FILE_MANAGEMENT_MESSAGE, POST_MESSAGE, SYSTEM_MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import User from '~/models/schemas/users.schemas'
import databaseService from '~/services/database.services'
import fs from 'fs'
import { ImageType } from '~/interfaces/image.interfaces'
import { removeUploadedFiles } from '~/utils/image.utils'

export const setupUploadPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User
    const image = req.file as Express.Multer.File

    if (!image) {
      res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
        code: RESPONSE_CODE.INPUT_DATA_ERROR,
        message: FILE_MANAGEMENT_MESSAGE.IMAGE_IS_REQUIRED
      })
      return
    }

    const directoryPath = path.join(__dirname, `../../public/images/uploads/posts/${user._id}`)

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true })
    }

    try {
      fs.renameSync(image.path, path.join(directoryPath, image.filename))
    } catch (err) {
      return next(err)
    }

    const img: ImageType = {
      name: image.filename,
      path: `../../public/images/uploads/posts/${user._id}/${image.filename}`,
      url: `${process.env.IMAGE_URL}/images/uploads/posts/${user._id}/${image.filename}`
    }

    req.image = img
    next()
  } catch (error) {
    await removeUploadedFiles(req)
    next(error)
  }
}

export const postValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      title: {
        notEmpty: {
          errorMessage: POST_MESSAGE.TITLE_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: POST_MESSAGE.TITLE_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 1,
            max: 150
          },
          errorMessage: POST_MESSAGE.TITLE_LENGTH_MUST_BE_FROM_1_TO_150
        }
      },
      subtitle: {
        notEmpty: {
          errorMessage: POST_MESSAGE.SUBTITLE_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: POST_MESSAGE.SUBTITLE_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 1,
            max: 300
          },
          errorMessage: POST_MESSAGE.SUBTITLE_LENGTH_MUST_BE_FROM_1_TO_300
        }
      },
      content: {
        notEmpty: {
          errorMessage: POST_MESSAGE.CONTENT_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: POST_MESSAGE.CONTENT_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 1,
            max: 1000000
          },
          errorMessage: POST_MESSAGE.CONTENT_LENGTH_MUST_BE_FROM_1_TO_1000000
        }
      },
      topic_id: {
        notEmpty: {
          errorMessage: POST_MESSAGE.TOPIC_ID_IS_REQUIRED
        },
        isString: {
          errorMessage: POST_MESSAGE.TOPIC_ID_MUST_BE_A_STRING
        },
        isMongoId: {
          errorMessage: POST_MESSAGE.TOPIC_ID_IS_MUST_BE_A_ID
        },
        custom: {
          options: async (value, { req }) => {
            const topic = await databaseService.topics.findOne({ _id: new ObjectId(value) })

            if (!topic) {
              throw new Error(POST_MESSAGE.TOPIC_ID_DOES_NOT_EXIST)
            }

            ;(req as Request).topic = topic

            return true
          }
        }
      },
      is_featured: {
        notEmpty: { errorMessage: POST_MESSAGE.IS_FEATURED_IS_REQUIRED },
        isBoolean: { errorMessage: POST_MESSAGE.IS_FEATURED_MUST_BE_BOOLEAN },
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

export const postIdValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema({
    id: {
      in: ['params'],
      notEmpty: {
        errorMessage: POST_MESSAGE.POST_ID_IS_REQUIRED
      },
      isString: {
        errorMessage: POST_MESSAGE.POST_ID_MUST_BE_A_STRING
      },
      isMongoId: {
        errorMessage: POST_MESSAGE.POST_ID_IS_MUST_BE_A_ID
      },
      custom: {
        options: async (value, { req }) => {
          const post = await databaseService.posts.findOne({
            _id: new ObjectId(value),
            is_deleted: false
          })

          if (!post) {
            throw new Error(POST_MESSAGE.POST_ID_DOES_NOT_EXIST)
          }

          ;(req as Request).post = post

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
