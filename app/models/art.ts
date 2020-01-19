import { ClassicType } from '../lib/emnu'
import { Movie, Music, Sentence } from './classic'
import Book from './book'

class Art {
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
        art = await Movie.scope(scope).findOne(condition)
        break
      case ClassicType.Music:
        art = await Music.scope(scope).findOne(condition)
        break
      case ClassicType.Sentence:
        art = await Sentence.scope(scope).findOne(condition)
        break
      case ClassicType.Book:
        art = await Book.scope(scope).findOne({ where: { id: artId } })
        // if (!art) {
        //   art = await Book.create({
        //     id: artId
        //   })
        // }
        break
    }
    return art
  }
}

export default Art
