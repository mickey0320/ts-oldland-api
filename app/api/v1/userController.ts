import { Context } from 'koa'

import UserService from '../../services/user'
import { success } from '../../lib/helper'

class UserController {
  public async register(ctx: Context) {
    const { email, password, nickname } = ctx.request.body

    await UserService.register(email, password, nickname)
    success()
  }
}

export default new UserController()
