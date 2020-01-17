import { Context } from 'koa'

import ClassicService from '../../services/classic'

class ClassicController {
  public async getLatest(ctx: Context) {
    const classic = await ClassicService.getlatest(ctx.auth.uid)

    ctx.body = classic
  }
  public async getNext(ctx: Context) {
    const index = ctx.params.index
    const classic = await ClassicService.getNext(Number(index), ctx.auth.uid)

    ctx.body = classic
  }
  public async getPrevious(ctx: Context) {
    const index = ctx.params.index
    const classic = await ClassicService.getPrevious(Number(index), ctx.auth.uid)

    ctx.body = classic
  }
}

export default new ClassicController()
