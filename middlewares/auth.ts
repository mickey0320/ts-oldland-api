import basicAuth, { BasicAuthResult } from 'basic-auth'
import jwt from 'jsonwebtoken'
import { Context } from 'koa'
import { UserLevel } from '../app/lib/emnu'

import config from '../config/config'

class Auth {
  public level: UserLevel

  public constructor(level: UserLevel) {
    this.level = level
  }
  public get m() {
    return async (ctx: Context) => {
      const result = basicAuth(ctx.req)
      let decode: any
      if (!result) {
        throw new Error('token不合法')
      }
      const { name } = result as BasicAuthResult
      if (!name) {
        throw new Error('token不合法')
      }
      try {
        decode = jwt.verify(name, config.security.secretKey)
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          throw new Error('token过期了')
        }
        throw new Error('token不合法')
      }
      if (decode.scope < this.level) {
        throw new Error('权限不足')
      }

      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }
    }
  }
}

export default Auth
