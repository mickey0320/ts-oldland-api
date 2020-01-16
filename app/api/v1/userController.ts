import { Context } from 'koa'

import User from '../../models/user'
import success from '../../lib/helper'

class UserController {
  public async register(ctx: Context) {
    const { email, password, nickname } = ctx.request.body

    const user = {
      email,
      password,
      nickname
    }
    await User.create(user)
    success()
  }
}

export default new UserController()
