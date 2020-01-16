import { Context } from 'koa'

import { LoginType } from '../../lib/emnu'
import { generateToken } from '../../../core/util'
import User from '../../models/user'

class TokenController {
  public verify = async (ctx: Context) => {
    let { account, secret, type } = ctx.request.body
    const loginType = parseInt(type, 10)
    let token = ''
    switch (loginType) {
      case LoginType.Email:
        token = await this.verfifyEmailAndSecret(account, secret)
        break
    }
    ctx.body = {
      token
    }
  }
  private async verfifyEmailAndSecret(account: string, secret: string) {
    const user = await User.verifyEmailAndSecret(account, secret)

    // 这个地方的 2 应该去数据库查询来确定具体的用户权限
    return generateToken(user.id, 2)
  }
}

export default new TokenController()
