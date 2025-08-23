import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { REQUESTQUOTE_MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import { RequestQuoteRequestBody } from '~/models/requests/requestQuote.requests'
import RequestQuote from '~/models/schemas/requestQuote.schemas'
import requestQuoteService from '~/services/requestQuote.services'

export const getRequestQuoteController = async (req: Request, res: Response) => {
  try {
    res.json({
      code: RESPONSE_CODE.GET_REQUESTQUOTE_SUCCESSFUL,
      message: REQUESTQUOTE_MESSAGE.GET_REQUESTQUOTE_SUCCESS,
      data: await requestQuoteService.get()
    })
  } catch {
    res.json({
      code: RESPONSE_CODE.GET_REQUESTQUOTE_FAILED,
      message: REQUESTQUOTE_MESSAGE.GET_REQUESTQUOTE_FAILURE
    })
  }
}

export const requestQuoteController = async (
  req: Request<ParamsDictionary, any, RequestQuoteRequestBody>,
  res: Response
) => {
  try {
    const productList = req.productList as ObjectId[]

    requestQuoteService.request(req.body, productList)

    res.json({
      code: RESPONSE_CODE.REQUESTQUOTE_SUCCESSFUL,
      message: REQUESTQUOTE_MESSAGE.REQUESTQUOTE_SUCCESS
    })
  } catch {
    res.json({
      code: RESPONSE_CODE.REQUESTQUOTE_FAILED,
      message: REQUESTQUOTE_MESSAGE.REQUESTQUOTE_FAILURE
    })
  }
}

export const completeRequestQuoteController = async (req: Request, res: Response) => {
  try {
    const requestQuote = req.requestQuote as RequestQuote

    requestQuoteService.complete(requestQuote)

    res.json({
      code: RESPONSE_CODE.COMPLETE_REQUESTQUOTE_SUCCESSFUL,
      message: REQUESTQUOTE_MESSAGE.COMPLETE_REQUESTQUOTE_SUCCESS
    })
  } catch {
    res.json({
      code: RESPONSE_CODE.COMPLETE_REQUESTQUOTE_FAILED,
      message: REQUESTQUOTE_MESSAGE.COMPLETE_REQUESTQUOTE_FAILURE
    })
  }
}
