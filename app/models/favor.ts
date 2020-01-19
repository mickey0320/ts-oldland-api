import { Model, DataTypes, Sequelize, Op } from 'sequelize'

import db from '../../core/db'
import Art from './art'
import { LikeError, DislikeError, NotFound } from '../../core/httpException'
import { ClassicType } from '../lib/emnu'

class Favor extends Model {
  public static async like(artId: number, uid: number, type: number) {
    return db.transaction(async (t) => {
      const favor = await this.findOne({
        where: { uid, artId, type }
      })
      if (favor) {
        throw new LikeError()
      }
      await this.create({ artId, uid, type }, { transaction: t })
      const art = await Art.getData(artId, type, false)
      if (!art) {
        throw new NotFound('记录不存在')
      }
      // @ts-ignore
      await art.increment('favNums', { by: 1, transaction: t })
    })
  }
  public static async dislike(artId: number, uid: number, type: number) {
    return db.transaction(async (t) => {
      const favor = await this.findOne({
        where: { uid, artId, type }
      })
      if (!favor) {
        throw new DislikeError()
      }
      await favor.destroy({
        force: true,
        transaction: t
      })
      const art = await Art.getData(artId, type, false)
      if (!art) {
        throw new NotFound('记录不存在')
      }
      // @ts-ignore
      await art.decrement('favNums', { by: 1, transaction: t })
    })
  }
  public static async getBookFavorNums(bookIds: Array<number>) {
    const booksFavorNums = await Favor.findAll({
      where: { type: ClassicType.Book, artId: { [Op.in]: bookIds } },
      group: ['artId'],
      attributes: ['artId', [Sequelize.fn('count', '*'), 'count']]
    })

    return booksFavorNums
  }
  public id!: number
  public uid!: number
  public artId!: number
  public type!: number
}

Favor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    uid: {
      type: DataTypes.INTEGER
    },
    artId: {
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.INTEGER
    }
  },
  {
    tableName: 'favor',
    sequelize: db
  }
)

export default Favor
