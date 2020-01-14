import { Context } from 'koa'

import { ParameterException } from '../../../core/httpException'

class ClassicController {
  public async getLatest(ctx: Context) {
    // ctx.body = {
    //   message: 'getLatest'
    // }
    throw new ParameterException('参数错误')
  }
}

export default new ClassicController()
