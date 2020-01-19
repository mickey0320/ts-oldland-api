import util from 'util'

import HotBook from '../models/hotBook'
import Favor from '../models/favor'
import config from '../../config/config'
import axios from 'axios'
import { ClassicType } from '../lib/emnu'
import FavorService from './favor'
import BookCommnet from '../models/bookComment'

class BookService {
  public static async getHotBooks() {
    const hotBooks = await HotBook.findAll()
    const bookIds = hotBooks.map((book) => book.id)
    const bookFavorNums = await Favor.getBookFavorNums(bookIds)

    hotBooks.forEach((book) => {
      const bookFavorNum = bookFavorNums.find((item) => book.id === item.artId)
      let count = 0
      if (bookFavorNum) {
        // @ts-ignore
        count = bookFavorNum.getDataValue('count')
      }
      // @ts-ignore
      book.setDataValue('favNums', count)
    })

    return hotBooks
  }
  public static async getDetail(id: number) {
    const url = util.format(config.yushu.detailUrl, id)
    const detail = await axios.get(url)

    return detail.data
  }

  public static async search(q: string, start = 0, count = 10) {
    const url = util.format(config.yushu.keywordUrl, q, count, start, 1)
    const ret = await axios.get(encodeURI(url))

    return ret.data
  }

  public static async getFavorCount(uid: number) {
    const count = await Favor.count({
      where: { uid, type: ClassicType.Book }
    })

    return count
  }

  public static async getBookFavorInfo(uid: number, bookId: number) {
    const favNums = await Favor.count({
      where: { artId: bookId, type: ClassicType.Book }
    })
    const likeStatus = FavorService.getLikeStatus(bookId, uid, ClassicType.Book)

    return {
      favNums,
      likeStatus: likeStatus ? 1 : 0
    }
  }

  public static async postComment(bookId: number, content: string) {
    console.log(bookId, content)
    const comment = await BookCommnet.findOne({
      where: { bookId, content }
    })
    if (comment) {
      await comment.increment('nums', { by: 1 })
    } else {
      await BookCommnet.create({
        bookId,
        content,
        nums: 1
      })
    }
  }
}

export default BookService
