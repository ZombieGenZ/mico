import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { POST_MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import { ImageType } from '~/interfaces/image.interfaces'
import { PostRequestBody } from '~/models/requests/posts.request'
import Post from '~/models/schemas/posts.schemas'
import Topic from '~/models/schemas/topics.schemas'
import User from '~/models/schemas/users.schemas'
import postService from '~/services/posts.services'

export const getPostController = async (req: Request, res: Response) => {
  try {
    res.json({
      code: RESPONSE_CODE.GET_POST_SUCCESSFUL,
      message: POST_MESSAGE.GET_POST_SUCCESS,
      data: await postService.get()
    })
  } catch {
    res.json({
      code: RESPONSE_CODE.GET_POST_FAILED,
      message: POST_MESSAGE.GET_POST_FAILURE
    })
  }
}

export const createPostController = async (req: Request<ParamsDictionary, any, PostRequestBody>, res: Response) => {
  try {
    const topic = req.topic as Topic
    const user = req.user as User
    const image = req.image as ImageType

    postService.create(req.body, topic, user, image)

    res.json({
      code: RESPONSE_CODE.CREATE_POST_SUCCESSFUL,
      message: POST_MESSAGE.CREATE_POST_SUCCESS
    })
  } catch {
    res.json({
      code: RESPONSE_CODE.CREATE_POST_FAILED,
      message: POST_MESSAGE.CREATE_POST_FAILURE
    })
  }
}

export const updatePostController = async (req: Request<ParamsDictionary, any, PostRequestBody>, res: Response) => {
  try {
    const topic = req.topic as Topic
    const image = req.image
    const post = req.post as Post

    if (image) {
      postService.update(req.body, topic, post, image as ImageType)
    } else {
      postService.update(req.body, topic, post)
    }

    res.json({
      code: RESPONSE_CODE.UPDATE_POST_SUCCESSFUL,
      message: POST_MESSAGE.UPDATE_POST_SUCCESS
    })
  } catch {
    res.json({
      code: RESPONSE_CODE.UPDATE_POST_FAILED,
      message: POST_MESSAGE.UPDATE_POST_FAILURE
    })
  }
}

export const deletePostController = async (req: Request, res: Response) => {
  try {
    const post = req.post as Post

    postService.delete(post)

    res.json({
      code: RESPONSE_CODE.DELETE_POST_SUCCESSFUL,
      message: POST_MESSAGE.DELETE_POST_SUCCESS
    })
  } catch {
    res.json({
      code: RESPONSE_CODE.DELETE_POST_FAILED,
      message: POST_MESSAGE.DELETE_POST_FAILURE
    })
  }
}
