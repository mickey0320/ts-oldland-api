import { Model, DataTypes } from 'sequelize'
import bcrypt from 'bcryptjs'

import sequelize from '../../core/db'

class User extends Model {
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
  public id!: number
  public nickname!: string
  public email!: string
  public password!: string
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
      type: DataTypes.STRING,
      set(this: User, val: string) {
        const salt = bcrypt.genSaltSync(10)
        const hashPwd = bcrypt.hashSync(val, salt)
        this.setDataValue('password', hashPwd)
      }
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
