import { Context } from 'koa'

import FavorService from '../../services/favor'
import { success } from '../../lib/helper'

class LikeController {
  public async like(ctx: Context) {
    const { art_id: artId, type } = ctx.request.body
    await FavorService.like(Number(ctx.auth.uid), artId, type)
    success()
  }
  public async dislike(ctx: Context) {
    const { art_id: artId, type } = ctx.request.body
    await FavorService.dislike(Number(ctx.auth.uid), artId, type)
    success()
  }
}

export default new LikeController()
