import KoaRouter from 'koa-router'

import bookController from '../api/v1/bookController'
import Auth from '../../middlewares/auth'

const router = new KoaRouter({
  prefix: '/v1/book'
})

// 热门书籍
router.get('/hot_list', new Auth().m, bookController.getHotBooks)
// 书籍详情
router.get('/:id/detail', new Auth().m, bookController.getDetail)
// 搜索书籍
router.get('/search', new Auth().m, bookController.search)
// 我喜欢的图书数量
router.get('/favor/count', new Auth().m, bookController.getFavorCount)
// 根据图书id获取图书的喜欢信息
router.get('/:book_id/favor', new Auth().m, bookController.getBookFavorInfo)
// 对某一个图书进行短评
router.post('/add/short_comment', new Auth().m, bookController.postComment)
// 获取某一图书的所有短评
router.get('/:book_id/short_comment', new Auth().m, bookController.getBookComments)
// 热搜关键字
router.get('/hot_keyword', new Auth().m, bookController.getHotKeywords)

export default router
