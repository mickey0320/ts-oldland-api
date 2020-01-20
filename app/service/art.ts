import FlowModel from '../model/flow'
import FavorModel from '../model/favor'
import MovieModel from '../model/movie'
import MusicModel from '../model/music'
import SentenceModel from '../model/sentence'
import BookModel from '../model/book'

import FavorService from './favor'
import { NotFound } from '../../core/httpException'
import { Op } from 'sequelize'
import { ClassicType } from '../lib/emnu'

interface ClassicTypeIds {
  [key: number]: Array<number>
}

class Art {
  public static async getlatest(uid: number) {
    const flow = await FlowModel.findOne({
      order: [['index', 'desc']]
    })
    if (!flow) {
      throw new NotFound('没有最新一期')
    }

    const classic = await this.getData(flow.artId, flow.type)
    const likeStatus = await FavorService.getLikeStatus(uid, flow.artId, flow.type)

    return {
      index: flow.index,
      likeStatus,
      ...classic!.get()
    }
  }
  public static async getNext(index: number, uid: number) {
    const flow = await FlowModel.findOne({
      where: { index: index + 1 }
    })
    if (!flow) {
      throw new NotFound('没有下一期了')
    }
    const classic = await this.getData(flow.artId, flow.type)
    const likeStatus = await FavorService.getLikeStatus(uid, flow.artId, flow.type)

    return {
      index: flow.index,
      likeStatus,
      ...classic!.get()
    }
  }

  public static async getPrevious(index: number, uid: number) {
    const flow = await FlowModel.findOne({
      where: { index: index - 1 }
    })
    if (!flow) {
      throw new NotFound('已经是最新一期')
    }
    const classic = await this.getData(flow.artId, flow.type)
    const likeStatus = await FavorService.getLikeStatus(uid, flow.artId, flow.type)

    return {
      index: flow.index,
      likeStatus,
      ...classic!.get()
    }
  }

  public static async getFavorInfo(artId: number, type: number, uid: number) {
    const art = await this.getData(artId, type, false)
    if (!art) {
      throw new NotFound()
    }
    const likeStatus = await FavorService.getLikeStatus(uid, artId, type)

    return {
      id: artId,
      fav_nums: art.favNums,
      like_status: likeStatus
    }
  }

  public static async getMyFavor(uid: number) {
    const favors = await FavorModel.findAll({
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

  public static async getDetail(uid: number, type: number, id: number) {
    const classic = await this.getData(id, type)
    if (!classic) {
      throw new NotFound()
    }
    const likeStatus = await FavorService.getLikeStatus(uid, id, type)

    return {
      likeStatus,
      ...classic.get()
    }
  }

  public static async getData(artId: number, type: ClassicType, useScope = true) {
    let art
    const condition = {
      where: {
        id: Number(artId),
        type: Number(type)
      }
    }
    const scope = useScope ? 'bh' : ''
    switch (type) {
      case ClassicType.Movie:
        art = await MovieModel.scope(scope).findOne(condition)
        break
      case ClassicType.Music:
        art = await MusicModel.scope(scope).findOne(condition)
        break
      case ClassicType.Sentence:
        art = await SentenceModel.scope(scope).findOne(condition)
        break
      case ClassicType.Book:
        art = await BookModel.scope(scope).findOne({ where: { id: artId } })
        if (!art) {
          art = await BookModel.create({
            id: artId
          })
        }
        break
    }
    return art
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
        classics = await MovieModel.scope(scope).findAll(condition)
        break
      case ClassicType.Music:
        classics = await MusicModel.scope(scope).findAll(condition)
        break
      case ClassicType.Sentence:
        classics = await SentenceModel.scope(scope).findAll(condition)
        break
    }

    return classics
  }
}

export default Art
