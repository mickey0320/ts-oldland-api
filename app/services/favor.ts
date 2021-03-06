import FavorModel from '../models/favor'
import ArtService from './art'
import { LikeError, NotFound, DislikeError } from '../../core/httpException'
import sequelize from '../../core/sequelize'
import { ClassicType } from '../lib/emnu'
import { Sequelize, Op } from 'sequelize'

class FavorService {
  public static async like(uid: number, artId: number, type: number) {
    return sequelize.transaction(async (t) => {
      const favor = await FavorModel.findOne({
        where: { uid, art_id: artId, type }
      })
      if (favor) {
        throw new LikeError()
      }
      await FavorModel.create({ art_id: artId, uid, type }, { transaction: t })
      const art = await ArtService.getData(artId, type, false)
      if (!art) {
        throw new NotFound('记录不存在')
      }
      // @ts-ignore
      await art.increment('fav_nums', { by: 1, transaction: t })
    })
  }
  public static async dislike(uid: number, artId: number, type: number) {
    return sequelize.transaction(async (t) => {
      const favor = await FavorModel.findOne({
        where: { uid, art_id: artId, type }
      })
      if (!favor) {
        throw new DislikeError()
      }
      await favor.destroy({
        force: true,
        transaction: t
      })
      const art = await ArtService.getData(artId, type, false)
      if (!art) {
        throw new NotFound('记录不存在')
      }
      // @ts-ignore
      await art.decrement('fav_nums', { by: 1, transaction: t })
    })
  }
  public static async getLikeStatus(uid: number, artId: number, type: number) {
    const favor = await FavorModel.findOne({
      where: { art_id: artId, uid, type }
    })

    return favor ? 1 : 0
  }
  public static async getBookFavorNums(bookIds: Array<number>) {
    const booksFavorNums = await FavorModel.findAll({
      where: { type: ClassicType.Book, art_id: { [Op.in]: bookIds } },
      group: ['art_id'],
      attributes: ['art_id', [Sequelize.fn('count', '*'), 'count']]
    })

    return booksFavorNums
  }
}

export default FavorService
