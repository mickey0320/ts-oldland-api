import { Context } from 'koa'

import BookService from '../../services/book'

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
    const bookdId = ctx.params.book_id
    const favorInfo = await BookService.getBookFavorInfo(uid, bookdId)

    ctx.body = favorInfo
  }
}

export default new BookController()
