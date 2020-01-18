import Flow from '../models/flow'

import Art from '../models/art'
import FavorService from './favor'
import { NotFound } from '../../core/httpException'
import { Op } from 'sequelize'
import { ClassicType } from '../lib/emnu'
import { Movie, Music, Sentence } from '../models/classic'
import Favor from '../models/favor'

interface ClassicTypeIds {
  [key: number]: Array<number>
}

class ClassicService {
  public static async getlatest(uid: number) {
    const flow = await Flow.findOne({
      order: [['index', 'desc']]
    })

    const classic = await Art.getData(flow!.artId, flow!.type)
    const likeStatus = await FavorService.getLikeStatus(flow!.artId, uid, flow!.type)
    // @ts-ignore
    classic!.setDataValue('index', flow!.index)
    // @ts-ignore
    classic!.setDataValue('like_status', likeStatus)

    return classic
  }
  public static async getNext(index: number, uid: number) {
    const flow = await Flow.findOne({
      where: { index: index + 1 }
    })
    if (!flow) {
      throw new NotFound('没有下一期了')
    }
    const classic = await Art.getData(flow.artId, flow.type)
    const likeStatus = await FavorService.getLikeStatus(flow!.artId, uid, flow!.type)
    // @ts-ignore
    classic!.setDataValue('index', flow!.index)
    // @ts-ignore
    classic!.setDataValue('like_status', likeStatus)
    return classic
  }

  public static async getPrevious(index: number, uid: number) {
    const flow = await Flow.findOne({
      where: { index: index - 1 }
    })
    if (!flow) {
      throw new NotFound('已经是最新一期')
    }
    const classic = await Art.getData(flow.artId, flow.type)
    const likeStatus = await FavorService.getLikeStatus(flow!.artId, uid, flow!.type)
    // @ts-ignore
    classic!.setDataValue('index', flow!.index)
    // @ts-ignore
    classic!.setDataValue('like_status', likeStatus)
    return classic
  }

  public static async getFavorInfo(artId: number, type: number, uid: number) {
    const art = await Art.getData(artId, type, false)
    if (!art) {
      throw new NotFound()
    }
    const likeStatus = await FavorService.getLikeStatus(artId, uid, type)

    return {
      id: artId,
      fav_nums: art.favNums,
      like_status: likeStatus
    }
  }

  public static async getMyFavor(uid: number) {
    const favors = await Favor.findAll({
      where: { uid, type: { [Op.not]: ClassicType.Book } }
    })
    const classicTypeIdsMap: ClassicTypeIds = {
      [ClassicType.Movie]: [],
      [ClassicType.Music]: [],
      [ClassicType.Sentence]: []
    }
    for (let favor of favors) {
      classicTypeIdsMap[favor.type].push(favor.artId)
    }

    const myFavors = []
    for (let type in classicTypeIdsMap) {
      if (classicTypeIdsMap[type].length === 0) {
        continue
      }
      const classics = await this.patchClassic(Number(type), classicTypeIdsMap[type])
      myFavors.push(...classics!)
    }

    return myFavors
  }

  private static async patchClassic(type: ClassicType, ids: Array<number>) {
    const condition = {
      where: {
        id: { [Op.in]: ids }
      }
    }
    const scope = 'bh'
    let classics
    switch (type) {
      case ClassicType.Movie:
        classics = await Movie.scope(scope).findAll(condition)
        break
      case ClassicType.Music:
        classics = await Music.scope(scope).findAll(condition)
        break
      case ClassicType.Sentence:
        classics = await Sentence.scope(scope).findAll(condition)
        break
    }

    return classics
  }
}

export default ClassicService
