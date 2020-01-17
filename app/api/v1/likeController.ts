import { Context } from 'koa'

import FavorService from '../../services/favor'
import { success } from '../../lib/helper'

class LikeController {
  public async like(ctx: Context) {
    const { art_id: artId, type } = ctx.request.body
    await FavorService.like(artId, Number(ctx.auth.uid), type)
    success()
  }
  public async dislike(ctx: Context) {
    const { art_id: artId, type } = ctx.request.body
    await FavorService.dislike(artId, Number(ctx.auth.uid), type)
    success()
  }
}

export default new LikeController()
