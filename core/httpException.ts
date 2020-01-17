// interface HttpExceptionParams {
//   message: string
//   errorCode: number
//   requestUrl?: string
//   httpStatus: number
// }

class HttpBaseException extends Error {
  public errorCode: number
  public requestUrl?: string
  public httpStatus: number

  public constructor(message = '服务器出错了', errorCode = 10000, httpStatus: number) {
    super(message)
    this.errorCode = errorCode
    this.httpStatus = httpStatus

    // 为了解决new出的实例instanceof时为false的bug,有这句代码,该实例 instanceof HttpBaseException才为true
    Object.setPrototypeOf(this, HttpBaseException.prototype)
  }
}

class ParameterException extends HttpBaseException {
  public constructor(message?: string, errorCode?: number) {
    super(message, errorCode, 400)
  }
}

class Success extends HttpBaseException {
  public constructor() {
    super('ok', 0, 201)
  }
}

class NotFound extends HttpBaseException {
  public constructor(message = '资源未找到', errorCode = 10002) {
    super(message, errorCode, 404)
  }
}

class AuthFail extends HttpBaseException {
  public constructor(message = '授权失败', errorCode = 10004) {
    super(message, errorCode, 401)
  }
}

class Forbidden extends HttpBaseException {
  public constructor(message = '禁止访问', errorCode = 10006) {
    super(message, errorCode, 403)
  }
}

class LikeError extends HttpBaseException {
  public constructor(message = '您已经点过赞了', errorCode = 60000) {
    super(message, errorCode, 400)
  }
}

class DislikeError extends HttpBaseException {
  public constructor(message = '您已经取消过过赞了', errorCode = 60002) {
    super(message, errorCode, 400)
  }
}

export default HttpBaseException
export { ParameterException, Success, NotFound, AuthFail, Forbidden, LikeError, DislikeError }
