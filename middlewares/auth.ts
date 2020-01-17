import basicAuth, { BasicAuthResult } from 'basic-auth'
import jwt from 'jsonwebtoken'
import { Context, Next } from 'koa'

import { UserLevel } from '../app/lib/emnu'
import config from '../config/config'
import { Forbidden } from '../core/httpException'

class Auth {
  public level: UserLevel

  public constructor(level: UserLevel) {
    this.level = level
  }
  public get m() {
    return async (ctx: Context, next: Next) => {
      const result = basicAuth(ctx.req)
      let decode: any
      let errorMsg = 'token不合法'
      if (!result) {
        throw new Forbidden(errorMsg)
      }
      const { name } = result as BasicAuthResult
      if (!name) {
        throw new Forbidden(errorMsg)
      }
      try {
        decode = jwt.verify(name, config.security.secretKey)
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          errorMsg = 'token过期了'
        } else {
          errorMsg = error.message
        }
        throw new Forbidden(errorMsg)
      }
      if (decode.scope < this.level) {
        throw new Forbidden('权限不足')
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }
      await next()
    }
  }
}

export default Auth
