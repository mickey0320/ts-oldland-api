import { Context, Next } from 'koa'

import HttpBaseException from '../core/httpException'

async function catchError(ctx: Context, next: Next) {
  try {
    await next()
  } catch (error) {
    console.log(error)
    if (error instanceof HttpBaseException) {
      error.requestUrl = `${ctx.method}  ${ctx.path}`
      ctx.body = {
        message: error.message,
        ...error
      }
    }
  }
}

export default catchError
