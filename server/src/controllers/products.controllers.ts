import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { PRODUCT_MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import { ImageType } from '~/interfaces/image.interfaces'
import { ProductRequestBody } from '~/models/requests/products.request'
import Brand from '~/models/schemas/brands.schemas'
import Category from '~/models/schemas/categories.schemas'
import Product from '~/models/schemas/products.shemas'
import productService from '~/services/products.services'

export const getProductController = async (req: Request, res: Response) => {
  try {
    res.json({
      code: RESPONSE_CODE.GET_PRODUCT_SUCCESSFUL,
      message: PRODUCT_MESSAGE.GET_PRODUCT_SUCCESS,
      data: await productService.get()
    })
  } catch (err: unknown) {
    res.json({
      code: RESPONSE_CODE.GET_PRODUCT_FAILED,
      message: PRODUCT_MESSAGE.GET_PRODUCT_FAILURE
    })
  }
}

export const createProductController = async (
  req: Request<ParamsDictionary, any, ProductRequestBody>,
  res: Response
) => {
  try {
    const category = req.category as Category
    const brand = req.brand as Brand
    const image = req.image as ImageType[]

    productService.create(req.body, category, brand, image)

    res.json({
      code: RESPONSE_CODE.CREATE_PRODUCT_SUCCESSFUL,
      message: PRODUCT_MESSAGE.CREATE_PRODUCT_SUCCESS
    })
  } catch (err: unknown) {
    res.json({
      code: RESPONSE_CODE.CREATE_PRODUCT_FAILED,
      message: PRODUCT_MESSAGE.CREATE_PRODUCT_FAILURE
    })
  }
}

export const updateProductController = async (
  req: Request<ParamsDictionary, any, ProductRequestBody>,
  res: Response
) => {
  try {
    const category = req.category as Category
    const brand = req.brand as Brand
    const image = req.image
    const product = req.product as Product

    if (image) {
      productService.update(req.body, category, brand, product, image as ImageType[])
    } else {
      productService.update(req.body, category, brand, product)
    }

    res.json({
      code: RESPONSE_CODE.UPDATE_PRODUCT_SUCCESSFUL,
      message: PRODUCT_MESSAGE.UPDATE_PRODUCT_SUCCESS
    })
  } catch (err: unknown) {
    res.json({
      code: RESPONSE_CODE.UPDATE_PRODUCT_FAILED,
      message: PRODUCT_MESSAGE.UPDATE_PRODUCT_FAILURE
    })
  }
}

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const product = req.product as Product

    productService.delete(product)

    res.json({
      code: RESPONSE_CODE.DELETE_PRODUCT_SUCCESSFUL,
      message: PRODUCT_MESSAGE.DELETE_PRODUCT_SUCCESS
    })
  } catch (err: unknown) {
    res.json({
      code: RESPONSE_CODE.DELETE_PRODUCT_FAILED,
      message: PRODUCT_MESSAGE.DELETE_PRODUCT_FAILURE
    })
  }
}
