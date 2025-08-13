import { randomNumber } from './random.utils'
import productService from '~/services/products.services'
import postService from '~/services/posts.services'
import { convertPath } from './string.utils'

export async function generatePath(
  str: string,
  service: typeof productService | typeof postService,
  old_Path?: string
) {
  const firstPath = convertPath(str)

  if (old_Path) {
    if (old_Path === firstPath) {
      return old_Path
    }
  }

  if (!firstPath || firstPath.length === 0) {
    return randomNumber().toString()
  }

  if (!(await service.checkPath(firstPath))) {
    return firstPath
  }

  const secondPath = firstPath + `-${new Date().getFullYear()}`

  if (!(await service.checkPath(secondPath))) {
    return secondPath
  }

  const finalPath = secondPath + `-${randomNumber()}`

  return finalPath
}
