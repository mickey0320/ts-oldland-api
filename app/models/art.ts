import { ClassicType } from '../lib/emnu'
import { Movie, Music, Sentence } from './classic'

class Art {
  public static async getData(artId: number, type: ClassicType) {
    let classic
    const condition = {
      where: {
        id: Number(artId),
        type: Number(type)
      }
    }
    switch (type) {
      case ClassicType.Movie:
        classic = await Movie.scope('dh').findOne(condition)
        break
      case ClassicType.Music:
        classic = await Music.scope('dh').findOne(condition)
        break
      case ClassicType.Sentence:
        classic = await Sentence.scope('dh').findOne(condition)
        break
    }
    return classic
  }
}

export default Art
