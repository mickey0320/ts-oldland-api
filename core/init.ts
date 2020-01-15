import { Context } from 'koa'

import config from '../config/config'

class InitManager {
  private static app: Context
  public static init(app: Context) {
    InitManager.app = app
  }
}

export default InitManager
