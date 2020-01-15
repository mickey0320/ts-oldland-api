import { Context } from 'koa'
import bcrypt from 'bcryptjs'

import User from '../../models/user'
import success from '../../lib/helper'

class UserController {
  public async register(ctx: Context) {
    const { email, password, nickname } = ctx.request.body
    const salt = bcrypt.genSaltSync(10)
    const hashPwd = bcrypt.hashSync(password, salt)
    const user = {
      email,
      password: hashPwd,
      nickname
    }
    await User.create(user)
    success()
  }
}

export default new UserController()
