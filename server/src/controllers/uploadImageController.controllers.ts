import { Request, Response } from 'express'
import { FILE_MANAGEMENT_MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import { ImageType } from '~/interfaces/image.interfaces'

export const uploadImageController = async (req: Request, res: Response) => {
  try {
    const image = req.image as ImageType

    res.json({
      code: RESPONSE_CODE.UPLOAD_IMAGE_SUCCESSFUL,
      message: FILE_MANAGEMENT_MESSAGE.UPLOAD_IMAGE_SUCCESS,
      url: image.url
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.UPLOAD_IMAGE_FAILED,
      message: FILE_MANAGEMENT_MESSAGE.UPLOAD_IMAGE_FAILURE
    })
  }
}
