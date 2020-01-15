import { Context } from 'koa'

import { ParameterException } from '../../../core/httpException'

class ClassicController {
  public async getLatest(ctx: Context) {
    ctx.body = {
      message: 'getLatest'
    }
  }
}

export default new ClassicController()
