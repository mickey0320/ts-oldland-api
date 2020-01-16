import { Sequelize, Model, DataTypes } from 'sequelize'

import { sequelize } from '../../core/db'

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
