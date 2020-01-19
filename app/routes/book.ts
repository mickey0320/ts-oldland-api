import KoaRouter from 'koa-router'

import bookController from '../api/v1/bookController'
import Auth from '../../middlewares/auth'

const router = new KoaRouter({
  prefix: '/v1/book'
})

router.get('/hot_list', new Auth().m, bookController.getHotBooks)
router.get('/:id/detail', new Auth().m, bookController.getDetail)
router.get('/search', new Auth().m, bookController.search)
router.get('/favor/count', new Auth().m, bookController.getFavorCount)
router.get('/:book_id/favor', new Auth().m, bookController.getBookFavorInfo)

export default router
