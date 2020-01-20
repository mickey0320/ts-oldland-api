import util from 'util'

import HotBookModel from '../models/hotBook'
import FavorModel from '../models/favor'
import BookCommnetModel from '../models/bookComment'
import config from '../../config/config'
import axios from 'axios'
import { ClassicType } from '../lib/emnu'
import FavorService from './favor'

class BookService {
  public static async getHotBooks() {
    const hotBooks = await HotBookModel.findAll()
    const bookIds = hotBooks.map((book) => book.id)
    const bookFavorNums = await FavorService.getBookFavorNums(bookIds)
    const bookList = hotBooks.map((book) => book.get())

    bookList.forEach((book: any) => {
      const bookFavorNum = bookFavorNums.find((item) => book.id === item.art_id)
      let count = 0
      if (bookFavorNum) {
        const bookFavorNumPlain: any = bookFavorNum!.get()
        count = bookFavorNumPlain.count
      }
      book.fav_nums = count
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
    const count = await FavorModel.count({
      where: { uid, type: ClassicType.Book }
    })

    return count
  }

  public static async getBookFavorInfo(uid: number, bookId: number) {
    const favNums = await FavorModel.count({
      where: { art_id: bookId, type: ClassicType.Book }
    })
    const likeStatus = FavorService.getLikeStatus(bookId, uid, ClassicType.Book)

    return {
      fav_nums: favNums,
      like_status: likeStatus ? 1 : 0
    }
  }

  public static async postComment(bookId: number, content: string) {
    const comment = await BookCommnetModel.findOne({
      where: { book_id: bookId, content }
    })
    if (comment) {
      await comment.increment('nums', { by: 1 })
    } else {
      await BookCommnetModel.create({
        bookId,
        content,
        nums: 1
      })
    }
  }
  public static async getComments(bookId: number) {
    const comments = await BookCommnetModel.findAll({
      where: { book_id: bookId }
    })

    return comments
  }
}

export default BookService
