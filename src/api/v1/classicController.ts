import { Context } from 'koa'

class ClassicController {
  public async getLatest(ctx: Context) {
    ctx.body = {
      message: 'getLatest1122'
    }
  }
}

export default new ClassicController()
