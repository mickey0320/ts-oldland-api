import { Context } from 'koa'

import { LoginType } from '../../lib/emnu'
import userService from '../../../app/services/user'
import wxService from '../../services/wx'

class TokenController {
  public verify = async (ctx: Context) => {
    let { account, secret, type } = ctx.request.body
    const loginType = parseInt(type, 10)
    let token = ''
    switch (loginType) {
      case LoginType.Email:
        token = await userService.generateTokenByEmail(account, secret)
        break
      case LoginType.MiniProgram:
        token = await wxService.codeToToken(account)
        break
    }
    ctx.body = {
      token
    }
  }
}

export default new TokenController()
