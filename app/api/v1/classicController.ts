import { Context } from 'koa'

import ClassicService from '../../services/art'

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
  public async getFavorInfo(ctx: Context) {
    const { type, id: artId } = ctx.params
    const favorInfo = await ClassicService.getFavorInfo(
      Number(artId),
      Number(type),
      Number(ctx.auth.uid)
    )
    console.log(favorInfo)
    ctx.body = favorInfo
  }
  public async getMyFavor(ctx: Context) {
    const favors = await ClassicService.getMyFavor(Number(ctx.auth.uid))

    ctx.body = favors
  }
  public async getDetail(ctx: Context) {
    const { type, id } = ctx.params
    const detail = await ClassicService.getDetail(Number(ctx.auth.uid), Number(type), Number(id))

    ctx.body = detail
  }
}

export default new ClassicController()
