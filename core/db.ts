import { Sequelize } from 'sequelize'

import config from '../config/config'

const { dbname, host, port, user, password } = config.database

const sequelize = new Sequelize(dbname, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,
  timezone: '+8:00',
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
    // createdAt: 'create_at',
    // updatedAt: 'update_at',
    // deletedAt: 'deleted_at',
  }
})

sequelize.sync({})

export default sequelize
