import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { BRAND_MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import { BrandRequestBody } from '~/models/requests/brands.requests'
import Brand from '~/models/schemas/brands.schemas'
import brandService from '~/services/brands.services'

export const getBrandController = async (req: Request, res: Response) => {
  try {
    res.json({
      code: RESPONSE_CODE.GET_BRAND_SUCCESSFUL,
      message: BRAND_MESSAGE.GET_BRAND_SUCCESS,
      data: await brandService.get()
    })
  } catch (err: unknown) {
    res.json({
      code: RESPONSE_CODE.GET_BRAND_FAILED,
      message: BRAND_MESSAGE.GET_BRAND_FAILURE
    })
  }
}

export const createBrandController = async (req: Request<ParamsDictionary, any, BrandRequestBody>, res: Response) => {
  try {
    brandService.create(req.body)

    res.json({
      code: RESPONSE_CODE.CREATE_BRAND_SUCCESSFUL,
      message: BRAND_MESSAGE.CREATE_BRAND_SUCCESS
    })
  } catch (err: unknown) {
    res.json({
      code: RESPONSE_CODE.CREATE_BRAND_FAILED,
      message: BRAND_MESSAGE.CREATE_BRAND_FAILURE
    })
  }
}

export const updateBrandController = async (req: Request<ParamsDictionary, any, BrandRequestBody>, res: Response) => {
  try {
    const BRAND = req.brand as Brand

    brandService.update(req.body, BRAND)

    res.json({
      code: RESPONSE_CODE.UPDATE_BRAND_SUCCESSFUL,
      message: BRAND_MESSAGE.UPDATE_BRAND_SUCCESS
    })
  } catch (err: unknown) {
    res.json({
      code: RESPONSE_CODE.UPDATE_BRAND_FAILED,
      message: BRAND_MESSAGE.UPDATE_BRAND_FAILURE
    })
  }
}

export const deleteBrandController = async (req: Request, res: Response) => {
  try {
    const BRAND = req.brand as Brand

    brandService.delete(BRAND)

    res.json({
      code: RESPONSE_CODE.DELETE_BRAND_SUCCESSFUL,
      message: BRAND_MESSAGE.DELETE_BRAND_SUCCESS
    })
  } catch (err: unknown) {
    res.json({
      code: RESPONSE_CODE.DELETE_BRAND_FAILED,
      message: BRAND_MESSAGE.DELETE_BRAND_FAILURE
    })
  }
}
