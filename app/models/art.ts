import { ClassicType } from '../lib/emnu'
import { Movie, Music, Sentence } from './classic'

class Art {
  public static async getData(artId: number, type: ClassicType, useScope = true) {
    let classic
    const condition = {
      where: {
        id: Number(artId),
        type: Number(type)
      }
    }
    const scope = useScope ? 'bh' : ''
    switch (type) {
      case ClassicType.Movie:
        classic = await Movie.scope(scope).findOne(condition)
        break
      case ClassicType.Music:
        classic = await Music.scope(scope).findOne(condition)
        break
      case ClassicType.Sentence:
        classic = await Sentence.scope(scope).findOne(condition)
        break
    }
    return classic
  }
}

export default Art
