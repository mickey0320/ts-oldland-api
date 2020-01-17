import Favor from '../models/favor'

class FavorService {
  public static async like(artId: number, uid: number, type: number) {
    return Favor.like(artId, uid, type)
  }
  public static async dislike(artId: number, uid: number, type: number) {
    return Favor.dislike(artId, uid, type)
  }
  public static async getLikeStatus(artId: number, uid: number, type: number) {
    const favor = await Favor.findOne({
      where: { artId, uid, type }
    })

    return favor ? 1 : 0
  }
}

export default FavorService
