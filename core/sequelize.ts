import path from 'path'

import { Sequelize } from 'sequelize-typescript'

import config from '../config/config'

const { dbname, host, port, user, password } = config.database
const sequelize = new Sequelize(dbname, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,
  models: [path.join(__dirname, '../app/models/**/*ts')],
  define: {
    // 自动生成created_at,updated_at等字段
    timestamps: true,
    // 软删除，生成deleted_at字段
    paranoid: true,
    // 表字段采用下划线的命名方式
    underscored: true,
    scopes: {
      bh: {
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
        }
      }
    }
  }
})

export default sequelize
