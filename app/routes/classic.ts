import KoaRouter from 'koa-router'

import classicController from '../api/v1/classicController'
import Auth from '../../middlewares/auth'

const router = new KoaRouter()

router.prefix('/v1/classic')

// 最新一期期刊
router.get('/latest', new Auth().m, classicController.getLatest)
// 下一期期刊
router.get('/:index/next', new Auth().m, classicController.getNext)
// 上一期期刊
router.get('/:index/previous', new Auth().m, classicController.getPrevious)
// 期刊的喜欢信息
router.get('/:type/:id/favor', new Auth().m, classicController.getFavorInfo)
// 我喜欢的期刊
router.get('/favor', new Auth().m, classicController.getMyFavor)
// 期刊某一期的详情
router.get('/:type/:id', new Auth().m, classicController.getDetail)

export default router
