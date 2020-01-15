import { Context, Next } from 'koa'

import HttpBaseException from '../core/httpException'
import config from '../config/config'

// const env = process.NODE_ENV

async function catchError(ctx: Context, next: Next) {
  try {
    await next()
  } catch (error) {
    const url = (error.requestUrl = `${ctx.method}  ${ctx.path}`)
    const isDev = config.environment
    const isHttpException = error instanceof HttpBaseException
    if (isDev && !isHttpException) {
      throw error
    }
    if (isHttpException) {
      ctx.body = {
        message: error.message,
        error_code: error.errorCode,
        request_url: url,
        status: error.httpStatus
      }
    } else {
      error.message = '服务器发生异常了'
      ctx.body = {
        message: error.message,
        error_code: 10000,
        request_url: url,
        status: 500
      }
    }
  }
}

export default catchError
