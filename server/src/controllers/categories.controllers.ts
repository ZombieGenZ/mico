import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { CATEGORY_MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import { CategoryRequestBody } from '~/models/requests/categories.requests'
import Category from '~/models/schemas/categories.schemas'
import categoryService from '~/services/categories.services'

export const getCategoryController = async (req: Request, res: Response) => {
  try {
    res.json({
      code: RESPONSE_CODE.GET_CATEGORY_SUCCESSFUL,
      message: CATEGORY_MESSAGE.GET_CATEGORY_SUCCESS,
      data: await categoryService.get()
    })
  } catch {
    res.json({
      code: RESPONSE_CODE.GET_CATEGORY_FAILED,
      message: CATEGORY_MESSAGE.GET_CATEGORY_FAILURE
    })
  }
}

export const createCategoryController = async (
  req: Request<ParamsDictionary, any, CategoryRequestBody>,
  res: Response
) => {
  try {
    categoryService.create(req.body)

    res.json({
      code: RESPONSE_CODE.CREATE_CATEGORY_SUCCESSFUL,
      message: CATEGORY_MESSAGE.CREATE_CATEGORY_SUCCESS
    })
  } catch {
    res.json({
      code: RESPONSE_CODE.CREATE_CATEGORY_FAILED,
      message: CATEGORY_MESSAGE.CREATE_CATEGORY_FAILURE
    })
  }
}

export const updateCategoryController = async (
  req: Request<ParamsDictionary, any, CategoryRequestBody>,
  res: Response
) => {
  try {
    const category = req.category as Category

    categoryService.update(req.body, category)

    res.json({
      code: RESPONSE_CODE.UPDATE_CATEGORY_SUCCESSFUL,
      message: CATEGORY_MESSAGE.UPDATE_CATEGORY_SUCCESS
    })
  } catch {
    res.json({
      code: RESPONSE_CODE.UPDATE_CATEGORY_FAILED,
      message: CATEGORY_MESSAGE.UPDATE_CATEGORY_FAILURE
    })
  }
}

export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const category = req.category as Category

    categoryService.delete(category)

    res.json({
      code: RESPONSE_CODE.DELETE_CATEGORY_SUCCESSFUL,
      message: CATEGORY_MESSAGE.DELETE_CATEGORY_SUCCESS
    })
  } catch {
    res.json({
      code: RESPONSE_CODE.DELETE_CATEGORY_FAILED,
      message: CATEGORY_MESSAGE.DELETE_CATEGORY_FAILURE
    })
  }
}
