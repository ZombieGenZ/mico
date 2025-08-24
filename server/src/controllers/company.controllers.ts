import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { COMPANY_MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import {
  ChangeCompanyCoreRequestBody,
  ChangeContactRequestBody,
  ChangeSocialRequestBody
} from '~/models/requests/company.requests'
import companyService from '~/services/company.services'

export const getCompanyInfomationController = async (req: Request, res: Response) => {
  try {
    res.json({
      code: RESPONSE_CODE.GET_COMPANY_INFOMATION_SUCCESSFUL,
      message: COMPANY_MESSAGE.GET_COMPANY_INFOMATION_SUCCESS,
      data: companyService.get()
    })
  } catch {
    res.json({
      code: RESPONSE_CODE.GET_COMPANY_INFOMATION_FAILED,
      message: COMPANY_MESSAGE.GET_COMPANY_INFOMATION_FAILURE
    })
  }
}

export const changeCompanyCoreController = async (
  req: Request<ParamsDictionary, any, ChangeCompanyCoreRequestBody>,
  res: Response
) => {
  try {
    companyService.companyCore(req.body)

    res.json({
      code: RESPONSE_CODE.CHANGE_COMPANY_CORE_SUCCESSFUL,
      message: COMPANY_MESSAGE.CHANGE_COMPANY_CORE_SUCCESS
    })
  } catch {
    res.json({
      code: RESPONSE_CODE.CHANGE_COMPANY_CORE_FAILED,
      message: COMPANY_MESSAGE.CHANGE_COMPANY_CORE_FAILURE
    })
  }
}

export const changeContactController = async (
  req: Request<ParamsDictionary, any, ChangeContactRequestBody>,
  res: Response
) => {
  try {
    companyService.contact(req.body)

    res.json({
      code: RESPONSE_CODE.CHANGE_CONTACT_SUCCESSFUL,
      message: COMPANY_MESSAGE.CHANGE_CONTACT_SUCCESS
    })
  } catch {
    res.json({
      code: RESPONSE_CODE.CHANGE_CONTACT_FAILED,
      message: COMPANY_MESSAGE.CHANGE_CONTACT_FAILURE
    })
  }
}

export const changeSocialController = async (
  req: Request<ParamsDictionary, any, ChangeSocialRequestBody>,
  res: Response
) => {
  try {
    companyService.social(req.body)

    res.json({
      code: RESPONSE_CODE.CHANGE_SOCIAL_SUCCESSFUL,
      message: COMPANY_MESSAGE.CHANGE_SOCIAL_SUCCESS
    })
  } catch {
    res.json({
      code: RESPONSE_CODE.CHANGE_SOCIAL_FAILED,
      message: COMPANY_MESSAGE.CHANGE_SOCIAL_FAILURE
    })
  }
}
