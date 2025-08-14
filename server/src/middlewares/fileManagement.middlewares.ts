import { Request, Response, NextFunction } from 'express'
import path from 'path'
import HTTPSTATUS from '~/constants/httpStatus.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import fs from 'fs'
import { FILE_MANAGEMENT_MESSAGE } from '~/constants/message.constants'
import User from '~/models/schemas/users.schemas'
import { ImageType } from '~/interfaces/image.interfaces'
import { compressImage, removeUploadedFiles } from '~/utils/image.utils'

export const setupUploadImage = async (req: Request, res: Response, next: NextFunction) => {
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

    const directoryPath = path.join(__dirname, `../../public/images/uploads/posts/posts/${user._id}`)

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true })
    }

    try {
      const compressed = await compressImage(image.path, image.filename)

      const finalPath = path.join(directoryPath, compressed.filename)
      fs.renameSync(compressed.path, finalPath)

      if (fs.existsSync(image.path)) {
        fs.unlinkSync(image.path)
      }

      const img: ImageType = {
        name: compressed.filename,
        path: `../../public/images/uploads/posts/posts/${user._id}/${compressed.filename}`,
        url: `${process.env.IMAGE_URL}/images/uploads/posts/posts/${user._id}/${compressed.filename}`
      }

      req.image = img
    } catch (err) {
      return next(err)
    }

    next()
  } catch (error) {
    await removeUploadedFiles(req)
    next(error)
  }
}
