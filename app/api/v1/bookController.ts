import { Context } from 'koa'

import BookService from '../../services/book'
import { success } from '../../lib/helper'

class BookController {
  public async getHotBooks(ctx: Context) {
    const hotBooks = await BookService.getHotBooks()

    ctx.body = hotBooks
  }
  public async getDetail(ctx: Context) {
    const id = ctx.params.id
    const detail = await BookService.getDetail(id)

    ctx.body = detail
  }
  public async search(ctx: Context) {
    const { q, start = 0, count = 10 } = ctx.query
    const list = await BookService.search(q, Number(start), Number(count))

    ctx.body = list
  }
  public async getFavorCount(ctx: Context) {
    const uid = Number(ctx.auth.uid)
    const count = await BookService.getFavorCount(uid)

    ctx.body = { count }
  }
  public async getBookFavorInfo(ctx: Context) {
    const uid = Number(ctx.auth.uid)
    const bookdId = Number(ctx.params.book_id)
    const favorInfo = await BookService.getBookFavorInfo(uid, bookdId)

    ctx.body = favorInfo
  }

  public async postComment(ctx: Context) {
    const { book_id: bookId, content } = ctx.request.body
    await BookService.postComment(Number(bookId), content)

    success()
  }

  public async getBookComments(ctx: Context) {
    const bookId = ctx.params.book_id
    const comments = await BookService.getComments(bookId)

    ctx.body = {
      comments,
      book_id: bookId
    }
  }
  public async getHotKeywords(ctx: Context) {
    ctx.body = {
      hot: [
        'Fluent Python',
        'Python',
        '小程序Java核心编程',
        '慕课网7七月',
        '微信小程序开发入门与实践',
        'C++'
      ]
    }
  }
}

export default new BookController()
