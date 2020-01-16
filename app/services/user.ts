import UserModel from '../models/user'
import { generateToken } from '../../core/util'

class User {
  public static async generateTokenByEmail(account: string, secret: string) {
    const user = await UserModel.verifyEmailAndSecret(account, secret)

    // 这个地方的 2 应该去数据库查询来确定具体的用户权限
    return generateToken(user.id, 2)
  }
}

export default User
