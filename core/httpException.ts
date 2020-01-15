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

export default HttpBaseException
export { ParameterException, Success }
