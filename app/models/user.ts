import { Sequelize, Model, DataTypes } from 'sequelize'

import { sequelize } from '../../core/db'

class User extends Model {}
console.log('dsds')
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
