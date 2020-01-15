import { Context } from 'koa'

import { LoginType } from '../../lib/emnu'
import User from '../../models/user'

class TokenController {
  public async verify(ctx: Context) {
    let { account, secret, type } = ctx.request.body
    const loginType = parseInt(type, 10)
    switch (loginType) {
      case LoginType.Email:
        await User.verifyEmailAndSecret(account, secret)
        break
    }
  }
}

export default new TokenController()
