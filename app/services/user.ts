import bcrypt from 'bcryptjs'

import UserModel from '../models/user'
import { generateToken } from '../../core/util'
import { AuthFail, ParameterException } from '../../core/httpException'

class User {
  public static async register(email: string, password: string, nickname: string) {
    const user = await UserModel.findOne({ where: { email } })
    if (user) {
      throw new ParameterException('email已经存在')
    }
    return UserModel.create({
      email,
      password,
      nickname
    })
  }
  public static async generateTokenByEmail(account: string, secret: string) {
    const user = await this.verifyEmailAndSecret(account, secret)
    // 这个地方的 2 应该去数据库查询来确定具体的用户权限
    return generateToken(user.id, 2)
  }
  private static async verifyEmailAndSecret(email: string, secret: string) {
    const user = await UserModel.findOne({
      where: {
        email
      }
    })
    if (!user) {
      throw new AuthFail('账户输入错误')
    }
    const isCorrect = bcrypt.compareSync(secret, user.password)
    if (!isCorrect) {
      throw new AuthFail('密码输入错误')
    }

    return user
  }
}

export default User
