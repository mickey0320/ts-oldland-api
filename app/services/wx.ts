import util from 'util'

import axios from 'axios'

import User from '../models/user'
import config from '../../config/config'
import { generateToken } from '../../core/util'
import { AuthFail } from '../../core/httpException'

class Wx {
  public static async codeToToken(code: string) {
    const openId = await this.getOpenId(code)
    let user = await User.findOne({
      where: {
        openId
      }
    })
    if (!user) {
      user = await User.create(openId)
    }

    return generateToken(user.id, 2)
  }
  private static async getOpenId(code: string) {
    const { api, appId, appSecret } = config.wx
    const url = util.format(api, appId, appSecret, code)
    const result = await axios.get(url)
    if (result.data.errcode) {
      throw new AuthFail('openid获取失败: ' + result.data.errmsg)
    }
    return result.data.openid
  }
}

export default Wx
