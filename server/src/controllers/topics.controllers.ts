import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TOPIC_MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import { TopicRequestBody } from '~/models/requests/topics.requests'
import Topic from '~/models/schemas/topics.schemas'
import topicService from '~/services/topics.services'

export const getTopicController = async (req: Request, res: Response) => {
  try {
    res.json({
      code: RESPONSE_CODE.GET_TOPIC_SUCCESSFUL,
      message: TOPIC_MESSAGE.GET_TOPIC_SUCCESS,
      data: await topicService.get()
    })
  } catch (err: unknown) {
    res.json({
      code: RESPONSE_CODE.GET_TOPIC_FAILED,
      message: TOPIC_MESSAGE.GET_TOPIC_FAILURE
    })
  }
}

export const createTopicController = async (req: Request<ParamsDictionary, any, TopicRequestBody>, res: Response) => {
  try {
    topicService.create(req.body)

    res.json({
      code: RESPONSE_CODE.CREATE_TOPIC_SUCCESSFUL,
      message: TOPIC_MESSAGE.CREATE_TOPIC_SUCCESS
    })
  } catch (err: unknown) {
    res.json({
      code: RESPONSE_CODE.CREATE_TOPIC_FAILED,
      message: TOPIC_MESSAGE.CREATE_TOPIC_FAILURE
    })
  }
}

export const updateTopicController = async (req: Request<ParamsDictionary, any, TopicRequestBody>, res: Response) => {
  try {
    const TOPIC = req.topic as Topic

    topicService.update(req.body, TOPIC)

    res.json({
      code: RESPONSE_CODE.UPDATE_TOPIC_SUCCESSFUL,
      message: TOPIC_MESSAGE.UPDATE_TOPIC_SUCCESS
    })
  } catch (err: unknown) {
    res.json({
      code: RESPONSE_CODE.UPDATE_TOPIC_FAILED,
      message: TOPIC_MESSAGE.UPDATE_TOPIC_FAILURE
    })
  }
}

export const deleteTopicController = async (req: Request, res: Response) => {
  try {
    const TOPIC = req.topic as Topic

    topicService.delete(TOPIC)

    res.json({
      code: RESPONSE_CODE.DELETE_TOPIC_SUCCESSFUL,
      message: TOPIC_MESSAGE.DELETE_TOPIC_SUCCESS
    })
  } catch (err: unknown) {
    res.json({
      code: RESPONSE_CODE.DELETE_TOPIC_FAILED,
      message: TOPIC_MESSAGE.DELETE_TOPIC_FAILURE
    })
  }
}
