import Favor from '../models/favor'

class FavorService {
  public static async like(uid: number, artId: number, type: number) {
    return Favor.like(artId, uid, type)
  }
  public static async dislike(uid: number, artId: number, type: number) {
    return Favor.dislike(artId, uid, type)
  }
  public static async getLikeStatus(uid: number, artId: number, type: number) {
    const favor = await Favor.findOne({
      where: { artId, uid, type }
    })

    return favor ? 1 : 0
  }
}

export default FavorService
