import Flow from '../models/flow'

import Art from '../models/art'
import FavorService from './favor'
import { NotFound } from '../../core/httpException'

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
}

export default ClassicService
