import { Context } from 'koa'

import { LoginType } from '../../lib/emnu'
import UserService from '../../services/user'
import wxService from '../../services/wx'

class TokenController {
  public verify = async (ctx: Context) => {
    let { account, secret, type } = ctx.request.body
    const loginType = parseInt(type, 10)
    let token = ''
    switch (loginType) {
      case LoginType.MiniProgram:
        token = await wxService.codeToToken(account)
        break
      case LoginType.Email:
        token = await UserService.generateTokenByEmail(account, secret)
        break
    }
    ctx.body = {
      token
    }
  }
}

export default new TokenController()
