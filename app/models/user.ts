import { Sequelize, Model, DataTypes } from 'sequelize'
import bcrypt from 'bcryptjs'

import { sequelize } from '../../core/db'

class User extends Model {
  public static async verifyEmailAndSecret(email: string, secret: string) {
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      throw new Error('账户输入错误')
    }
    const isCorrect = bcrypt.compareSync(secret, user.password)
    if (!isCorrect) {
      throw new Error('密码输入错误')
    }

    return user
  }
  public static getUserByOpenId(openid: string) {
    return User.findOne({
      where: {
        openid
      }
    })
  }
  public static async createUserByOpenId(openid: string) {
    return User.create({
      openid
    })
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    openid: {
      type: DataTypes.STRING(64),
      unique: true
    }
  },
  {
    tableName: 'user',
    sequelize
  }
)

export default User
